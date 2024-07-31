import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUser, faTasks, faSignOutAlt, faBell, faCog } from '@fortawesome/free-solid-svg-icons';

interface NavigationItem {
  label: string;
  icon: IconDefinition;
  to: string;
  subItems?: NavigationItem[];
}

export const profileNavigationData: NavigationItem[] = [
  {
    label: 'Profile',
    icon: faUser,
    to: '/profile/details'
  },
  {
    label: 'Task',
    icon: faTasks,
    to: '/profile/task'
  },
  {
    label: 'Notification',
    icon: faBell,
    to: '/profile/notfications'
  },
  {
    label: 'Setting',
    icon: faCog,
    to: '/profile/Setting'
  },
  {
    label: 'Logout',
    icon: faSignOutAlt,
    to: '/profile/logout'
  },
];
