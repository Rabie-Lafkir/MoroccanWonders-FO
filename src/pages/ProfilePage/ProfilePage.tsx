import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { profileNavigationData } from './profileNavigationData';
import './ProfilePage.css'; 
import { faBars } from '@fortawesome/free-solid-svg-icons';

const ProfilePage: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="wrapper">
      <aside id="sidebar" className={sidebarExpanded ? 'expand' : ''}>
        <div className="d-flex">
          <button className="toggle-btn" type="button" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <ul className="sidebar-nav">
          {profileNavigationData.map((item, index) => (
            <li key={index} className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle={item.subItems ? 'collapse' : undefined}
                data-bs-target={item.subItems ? `#${item.label.replace(/\s+/g, '').toLowerCase()}` : undefined}
                aria-expanded="false"
                aria-controls={item.subItems ? item.label.replace(/\s+/g, '').toLowerCase() : undefined}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.label}</span>
              </a>
              {item.subItems && (
                <ul
                  id={item.label.replace(/\s+/g, '').toLowerCase()}
                  className="sidebar-dropdown list-unstyled collapse"
                  data-bs-parent="#sidebar"
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="sidebar-item">
                      <a href="#" className="sidebar-link">
                        <FontAwesomeIcon icon={subItem.icon} />
                        <span>{subItem.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
      <div className="main p-3">
        <div className="text-center">
          <h1>Sidebar Bootstrap 5</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
