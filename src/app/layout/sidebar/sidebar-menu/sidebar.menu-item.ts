export interface SidebarMenuItem {
  text: string;
  icon: string;
  route: string;
}

export interface SidebarMenuSection {
  title: string;
  icon: string;
  items: SidebarMenuItem[];
}

export const SIDEBAR_MENU: SidebarMenuSection[] = [
  {
    title: 'Championships',
    icon: 'emoji_events',
    items: [
      {
        text: 'Overview',
        icon: 'dashboard',
        route: '/championships',
      },
      {
        text: 'Calendar',
        icon: 'calendar_month',
        route: '/championships/calendar',
      },
    ],
  },
  {
    title: 'Teams',
    icon: 'groups',
    items: [
      {
        text: 'Teams',
        icon: 'shield',
        route: '/teams',
      },
      {
        text: 'Drivers',
        icon: 'sports_motorsports',
        route: '/drivers',
      },
    ],
  },
  {
    title: 'Races',
    icon: 'flag',
    items: [
      {
        text: 'Sessions',
        icon: 'timer',
        route: '/sessions',
      },
      {
        text: 'Results',
        icon: 'leaderboard',
        route: '/results',
      },
    ],
  },
];
