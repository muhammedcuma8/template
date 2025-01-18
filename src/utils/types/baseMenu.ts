export interface BaseMenu {
  label: string;
  icon: string;
  items: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  icon: string;
  badge?: string;
  badgeClassName?: string;
  to?: string;
  className?: string;
  badgeStyle?: BadgeStyle;
  url?: string;
  target?: string;
  command?: () => void;
  items?: SubMenuItem[];
}

interface BadgeStyle {
  width: string;
}
