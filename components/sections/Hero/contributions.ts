/* GitHub contribution calendar — proof-of-work behind the hero.
   The calendar is NOT in the REST API; it only exists in the GraphQL API,
   which requires a token. Reuses the same GITHUB_TOKEN already used by
   Projects.tsx. No token (e.g. local dev) → returns null and the hero
   falls back to the PlusGrid. Revalidates daily, like the repo pulses. */

export type ContribDay = { level: 0 | 1 | 2 | 3 | 4; count: number; date: string; isFuture: boolean };
export type ContribWeek = { days: ContribDay[] };

/* absolute thresholds instead of GitHub's own quartiles — GitHub grades each
   day relative to the user's own busiest day, so one outlier week compresses
   every other day into "low". A flat scale maxes out at a realistic ceiling
   (~25 commits) so ordinary heavy days don't wash out. */
function levelFromCount(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 5) return 1;
  if (count <= 12) return 2;
  if (count <= 24) return 3;
  return 4;
}

const QUERY = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{weeks{contributionDays{contributionCount date}}}}}}`;

export async function getContributions(login: string): Promise<ContribWeek[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    if (!Array.isArray(weeks)) return null;
    /* GitHub's calendar stops at today — it never sends the rest of the
       current week, so that last week arrives short (e.g. 1 day on a
       Sunday). Pad it out to a full 7 so the grid is always a complete
       rectangle, with the padding days marked as blanks. */
    return weeks.map((w: { contributionDays: { contributionCount: number; date: string }[] }, wi: number) => {
      const days: ContribDay[] = w.contributionDays.map(d => ({
        level: levelFromCount(d.contributionCount),
        count: d.contributionCount,
        date: d.date,
        isFuture: false,
      }));
      if (wi === weeks.length - 1) {
        const last = days[days.length - 1];
        const cursor = last ? new Date(last.date) : new Date();
        while (days.length < 7) {
          cursor.setDate(cursor.getDate() + 1);
          days.push({ level: 0, count: 0, date: cursor.toISOString().slice(0, 10), isFuture: true });
        }
      }
      return { days };
    });
  } catch {
    return null;
  }
}
