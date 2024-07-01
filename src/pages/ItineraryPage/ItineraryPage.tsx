import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function ItineraryPage() {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("home"), url: "/" },
    { label: t("itinerary") },
  ];
  const title: string = `${t("itinerary")} - Moroccan Wonders`;
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader
        backgroundImageUrl="assets/images/backgrounds/page-header-contact.jpg"
        pageTitle={t("itinerary")}
        breadcrumbItems={breadcrumbItems}
      />
      <section className="tour-one tour-grid">
        <div className="container">
          <div className="tour-sorter-one">
            <h3>24 Tours Found</h3>
            <div className="tour-sorter-one__right">
              <div className="tour-sorter-one__select">
                <select name="sort-by" id="sort-by" className="selectpicker">
                  <option value="Sort">Sort</option>
                  <option value="By Date">By Date</option>
                  <option value="By Price">By Price</option>
                </select>
              </div>
              <a href="tour-sidebar.html">
                <i className="tripo-icon-list-menu"></i>
              </a>
              <a className="active" href="tour-standard.html">
                <i className="tripo-icon-squares"></i>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
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
            <div className="col-lg-4 col-md-6">
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
            <div className="col-lg-4 col-md-6">
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
            <div className="col-lg-4 col-md-6">
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
            <div className="col-lg-4 col-md-6">
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
            <div className="col-lg-4 col-md-6">
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
            <div className="col-lg-4 col-md-6">
              <div className="tour-one__single">
                <div className="tour-one__image">
                  <img src="src/assets/images/tour/tour-1-7.jpg" alt="" />
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
                    <span>$2000</span> / Per Person
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
            <div className="col-lg-4 col-md-6">
              <div className="tour-one__single">
                <div className="tour-one__image">
                  <img src="src/assets/images/tour/tour-1-8.jpg" alt="" />
                  <a href="tour-details.html">
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
                <div className="tour-one__content">
                  <div className="tour-one__stars">
                    <i className="fa fa-star"></i> 8.0 Superb
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
            <div className="col-lg-4 col-md-6">
              <div className="tour-one__single">
                <div className="tour-one__image">
                  <img src="src/assets/images/tour/tour-1-9.jpg" alt="" />
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
          </div>
          <div className="post-pagination">
            <a href="#">
              <i className="fa fa-angle-left"></i>
            </a>
            <a className="active" href="#">
              01
            </a>
            <a href="#">02</a>
            <a href="#">03</a>
            <a href="#">
              <i className="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
