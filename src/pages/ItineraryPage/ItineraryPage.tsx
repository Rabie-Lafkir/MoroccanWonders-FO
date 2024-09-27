import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";
import axios from "axios";
import { Itinerary, ItineraryResponse } from "../../Types/Itinerary";
import { ProgressSpinner } from "primereact/progressspinner";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loadingSlice";
import { Link } from "react-router-dom";

export default function ItineraryPage() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as "en" | "fr";
  const API_URL = import.meta.env.VITE_API_URL; // Environment variable for base API URL
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItineraries = async () => {
      setLoading(true);
      dispatch(startLoading());
      try {
        const params = {
          pageNo,
          pageSize,
        };
        const response = await axios.get<ItineraryResponse>(
          `${API_URL}/travel_plan`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            params, // Pass params as query parameters
          }
        );
        setItineraries(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      } finally {
        setLoading(false);
        dispatch(stopLoading());
      }
    };
    fetchItineraries();
  }, [API_URL, pageNo, pageSize, dispatch]);

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
            <h3>{`${itineraries.length} ${t("it_found")}`}</h3>
          </div>
          <div className="row">
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
              itineraries.map((itinerary, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="tour-one__single">
                    <div className="tour-one__image">
                      <img src="src/assets/images/tour/tour-1-1.jpg" alt="" />
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </div>
                    <div className="tour-one__content">
                      <div className="tour-one__stars">
                        <i className="fa fa-star"></i>{" "}
                        {itinerary.generalRating.toFixed(1)}{" "}
                        {itinerary.generalRating >= 7 ? t("Superb") : t("Good")}
                      </div>
                      <h3>
                        
                        <Link to={`/itinerary/${itinerary.id}`}>
                              {itinerary.name[currentLanguage as "en" | "fr"]}
                            </Link>
                      </h3>
                      <ul className="tour-one__meta list-unstyled">
                        <li>
                          <a href="#">
                            <i className="far fa-arrow-alt-circle-right"></i> {t("Check the details")}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
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
      </section>
    </>
  );
}
