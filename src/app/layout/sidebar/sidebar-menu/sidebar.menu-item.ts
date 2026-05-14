export interface SidebarMenuItem {
  text: string;
  icon: string;
  route: string;
}

export interface SidebarMenuSection {
  id: string;
  title: string;
  icon: string;
  items: SidebarMenuItem[];
}

export const SIDEBAR_MENU: SidebarMenuSection[] = [
  {
    id: 'championships',
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
    id: 'teams',
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
    id: 'races',
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
