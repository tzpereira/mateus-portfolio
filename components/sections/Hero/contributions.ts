/* GitHub contribution calendar — proof-of-work behind the hero.
   The calendar is NOT in the REST API; it only exists in the GraphQL API,
   which requires a token. Reuses the same GITHUB_TOKEN already used by
   Projects.tsx. No token (e.g. local dev) → returns null and the hero
   falls back to the PlusGrid. Revalidates daily, like the repo pulses. */

export type ContribDay = { level: 0 | 1 | 2 | 3 | 4; count: number; date: string };
export type ContribWeek = { days: ContribDay[] };

const LEVELS: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{weeks{contributionDays{contributionCount date contributionLevel}}}}}}`;

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
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    if (!Array.isArray(weeks)) return null;
    return weeks.map((w: { contributionDays: { contributionCount: number; date: string; contributionLevel: string }[] }) => ({
      days: w.contributionDays.map(d => ({
        level: LEVELS[d.contributionLevel] ?? 0,
        count: d.contributionCount,
        date: d.date,
      })),
    }));
  } catch {
    return null;
  }
}
