import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Galleria } from "primereact/galleria";
import { useTranslation } from "react-i18next";
import { timeSince } from "../../helpers/utils";

interface Location {
  latitude: string;
  longitude: string;
}

interface NameDescription {
  en: string;
  fr: string;
}

interface Category {
  id: string;
  name: NameDescription;
  subCategories: string[];
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  image: string;
}

interface Rating {
  id: string;
  rate: number;
  comment: string;
  user: User;
  createdAt: string;
}

interface Place {
  id: string;
  name: NameDescription;
  description: NameDescription;
  location: Location;
  images: string[];
  category: Category;
  createdBy: string;
  numberOfRatings: number;
  generalRating: number;
  ratings: Rating[];
  region: string;
  createdAt: string;
  updatedAt: string;
}

const DestinationDetailsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as keyof NameDescription;
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const API_URL = import.meta.env.VITE_API_URL as string;
  const token = localStorage.getItem("accessToken");

  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/place/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlace(response.data);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    fetchPlaceDetails();
  }, [id, API_URL, token]);

  if (!place) {
    return <div>Loading...</div>;
  }

  const { name, description, location, images, category, ratings } = place;

  const galleriaImages = images.map((image) => ({
    itemImageSrc: image,
    thumbnailImageSrc: image,
  }));

  const itemTemplate = (item: any) => {
    return (
      <img src={item.itemImageSrc} alt="Image" style={{ width: "100%" }} />
    );
  };

  const thumbnailTemplate = (item: any) => {
    return <img src={item.thumbnailImageSrc} alt="Thumbnail" style={{ aspectRatio: "1/1", width: "50px" , height: "50px" }} />;
  };

  return (
    <section className="tour-two tour-list">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="tour-details__content">
              <div className="tour-two__top">
                <div className="tour-two__top-left">
                  <h3>{name[currentLanguage]}</h3>
                  <div className="tour-one__stars">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star inactive"></i>{" "}
                    { place.numberOfRatings} {t("reviews")}
                  </div>
                </div>
              </div>
              <ul className="tour-one__meta list-unstyled">
                <li>
                  <a href="tour-details.html">
                    <i className="far fa-clock"></i> {timeSince(place?.createdAt, 'en')}
                  </a>
                </li>
                <li>
                  <a href="tour-details.html">
                    <i className="far fa-user-circle"></i> {place?.createdBy}
                  </a>
                </li>
                <li>
                  <a href="tour-details.html">
                    <i className="far fa-bookmark"></i>{" "}
                    {category.name[currentLanguage]}
                  </a>
                </li>
                <li>
                  <a href="tour-details.html">
                    <i className="far fa-map"></i> {place?.region}
                  </a>
                </li>
              </ul>

              {/* Galleria */}
              <Galleria
                circular
                autoPlay
                transitionInterval={2000}
                value={galleriaImages}
                responsiveOptions={responsiveOptions}
                numVisible={5}
                style={{ maxWidth: "640px" }}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
              />
<div className="tour-details__spacer"></div>
              <h3 className="tour-details__title">{t("description")}</h3>
              <p>{description[currentLanguage]}</p>

              <div className="tour-details__spacer"></div>
              <h3 className="tour-details__title">{t("location")}</h3>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd`}
                className="google-map__contact google-map__tour-details"
                allowFullScreen
              ></iframe>
              <div className="tour-details__spacer"></div>

              <div className="tour-details__review-comment">
                {ratings.map((rating) => (
                  <div
                    key={rating.id}
                    className="tour-details__review-comment-single"
                  >
                    <div className="tour-details__review-comment-top">
                      <img
                        src={rating.user.image}
                        alt={`${rating.user.firstName} ${rating.user.lastName}`}
                      />
                      <h3>{`${rating.user.firstName} ${rating.user.lastName}`}</h3>
                      <p>{new Date(rating.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="tour-details__review-comment-content">
                      <p>{rating.comment}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="tour-details__title">{t("write_a_review")}</h3>
              <div className="tour-details__review-form">
                <form
                  action="https://pixydrops.com/tripo/inc/sendemail.php"
                  className="contact-one__form"
                >
                  <div className="row low-gutters">
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          type="text"
                          name="name"
                          placeholder={t("your_name")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          type="text"
                          name="email"
                          placeholder={t("email_address")}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-group">
                        <input
                          type="text"
                          name="subject"
                          placeholder={t("review_title")}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-group">
                        <textarea
                          name="message"
                          placeholder={t("write_message")}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-group">
                        <button
                          type="submit"
                          className="thm-btn contact-one__btn"
                        >
                          {t("submit_review")}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tour-sidebar">
              <div className="tour-sidebar__organizer">
                <h3>{t("organized_by")}</h3>
                <div className="tour-sidebar__organizer-content">
                  <img
                    src="src/assets/images/tour/tour-organizer-1-1.jpg"
                    alt="Organizer"
                  />
                  <p>
                    <i className="fa fa-star"></i>8.0 {t("superb")}
                  </p>
                  <h3>Mike Hardson</h3>
                  <span>{t("member_since", { year: 2019 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationDetailsPage;
