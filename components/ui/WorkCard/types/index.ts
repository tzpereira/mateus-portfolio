export type WorkCardProps = {
    work: {
      title: string;
      description: string;
      icon: string;
    };
    isVisible: boolean;
    scrollDirection: 'up' | 'down' | null;
  };
  