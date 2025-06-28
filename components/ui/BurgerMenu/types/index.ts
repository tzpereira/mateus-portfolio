export interface BurgerMenuProps {
  menuItems: {
    label: string;
    onClick: () => void;
  }[];
}
