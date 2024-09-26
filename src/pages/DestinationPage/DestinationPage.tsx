import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Destination, DestinationResponse } from "../../Types/Destination";
import { Category } from "../../Types/Category";
import { timeSince, truncateText } from "../../helpers/utils";
import { ProgressSpinner } from "primereact/progressspinner";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loadingSlice";

export default function DestinationPage() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const breadcrumbItems = [
    { label: t("home"), url: "/" },
    { label: t("destination") },
  ];
  const title = `${t("destination")} - Moroccan Wonders`;
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("accessToken");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<{ content: Category[] }>(
          `${API_URL}/category`,
          {
            headers: {
              //Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCategories(response.data.content);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, [API_URL, token]);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      dispatch(startLoading());
      try {
        const params = {
          pageNo,
          pageSize,
          categoryName: selectedCategory || undefined,
          placeName: searchTerm || undefined,
        };
        const response = await axios.get<DestinationResponse>(
          `${API_URL}/place`,
          {
            headers: {
              //Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params,
          }
        );
        setDestinations(response.data.content);
        setTotalPages(response.data.totalPages);
        console.log(response.data.content)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        dispatch(stopLoading());
      }
    };

    fetchPlaces();
  }, [API_URL, token, pageNo, pageSize, selectedCategory, searchTerm]);

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
                <h3>
                  {destinations.length} {t("places_found")}
                </h3>
              </div>
              {loading ? (
                <div className="loading-spinner">
                  <ProgressSpinner
                    style={{ width: "50px", height: "50px" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                </div>
              ) : (
                destinations.map((destination) => (
                  <div
                    key={destination.id}
                    className="tour-two__single tour-one__single"
                  >
                    <div className="tour-two__image-wrap">
                      <div className="tour-one__image">
                        {/* <img
                          src={destination.images[0] || ""}
                          alt={destination.name[currentLanguage as "en" | "fr"]}
                          style={{
                            aspectRatio: "1/1",
                            width: "300px",
                            height: "300px",
                          }}
                        /> */}
                      </div>
                    </div>
                    <div className="tour-one__content">
                      <div className="tour-two__top">
                        <div className="tour-two__top-left">
                          <div className="tour-one__stars">
                            <i className="fa fa-star"></i>{" "}
                            {destination.generalRating}
                          </div>
                          <h3>
                            <Link to={`/destination/${destination.id}`}>
                              {destination.name[currentLanguage as "en" | "fr"]}
                            </Link>
                          </h3>
                        </div>
                        {/* <div className="tour-two__right">
                          <p>
                            <span>${destination.generalRating}</span> <br /> {t("Per Person")}
                          </p>
                        </div> */}
                      </div>

                      <div className="tour-two__text">
                        <p>
                          {truncateText(
                            destination.description[
                              currentLanguage as "en" | "fr"
                            ],
                            100
                          )}
                        </p>
                      </div>
                      <ul className="tour-one__meta list-unstyled">
                        <li>
                          <div>
                            <i className="far fa-clock"></i>{" "}
                            {timeSince(destination?.createdAt, currentLanguage as "en" | "fr")}
                          </div>
                        </li>
                        <li>
                          <div>
                            <i className="far fa-map"></i> {destination.city}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))
              )}
              <div className="post-pagination">
                <Link
                  to="#"
                  onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))}
                  className={pageNo === 0 ? "disabled" : ""}
                >
                  <i className="fa fa-angle-left"></i>
                </Link>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Link
                    key={index}
                    to="#"
                    className={index === pageNo ? "active" : ""}
                    onClick={() => setPageNo(index)}
                  >
                    {index + 1}
                  </Link>
                ))}
                <Link
                  to="#"
                  onClick={() =>
                    setPageNo((prev) => Math.min(prev + 1, totalPages - 1))
                  }
                  className={pageNo === totalPages - 1 ? "disabled" : ""}
                >
                  <i className="fa fa-angle-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="tour-sidebar">
                <div className="tour-sidebar__sorter-wrap">
                  <div className="tour-sidebar__sorter-single">
                    <div className="tour-sorter-one__top">
                      <div className="sidebar__single sidebar__search">
                        <div className="sidebar__search-form d-flex align-items-center justify-content-center">
                          <input
                            className="pl-0"
                            type="search"
                            placeholder={t("search_place_name")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <i className="tripo-icon-magnifying-glass" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tour-sidebar__sorter-single">
                    <div className="tour-sidebar__sorter-top">
                      <h3>{t("categories")}</h3>
                      <button className="tour-sidebar__sorter-toggler">
                        <i className="fa fa-angle-down"></i>
                      </button>
                    </div>
                    <div className="tour-sidebar__sorter-content">
                      <div className="tour-sidebar__sorter-inputs">
                        {categories.map((category) => (
                          <p key={category.id}>
                            <input
                              type="checkbox"
                              id={`cat-${category.id}`}
                              name="radio-group"
                              value={
                                category.name[currentLanguage as "en" | "fr"]
                              }
                              checked={
                                selectedCategory ===
                                category.name[currentLanguage as "en" | "fr"]
                              }
                              onChange={(e) => {
                                if (
                                  selectedCategory ===
                                  category.name[currentLanguage as "en" | "fr"]
                                ) {
                                  setSelectedCategory(null);
                                } else {
                                  setSelectedCategory(e.target.value);
                                }
                              }}
                            />
                            <label htmlFor={`cat-${category.id}`}>
                              {category.name[currentLanguage as "en" | "fr"]}
                            </label>
                          </p>
                        ))}
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
