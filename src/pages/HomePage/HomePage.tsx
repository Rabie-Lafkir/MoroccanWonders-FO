import { useTranslation } from "react-i18next";
import "./HomePage.css";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Destination, DestinationResponse } from "../../types/Destination";
import axios from "axios";
import { timeSince } from "../../helpers/utils";
export default function HomePage() {
  const { t,i18n } = useTranslation();
  const title: string = `${t("home")} - Moroccan Wonders`;
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(3);
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("accessToken");
  const currentLanguage = i18n.language;


  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get<DestinationResponse>(
          `${API_URL}/place`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              pageNo: pageNo, 
              pageSize: pageSize 
            },
            
          }
        );
        setDestinations(response.data.content);
      } catch (err) {
        console.error(err);
      } 
    };

    fetchPlaces();
  }, [API_URL, token, pageNo, pageSize]); 

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
        </div>
      </section>
      <section className="features-one__title">
        <div className="container">
          <div className="block-title text-center">
            <p>{t('visit_us')}</p>
            <h3>
              {t('visit_us_desc')}
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
                  {t('users')}
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
                  {t('trusted')}
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
                  {t('existence')}
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
                  {t('happy_users')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tour-one">
  <div className="container">
    <div className="block-title text-center">
      <p>{t('best_places')}</p>
      <h3>{t('popular_places')}</h3>
    </div>
    <div className="row">
      {destinations.slice(0, 3).map((destination, index) => (
        <div className="col-xl-4 col-lg-6" key={index}>
          <div className="tour-one__single">
            <div className="tour-one__image">
              <img src={destination?.images[0] || "src/assets/images/tour/tour-1-1.jpg"} alt={destination.name[currentLanguage]} />
              <a href={`tour-details.html?id=${destination.id}`}>
                <i className="fa fa-heart"></i>
              </a>
            </div>
            <div className="tour-one__content">
              <div className="tour-one__stars">
                <i className="fa fa-star"></i> {destination.generalRating} Superb
              </div>
              <h3>
                <a href={`tour-details.html?id=${destination.id}`}>{destination.name[currentLanguage]}</a>
              </h3>
              <ul className="tour-one__meta list-unstyled">
                <li>
                  <a href={`tour-details.html?id=${destination.id}`}>
                    <i className="far fa-clock"></i> {timeSince(destination.createdAt, currentLanguage)}
                  </a>
                </li>
                <li>
                  <a href={`tour-details.html?id=${destination.id}`}>
                    <i className="far fa-map"></i> {destination.region}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

    </>
  );
}
