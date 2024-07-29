import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUser, faTasks, faSignOutAlt, faBell, faCog } from '@fortawesome/free-solid-svg-icons';

interface NavigationItem {
  label: string;
  icon: IconDefinition;
  subItems?: NavigationItem[];
}

export const profileNavigationData: NavigationItem[] = [
  {
    label: 'Profile',
    icon: faUser,
  },
  {
    label: 'Task',
    icon: faTasks,
  },
  {
    label: 'Notification',
    icon: faBell,
  },
  {
    label: 'Setting',
    icon: faCog,
  },
  {
    label: 'Logout',
    icon: faSignOutAlt,
  },
];
