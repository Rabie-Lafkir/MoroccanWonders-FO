import { useTranslation } from "react-i18next";
import "./HomePage.css";
import { Helmet } from "react-helmet";
export default function HomePage() {
  const { t } = useTranslation();
  const title: string = `${t("home")} - Moroccan Wonders`;
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="banner-one">
        <div className="container">
          <h2>
            {t("hero1")} <span>{t("hero2")}</span>
          </h2>
          <p>{t("hero3")}</p>
          <form
            className="tour-search-one"
            action="https://pixydrops.com/tripo/tour-sidebar.html"
          >
            <div className="tour-search-one__inner">
              <div className="tour-search-one__inputs">
                <div className="tour-search-one__input-box">
                  <label htmlFor="place">Where to</label>
                  <input
                    type="text"
                    placeholder="Enter keywords"
                    name="place"
                    id="place"
                  />
                </div>
                <div className="tour-search-one__input-box">
                  <label htmlFor="when">When</label>
                  <input
                    type="text"
                    placeholder="September"
                    name="when"
                    id="when"
                  />
                </div>
                <div className="tour-search-one__input-box">
                  <label htmlFor="type">Type</label>
                  <select className="selectpicker d-flex" id="type">
                    <option value="Adventure">Adventure</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Sightseeing">Sightseeing</option>
                  </select>
                </div>
              </div>
              <div className="tour-search-one__btn-wrap">
                <button type="submit" className="thm-btn tour-search-one__btn">
                  {t("findNow")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="features-one__title">
        <div className="container">
          <div className="block-title text-center">
            <p>Call our agents to book!</p>
            <h3>
              Tripo Award Winning and Top <br /> Rated Tour Operator
            </h3>
          </div>
        </div>
      </section>

      <section className="features-one__content">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-duration="1500ms"
              data-wow-delay="000ms"
            >
              <div className="features-one__single">
                <i className=" tripo-icon-tour-guide"></i>
                <h3>
                  8000+ Our Local <br /> Guides
                </h3>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-duration="1500ms"
              data-wow-delay="100ms"
            >
              <div className="features-one__single">
                <i className=" tripo-icon-reliability"></i>
                <h3>
                  100% Trusted Tour <br /> Agency
                </h3>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-duration="1500ms"
              data-wow-delay="200ms"
            >
              <div className="features-one__single">
                <i className=" tripo-icon-user-experience"></i>
                <h3>
                  28+ Years of Travel <br /> Experience
                </h3>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-duration="1500ms"
              data-wow-delay="300ms"
            >
              <div className="features-one__single">
                <i className=" tripo-icon-feedback"></i>
                <h3>
                  98% Our Travelers <br /> are Happy
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tour-one">
        <div className="container">
          <div className="block-title text-center">
            <p>Featured tours</p>
            <h3>Most Popular Tours</h3>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-6">
              <div className="tour-one__single">
                <div className="tour-one__image">
                  <img src="src/assets/images/tour/tour-1-1.jpg" alt="" />
                  <a href="tour-details.html">
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
                <div className="tour-one__content">
                  <div className="tour-one__stars">
                    <i className="fa fa-star"></i> 8.0 Superb
                  </div>
                  <h3>
                    <a href="tour-details.html">National Park 2 Days Tour</a>
                  </h3>
                  <p>
                    <span>$1870</span> / Per Person
                  </p>
                  <ul className="tour-one__meta list-unstyled">
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-clock"></i> 3 Days
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-user-circle"></i> 12+
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-map"></i> Los Angeles
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="tour-one__single">
                <div className="tour-one__image">
                  <img src="src/assets/images/tour/tour-1-2.jpg" alt="" />
                  <a href="tour-details.html">
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
                <div className="tour-one__content">
                  <div className="tour-one__stars">
                    <i className="fa fa-star"></i> 8.0 Superb
                  </div>
                  <h3>
                    <a href="tour-details.html">The Dark Forest Adventure</a>
                  </h3>
                  <p>
                    <span>$2600</span> / Per Person
                  </p>
                  <ul className="tour-one__meta list-unstyled">
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-clock"></i> 3 Days
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-user-circle"></i> 12+
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-map"></i> Los Angeles
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="tour-one__single">
                <div className="tour-one__image">
                  <img src="src/assets/images/tour/tour-1-3.jpg" alt="" />
                  <a href="tour-details.html">
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
                <div className="tour-one__content">
                  <div className="tour-one__stars">
                    <i className="fa fa-star"></i> 7.0 Superb
                  </div>
                  <h3>
                    <a href="tour-details.html">Discover Depth of Beach</a>
                  </h3>
                  <p>
                    <span>$1399</span> / Per Person
                  </p>
                  <ul className="tour-one__meta list-unstyled">
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-clock"></i> 3 Days
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-user-circle"></i> 12+
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-map"></i> Los Angeles
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="tour-one__single">
                <div className="tour-one__image">
                  <img src="src/assets/images/tour/tour-1-4.jpg" alt="" />
                  <a href="tour-details.html">
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
                <div className="tour-one__content">
                  <div className="tour-one__stars">
                    <i className="fa fa-star"></i> 8.8 Superb
                  </div>
                  <h3>
                    <a href="tour-details.html">Moscow Red City Land</a>
                  </h3>
                  <p>
                    <span>$1870</span> / Per Person
                  </p>
                  <ul className="tour-one__meta list-unstyled">
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-clock"></i> 3 Days
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-user-circle"></i> 12+
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-map"></i> Los Angeles
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="tour-one__single">
                <div className="tour-one__image">
                  <img src="src/assets/images/tour/tour-1-5.jpg" alt="" />
                  <a href="tour-details.html">
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
                <div className="tour-one__content">
                  <div className="tour-one__stars">
                    <i className="fa fa-star"></i> 8.0 Superb
                  </div>
                  <h3>
                    <a href="tour-details.html">Magic of Italy Tours</a>
                  </h3>
                  <p>
                    <span>$1478</span> / Per Person
                  </p>
                  <ul className="tour-one__meta list-unstyled">
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-clock"></i> 3 Days
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-user-circle"></i> 12+
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-map"></i> Los Angeles
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="tour-one__single">
                <div className="tour-one__image">
                  <img src="src/assets/images/tour/tour-1-6.jpg" alt="" />
                  <a href="tour-details.html">
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
                <div className="tour-one__content">
                  <div className="tour-one__stars">
                    <i className="fa fa-star"></i> 8.0 Superb
                  </div>
                  <h3>
                    <a href="tour-details.html">Discover Depth of Beach</a>
                  </h3>
                  <p>
                    <span>$1399</span> / Per Person
                  </p>
                  <ul className="tour-one__meta list-unstyled">
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-clock"></i> 3 Days
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-user-circle"></i> 12+
                      </a>
                    </li>
                    <li>
                      <a href="tour-details.html">
                        <i className="far fa-map"></i> Los Angeles
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
