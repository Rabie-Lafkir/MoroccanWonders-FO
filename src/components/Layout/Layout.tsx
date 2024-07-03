import React, { useEffect, useState, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useScrollToTop from "../../helpers/scrollToTop";
import "./Layout.css";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../../store/authSlice";
import { RootState } from "../../store/store";

export default function Layout() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    i18n.language
  );
  const location = useLocation();
  const { scrollToTop } = useScrollToTop();
  const menuRight = useRef<Menu>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.accessToken);


  const handleLogout = () => {
    dispatch(clearAuthData());
    navigate("/login");
  };

  const items: MenuItem[] = [
    {
      label: "Options",
      items: [
        {
          label: "Profile",
          icon: "pi pi-user",
          command: () => {
            navigate("/");
          },
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: handleLogout,
        },
      ],
    },
  ];

  useEffect(() => {
    // Your existing useEffect for side menu toggle
    const handleMenuToggle = (e: JQuery.Event) => {
      $(".side-menu__block").toggleClass("active");
      console.log("clicked");
      e.preventDefault();
    };

    if ($(".side-menu__toggler").length) {
      $(".side-menu__toggler")
        .off("click")
        .on("click", handleMenuToggle);
    }

    return () => {
      $(".side-menu__toggler").off("click", handleMenuToggle);
    };
  }, []);

  useEffect(() => {
    // Your existing useEffect for main navigation dropdown
    if ($(".main-nav__main-navigation").length) {
      const mobileNavContainer: JQuery<HTMLElement> = $(
        ".mobile-nav__container"
      );
      const mainNavContent: string = $(".main-nav__main-navigation").html();

      if (mainNavContent && !mobileNavContainer.html()) {
        mobileNavContainer.append(mainNavContent);

        // Dropdown Button
        mobileNavContainer
          .find("li.dropdown .dropdown-btn")
          .on("click", function (e: JQuery.Event) {
            $(this).toggleClass("open");
            $(this).parent().parent().children("ul").slideToggle(500);
            e.preventDefault();
            console.log("clicked");
          });
      }
    }
  }, []);

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
    setCurrentLanguage(selectedLanguage);
    console.log(selectedLanguage);
  };

  function getCurrentYear(): number {
    return new Date().getFullYear();
  }

  return (
    <div className="layout">
      {/* Your header and navigation structure */}
      <header className="main-nav__header-one ">
        <nav className="header-navigation stricky">
          <div className="container">
            {/* Your logo and main navigation */}
            <div className="main-nav__logo-box">
              <Link onClick={scrollToTop} to="/" className="main-nav__logo">
                <img
                  src="src/assets/images/logo.png"
                  className="main-logo"
                  width="123"
                  alt="Awesome Image"
                />
              </Link>
              <Link to="#" className="side-menu__toggler">
                <i className="fa fa-bars"></i>
              </Link>
            </div>

            <div className="main-nav__main-navigation">
              {/* Your main navigation links */}
              <ul className=" main-nav__navigation-box">
                <li
                  className={`dropdown  ${
                    location.pathname === "/" ? "current" : ""
                  }`}
                >
                  <Link to="/">{t("home")}</Link>
                </li>
                <li
                  className={`dropdown  ${
                    location.pathname === "/destination" ? "current" : ""
                  }`}
                >
                  <Link onClick={scrollToTop} to="/destination">
                    {t("destination")}
                  </Link>
                </li>
                <li
                  className={`dropdown  ${
                    location.pathname === "/itinerary" ? "current" : ""
                  }`}
                >
                  <Link to="/itinerary">{t("itinerary")}</Link>
                </li>
                <li
                  className={`dropdown  ${
                    location.pathname === "/contact" ? "current" : ""
                  }`}
                >
                  <Link to="/contact">{t("contact")}</Link>
                </li>
              </ul>
            </div>

            <div className="main-nav__right">
              {/* Your search, language selector, and avatar/menu */}
              <Link
                to="#"
                className="main-nav__search search-popup__toggler"
              >
                <i className="tripo-icon-magnifying-glass"></i>
              </Link>
              <select
                name="languages"
                id="languages"
                className="selectpicker"
                onChange={handleChangeLanguage}
                value={currentLanguage}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
              {/* Avatar and menu for user actions */}
              {isLoggedIn ? (
        <div>
          <Menu
                model={items}
                popup
                ref={menuRight}
                id="popup_menu_right"
                popupAlignment="right"
              />
              <Avatar
                label="SM"
                className="mr-2"
                style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
                shape="circle"
                onClick={(event) => menuRight.current?.toggle(event)}
                aria-controls="popup_menu_right"
                aria-haspopup
              />
        </div>
      ) : ''}
              
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Outlet for rendering nested routes */}
        <Outlet />
      </main>

      {/* Your footer section */}
      <footer className="site-footer">
        <div className="site-footer__bg"></div>
        <div className="container">
          {/* Footer content */}
        </div>
      </footer>

      {/* Bottom footer */}
      <div className="site-footer__bottom">
        <div className="container">
          <p>
            @ All copyright {getCurrentYear()},{" "}
            <a href="#">MoroccanWonders Team</a>
          </p>
          {/* Social media links */}
        </div>
      </div>

      {/* Side menu block for mobile */}
      <div className="side-menu__block">
        <div className="side-menu__block-overlay custom-cursor__overlay">
          <div className="cursor"></div>
          <div className="cursor-follower"></div>
        </div>
        <div className="side-menu__block-inner ">
          <div className="side-menu__top justify-content-end">
            <a
              href="#"
              className="side-menu__toggler side-menu__close-btn"
            >
              <img
                src="src/assets/images/shapes/close-1-1.png"
                alt=""
              />
            </a>
          </div>
          <nav className="mobile-nav__container">
            {/* Content loaded via JavaScript */}
          </nav>
          <div className="side-menu__sep"></div>
          <div className="side-menu__content">
            {/* Social media links */}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <a href="#" data-target="html" className="scroll-to-target scroll-to-top">
        <i className="fa fa-angle-up"></i>
      </a>
    </div>
  );
}
