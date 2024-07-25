import React from 'react';
import { Avatar } from 'primereact/avatar';

interface AvatarCustomProps {
  firstName: string;
  lastName: string;
  size?: 'normal' | 'large' | 'xlarge';
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({ firstName, lastName, size = 'normal', onClick }) => {
  // Generate label from first letters of firstName and lastName
  const generateLabel = (firstName: string, lastName: string): string => {
    if (!firstName || !lastName) return '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Generate a background color based on the label letters
  const generateBackgroundColor = (label: string): string => {
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
      hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.abs(hash % 16777215).toString(16);
    return `#${'000000'.substring(0, 6 - color.length) + color}`;
  };

  const label = generateLabel(firstName, lastName);
  const backgroundColor = generateBackgroundColor(label);

  return (
    <Avatar
      label={label}
      className="mr-2 ml-3"
      style={{ backgroundColor, color: '#ffffff' }}
      shape="circle"
      size={size}
      onClick={onClick}
      aria-controls="popup_menu_right"
      aria-haspopup
    />
  );
};

export default AvatarCustom;
