import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useScrollToTop from "../../helpers/scrollToTop";

export default function Layout() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);
  const location = useLocation();
  const { scrollToTop } = useScrollToTop();

  useEffect(() => {
    const handleMenuToggle = (e: JQuery.Event) => {
      $(".side-menu__block").toggleClass("active");
      console.log("clicked");
      e.preventDefault();
    };

    if ($(".side-menu__toggler").length) {
      $(".side-menu__toggler").off("click").on("click", handleMenuToggle);
    }

    return () => {
      $(".side-menu__toggler").off("click", handleMenuToggle);
    };
  }, []);

  useEffect(() => {
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
      {/* layout structure */}
      <div className="site-header__header-one-wrap">
        <div className="topbar-one">
          <div className="container-fluid">
            <div className="topbar-one__left">
              <a href="mailto:needhelp@moroccanwonders.com">
                needhelp@moroccanwonders.com
              </a>
            </div>
            <div className="topbar-one__right">
              <div className="topbar-one__social">
                <Link to="#">
                  <i className="fab fa-facebook-square"></i>
                </Link>
                <Link to="#">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="#">
                  <i className="fab fa-instagram"></i>
                </Link>
              </div>
              <Link onClick={scrollToTop} to="/login" className="topbar-one__guide-btn">
                {t("login")}
              </Link>
              <Link onClick={scrollToTop} to="/signin" className="topbar-one__guide-btn">
                {t("signin")}
              </Link>
            </div>
          </div>
        </div>
        <header className="main-nav__header-one ">
          <nav className="header-navigation stricky">
            <div className="container">
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
                    <Link onClick={scrollToTop} to="/destination">{t("destination")}</Link>
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
                <Link to="#" className="main-nav__search search-popup__toggler">
                  <i className="tripo-icon-magnifying-glass"></i>
                </Link>
                {/* <Link to="#" className="main-nav__login">
                  <i className="tripo-icon-avatar"></i>
                </Link> */}
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
              </div>
            </div>
          </nav>
        </header>
      </div>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="site-footer__bg"></div>

        <div className="container">
          <div className="row">
            <div className="footer-widget__column footer-widget__about">
              <Link
                onClick={scrollToTop}
                to="/"
                className="footer-widget__logo"
              >
                <img src="src/assets/images/logo.png" width="230" alt="" />
              </Link>
              <p>{t("descriptionFooter")}</p>
              <a href="mailto:needhelp@moroccanwonders.com">
                needhelp@moroccanwonders.com
              </a>{" "}
              <br />
            </div>
            <div className="footer-widget__column footer-widget__links">
              <h3 className="footer-widget__title">Company</h3>
              <ul className="footer-widget__links-list list-unstyled">
                <li>
                  <Link onClick={scrollToTop} to="/about">{t("about")}</Link>
                </li>
                <li>
                  <Link onClick={scrollToTop} to="/team">{t("team")}</Link>
                </li>
              </ul>
            </div>
            <div className="footer-widget__column footer-widget__links">
              <h3 className="footer-widget__title">Links</h3>
              <ul className="footer-widget__links-list list-unstyled">
                <li>
                  <Link onClick={scrollToTop} to="/destination">{t("destination")}</Link>
                </li>
                <li>
                  <Link onClick={scrollToTop} to="/itinerary">{t("itinerary")}</Link>
                </li>
                <li>
                  <Link onClick={scrollToTop} to="/contact">
                    {t("contact")}
                  </Link>
                </li>
                <li>
                  <Link onClick={scrollToTop} to="/faq">FAQs</Link>
                </li>
              </ul>
            </div>
            <div className="footer-widget__column footer-widget__gallery">
              <h3 className="footer-widget__title">Instagram</h3>
              <ul className="footer-widget__gallery-list list-unstyled">
                <li>
                  <a href="#">
                    <img
                      src="src/assets/images/resources/footer-1-1.jpg"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="src/assets/images/resources/footer-1-2.jpg"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="src/assets/images/resources/footer-1-3.jpg"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="src/assets/images/resources/footer-1-4.jpg"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="src/assets/images/resources/footer-1-5.jpg"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="src/assets/images/resources/footer-1-6.jpg"
                      alt=""
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="site-footer__bottom">
        <div className="container">
          <p>
            @ All copyright {getCurrentYear()},{" "}
            <a href="#">MoroccanWonders Team</a>
          </p>
          <div className="site-footer__social">
            <a href="#">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-dribbble"></i>
            </a>
          </div>
        </div>
      </div>
      <a href="#" data-target="html" className="scroll-to-target scroll-to-top">
        <i className="fa fa-angle-up"></i>
      </a>
      <div className="side-menu__block">
        <div className="side-menu__block-overlay custom-cursor__overlay">
          <div className="cursor"></div>
          <div className="cursor-follower"></div>
        </div>
        <div className="side-menu__block-inner ">
          <div className="side-menu__top justify-content-end">
            <a href="#" className="side-menu__toggler side-menu__close-btn">
              <img src="src/assets/images/shapes/close-1-1.png" alt="" />
            </a>
          </div>

          <nav className="mobile-nav__container">
            {/* <!-- content is loading via js --> */}
          </nav>
          <div className="side-menu__sep"></div>
          <div className="side-menu__content">
            <div className="side-menu__social">
              <a href="#">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
