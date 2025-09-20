export type WorkCardProps = {
    work: {
      title: string;
      description: string;
      icon: string;
    };
    isCardVisible: boolean;
    scrollDirection: 'up' | 'down' | null;
    isVisible: boolean;
  };
  