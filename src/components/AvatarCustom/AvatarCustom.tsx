import React from 'react';
import { Avatar } from 'primereact/avatar';

interface AvatarCustomProps {
  className?: string;
  firstName: string;
  lastName: string;
  size?: 'normal' | 'large' | 'xlarge';
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  image?: string;
  children?: React.ReactNode; // Add children prop
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({
  className = '',
  firstName,
  lastName,
  size = 'normal',
  onClick,
  image,
  children,
}) => {
  // Generate label from the first letters of firstName and lastName
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
    <div onClick={onClick} className={`avatar-custom ${className}`}>
      <Avatar
        label={image ? undefined : label}
        className="mr-2 ml-3"
        style={{ backgroundColor, color: '#ffffff' }}
        shape="circle"
        size={size}
        image={image}
      />
      {children && <div className="avatar-children">{children}</div>}
    </div>
  );
};

export default AvatarCustom;
