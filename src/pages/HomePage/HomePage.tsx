import { useTranslation } from "react-i18next";
import "./HomePage.css";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Destination, DestinationResponse } from "../../Types/Destination";
import axios from "axios";
import { timeSince } from "../../helpers/utils";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const title: string = `${t("home")} - Moroccan Wonders`;
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [pageNo] = useState(0);
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
              "Content-Type": "application/json",
            },
            params: {
              pageNo: pageNo,
              pageSize: pageSize,
            },
          }
        );
        setDestinations(response.data.content);
        fetchImages(response.data.content);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };

    // Fetch image data for each destination using the first image key
    const fetchImages = async (destinations: Destination[]) => {
      const imagePromises = destinations.map(async (destination) => {
        if (destination.images && destination.images.length > 0) {
          try {
            const imageUrl = await getImageData(destination.images[0]);
            return { imageKey: destination.images[0], imageUrl };
          } catch (error) {
            console.error(`Error fetching image for ${destination.images[0]}:`, error);
            return { imageKey: destination.images[0], imageUrl: "" };
          }
        }
        return { imageKey: "", imageUrl: "" };
      });

      const images = await Promise.all(imagePromises);
      const imageMap = images.reduce((acc, image) => {
        acc[image.imageKey] = image.imageUrl;
        return acc;
      }, {} as { [key: string]: string });

      setImageUrls(imageMap);
    };

    fetchPlaces();
  }, [API_URL, pageNo, pageSize]);

  // Function to fetch image data from server using the file key
  const getImageData = async (fileKey: string | undefined): Promise<string> => {
    if (!fileKey) return "";

    try {
     // if (!token) throw new Error("Missing access token");

      const response = await axios.get(
        `${API_URL}/storage/download/${fileKey}`,
        {
        //  headers: { Authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      console.log(`Fetched image URL for ${fileKey}:`, imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image data:", error);
      return "";
    }
  };

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
            <p>{t("visit_us")}</p>
            <h3>{t("visit_us_desc")}</h3>
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
                <i className="tripo-icon-tour-guide"></i>
                <h3>{t("users")}</h3>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-duration="1500ms"
              data-wow-delay="100ms"
            >
              <div className="features-one__single">
                <i className="tripo-icon-reliability"></i>
                <h3>{t("trusted")}</h3>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-duration="1500ms"
              data-wow-delay="200ms"
            >
              <div className="features-one__single">
                <i className="tripo-icon-user-experience"></i>
                <h3>{t("existence")}</h3>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-duration="1500ms"
              data-wow-delay="300ms"
            >
              <div className="features-one__single">
                <i className="tripo-icon-feedback"></i>
                <h3>{t("happy_users")}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tour-one">
        <div className="container">
          <div className="block-title text-center">
            <p>{t("best_places")}</p>
            <h3>{t("popular_places")}</h3>
          </div>
          <div className="row">
            {destinations.map((destination, index) => (
              <div className="col-xl-4 col-lg-6" key={index}>
                <div className="tour-one__single">
                  <div className="tour-one__image">
                    <div className="square-image-container" >
                    <img
                      src={
                        imageUrls[destination.images[0]] ||
                        "src/assets/images/tour/tour-1-1.jpg"
                      }
                      alt={
                        destination.name[currentLanguage as "en" | "fr"]
                      }
                    />
                    </div>
                  </div>
                  <div className="tour-one__content">
                    <div className="tour-one__stars">
                      <i className="fa fa-star"></i> {destination.generalRating}{" "}
                      Superb
                    </div>
                    <h3>
                      <a href={`tour-details.html?id=${destination.id}`}>
                        {destination.name[currentLanguage as "en" | "fr"]}
                      </a>
                    </h3>
                    <ul className="tour-one__meta list-unstyled">
                      <li>
                        <a href={`tour-details.html?id=${destination.id}`}>
                          <i className="far fa-clock"></i>{" "}
                          {timeSince(
                            destination.createdAt,
                            currentLanguage as "en" | "fr"
                          )}
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
