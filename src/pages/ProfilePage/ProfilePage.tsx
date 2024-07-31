import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { profileNavigationData } from "./profileNavigationData";
import "./ProfilePage.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AvatarCustom from "../../components/AvatarCustom/AvatarCustom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link, Outlet, useLocation } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();


  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="wrapper">
      <aside id="sidebar" className={sidebarExpanded ? "expand" : ""}>
        <div className="d-flex">
          <button className="toggle-btn" type="button" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <ul className="sidebar-nav">
          <div className="d-flex flex-column align-items-center justify-content-center mb-4">
            <AvatarCustom
              firstName={user?.firstName || "U"}
              lastName={user?.lastName || "U"}
              size={sidebarExpanded ? "xlarge" : "normal"}
              onClick={() => {}}
            />
            {sidebarExpanded ? (
              <>
                <p style={{ marginBottom: "10px" }}>
                  {user?.firstName} {user?.lastName}
                </p>
                <small style={{ lineHeight: "0" }}>{user?.username}</small>
              </>
            ) : null}
          </div>
          {profileNavigationData.map((item, index) => (
            <li key={index} className="sidebar-item">
              <Link
                to={item.to}
                className={`sidebar-link collapsed has-dropdown ${
                      location.pathname === item.to ? "sidebar-link-current " : ""
                    }` }
                data-bs-toggle={item.subItems ? "collapse" : undefined}
                data-bs-target={
                  item.subItems
                    ? `#${item.label.replace(/\s+/g, "").toLowerCase()}`
                    : undefined
                }
                aria-expanded="false"
                aria-controls={
                  item.subItems
                    ? item.label.replace(/\s+/g, "").toLowerCase()
                    : undefined
                }
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.label}</span>
              </Link>
              {item.subItems && (
                <ul
                  id={item.label.replace(/\s+/g, "").toLowerCase()}
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
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
