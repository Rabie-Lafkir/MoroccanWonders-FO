import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useEffect } from "react";
import axios from "axios";

export default function DestinationPage() {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("home"), url: "/" },
    { label: t("destination") },
  ];
  const title: string = `${t("destination")} - Moroccan Wonders`;
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('accessToken')
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${API_URL}/place`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Optional, depends on your API's requirements
          },
        });
        console.log(response)
      } catch (err) {
        console.log(err);
      }
    }

    fetchPlaces()
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader
        backgroundImageUrl="assets/images/backgrounds/page-header-contact.jpg"
        pageTitle={t("destination")}
        breadcrumbItems={breadcrumbItems}
      />
      <section className="tour-two tour-list">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="tour-sorter-one">
                <h3>24 Tours Found</h3>
                <div className="tour-sorter-one__right">
                  <div className="tour-sorter-one__select">
                    <select
                      name="sort-by"
                      id="sort-by"
                      className="selectpicker"
                    >
                      <option value="Sort">Sort</option>
                      <option value="By Date">By Date</option>
                      <option value="By Price">By Price</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="tour-two__single tour-one__single">
                <div className="tour-two__image-wrap">
                  <div className="tour-one__image">
                    <img src="src/assets/images/tour/tour-2-1.jpg" alt="" />
                    <a href="tour-details.html">
                      <i className="fa fa-heart"></i>
                    </a>
                  </div>
                </div>
                <div className="tour-one__content">
                  <div className="tour-two__top">
                    <div className="tour-two__top-left">
                      <div className="tour-one__stars">
                        <i className="fa fa-star"></i> 8.0 Superb
                      </div>
                      <h3>
                        <a href="tour-details.html">
                          National Park 2 Days Tour
                        </a>
                      </h3>
                    </div>
                    <div className="tour-two__right">
                      <p>
                        <span>$1870</span> <br /> Per Person
                      </p>
                    </div>
                  </div>

                  <div className="tour-two__text">
                    <p>
                      Lorem ipsum available isn but the majority have suffered
                      alteratin in some or form injected semper fames.
                    </p>
                  </div>
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
            <div className="col-lg-4">
              <div className="tour-sidebar">
                <div className="tour-sidebar__sorter-wrap">
                  <div className="tour-sidebar__sorter-single"></div>
                  <div className="tour-sidebar__sorter-single">
                    <div className="tour-sidebar__sorter-top">
                      <h3>Review Score</h3>
                      <button className="tour-sidebar__sorter-toggler">
                        <i className="fa fa-angle-down"></i>
                      </button>
                    </div>
                    <div className="tour-sidebar__sorter-content">
                      <div className="tour-sidebar__sorter-inputs">
                        <p>
                          <input
                            type="checkbox"
                            id="review-5"
                            name="radio-group"
                          />
                          <label htmlFor="review-5">
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star active"></i>
                          </label>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            id="review-4"
                            name="radio-group"
                          />
                          <label htmlFor="review-4">
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star"></i>
                          </label>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            id="review-3"
                            name="radio-group"
                          />
                          <label htmlFor="review-3">
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </label>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            id="review-2"
                            name="radio-group"
                          />
                          <label htmlFor="review-2">
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star "></i>
                            <i className="fa fa-star "></i>
                            <i className="fa fa-star "></i>
                          </label>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            id="review-1"
                            name="radio-group"
                          />
                          <label htmlFor="review-1">
                            <i className="fa fa-star active"></i>
                            <i className="fa fa-star "></i>
                            <i className="fa fa-star "></i>
                            <i className="fa fa-star "></i>
                            <i className="fa fa-star "></i>
                          </label>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tour-sidebar__sorter-single">
                    <div className="tour-sidebar__sorter-top">
                      <h3>Categories</h3>
                      <button className="tour-sidebar__sorter-toggler">
                        <i className="fa fa-angle-down"></i>
                      </button>
                    </div>
                    <div className="tour-sidebar__sorter-content">
                      <div className="tour-sidebar__sorter-inputs">
                        <p>
                          <input
                            type="checkbox"
                            id="cat-5"
                            name="radio-group"
                          />
                          <label htmlFor="cat-5">City Tours</label>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            id="cat-4"
                            name="radio-group"
                          />
                          <label htmlFor="cat-4">HostedTours</label>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            id="cat-3"
                            name="radio-group"
                          />
                          <label htmlFor="cat-3">Adventure Tours</label>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            id="cat-2"
                            name="radio-group"
                          />
                          <label htmlFor="cat-2">Group Tours</label>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            id="cat-1"
                            name="radio-group"
                          />
                          <label htmlFor="cat-1">Couple Tours</label>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
