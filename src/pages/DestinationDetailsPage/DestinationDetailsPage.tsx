import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Galleria } from "primereact/galleria";
import { useTranslation } from "react-i18next";
import { timeSince } from "../../helpers/utils";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Rating as PrimeRating, Rating } from "primereact/rating";
import "./DestinationDetailsPage.css";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loadingSlice";
import { ProgressSpinner } from "primereact/progressspinner";

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
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as keyof NameDescription;
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [userImages, setUserImages] = useState<{ [key: string]: string }>({});
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const API_URL = import.meta.env.VITE_API_URL as string;
  const token = localStorage.getItem("accessToken");
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const menuLeft = useRef<Menu>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const [editingRatingId, setEditingRatingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number | null>(null);
  const [editComment, setEditComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const items = (ratingId: string): MenuItem[] => [
    {
      items: [
        {
          label: "Modifier",
          icon: "pi pi-pencil",
          command: () => {
            const rating = place?.ratings.find(
              (r) => r.user.id === user?.userId
            );
            console.log("Found rating:", rating);
            if (rating) {
              setEditingRatingId(rating.id);
              setEditValue(rating.rate);
              setEditComment(rating.comment);
              setVisible(true);
            }
          },
        },
        {
          label: "Supprimer",
          icon: "pi pi-trash",
          command: () => {
            console.log("Deleting rating with id:", ratingId);
            deleteRating(ratingId);
          },
        },
      ],
    },
  ];

  const [value, setValue] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  const responsiveOptions = [
    { breakpoint: "991px", numVisible: 4 },
    { breakpoint: "767px", numVisible: 3 },
    { breakpoint: "575px", numVisible: 1 },
  ];

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      setIsLoading(true);
      dispatch(startLoading());
      try {
        const response = await axios.get(`${API_URL}/place/${id}`, {
          // headers: { Authorization: `Bearer ${token}` },
        });
        setPlace(response.data);
        fetchGalleryImages(response.data.images);
      } catch (error) {
        console.error("Error fetching place details:", error);
      } finally {
        setIsLoading(false);
        dispatch(stopLoading());
      }
    };

    fetchPlaceDetails();
  }, [id, API_URL, token]);

  useEffect(() => {
    if (!place) return;

    const fetchUserImages = async () => {
      const images: { [key: string]: string } = {};
      for (const rating of place.ratings) {
        if (rating.user?.image) {
          const imageUrl = await getImageData(rating.user.image);
          images[rating.user.id] = imageUrl;
        }
      }
      setUserImages(images);
    };

    fetchUserImages();
  }, [place]);

  // Fetch gallery images
  const fetchGalleryImages = async (imageKeys: string[]) => {
    try {
      const imagePromises = imageKeys.map((key) => getImageData(key));
      const fetchedImages = await Promise.all(imagePromises);
      setGalleryImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  const getImageData = async (fileKey: string | undefined): Promise<string> => {
    if (!fileKey) return "";

    try {
      const response = await axios.get(
        `${API_URL}/storage/download/${fileKey}`,
        {
          // headers: { Authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "image/png" });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error fetching image data:", error);
      return "";
    }
  };

  // Define a function to refetch the place details
  const refetchPlaceDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/place/${id}`, {
       // headers: { Authorization: `Bearer ${token}` },
      });
      setPlace(response.data);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const addRating = async () => {
    if (!value || !comment) return;

    try {
      if (!token) throw new Error("Missing access token");

      await axios.post(
        `${API_URL}/rating`,
        {
          placeId: id,
          rate: value,
          comment: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Rating added successfully");
      // Refetch place details to update the page
      refetchPlaceDetails();
      // Optionally clear the form fields
      setValue(null);
      setComment("");
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  const deleteRating = async (ratingId: string) => {
    console.log("Deleting rating with id:", ratingId);
    try {
      await axios.delete(`${API_URL}/rating/${ratingId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      refetchPlaceDetails();
    } catch (error) {
      console.log("Error deleting rating:", error);
    }
  };

  const updateRating = async () => {
    console.log("Updating rating with id:", editingRatingId);
    if (editingRatingId === null || editValue === null || !editComment) return;

    try {
      await axios.put(
        `${API_URL}/rating/${editingRatingId}`,
        {
          id: editingRatingId,
          rate: editValue,
          comment: editComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Rating updated successfully");
      refetchPlaceDetails();
      setVisible(false);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRating();
  };

  const footerContent = (
    <div>
      <button type="button" className="thm-btn" onClick={updateRating}>
        {t("update")}
      </button>
    </div>
  );

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">{t("edit_review")}</span>
    </div>
  );

  if (!place) {
    return (
      <div className="loading-spinner d-flex align-items-center justify-content-center">
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      </div>
    );
  }

  const { name, description, location, category, ratings } = place;

  // Use the fetched gallery images
  const galleriaImages = galleryImages.map((image) => ({
    itemImageSrc: image,
    thumbnailImageSrc: image,
  }));

  const itemTemplate = (item: any) => (
    <img src={item.itemImageSrc} alt="Image" style={{ width: "100%" }} />
  );

  const thumbnailTemplate = (item: any) => (
    <img
      src={item.thumbnailImageSrc}
      alt="Thumbnail"
      style={{ aspectRatio: "1/1", width: "50px", height: "50px" }}
    />
  );

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
                    <PrimeRating
                      value={place.generalRating}
                      readOnly
                      cancel={false}
                    />
                    <p style={{ marginLeft: "10px" }}>
                      {place.numberOfRatings} {t("reviews")}
                    </p>
                  </div>
                </div>
              </div>
              <ul className="tour-one__meta list-unstyled">
                <li>
                  <a href="tour-details.html">
                    <i className="far fa-clock"></i>{" "}
                    {timeSince(place?.createdAt, currentLanguage)}
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
                style={{ maxWidth: "840px" }}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
              />
              <div className="tour-details__spacer"></div>
              <h3 className="tour-details__title">{t("description")}</h3>
              <p>{description[currentLanguage]}</p>

              <div className="tour-details__spacer"></div>
              <h3 className="tour-details__title">{t("location")}</h3>
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                  center={{
                    lat: parseFloat(location.latitude),
                    lng: parseFloat(location.longitude),
                  }}
                  zoom={15}
                >
                  <Marker
                    position={{
                      lat: parseFloat(location.latitude),
                      lng: parseFloat(location.longitude),
                    }}
                  />
                </GoogleMap>
              </LoadScript>

              <div className="tour-details__spacer"></div>

              <div className="tour-details__review-comment">
                {ratings.map((rating) => (
                  <div
                    key={rating.id}
                    className="tour-details__review-comment-single"
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="tour-details__review-comment-top">
                        <img
                          src={
                            userImages[rating.user.id] ||
                            "default-image-url.jpg"
                          }
                          alt={`${rating.user.firstName} ${rating.user.lastName}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                          }}
                        />
                        <h3>{`${rating.user.firstName} ${rating.user.lastName}`}</h3>
                        <p>{timeSince(rating.createdAt, currentLanguage)}</p>
                      </div>
                      <div>
                        <Menu
                          model={items(rating.id)}
                          popup
                          ref={menuLeft}
                          id="popup_menu_right"
                          popupAlignment="right"
                        />
                        <button
                          className="mr-2"
                          onClick={(event) => menuLeft.current?.toggle(event)}
                          aria-controls="popup_menu_right"
                          aria-haspopup="true"
                          style={{
                            display:
                              rating.user.id === user?.userId ? "" : "none",
                          }}
                        >
                          <i className="pi pi-ellipsis-v"></i>
                        </button>
                        <Dialog
                          visible={visible}
                          modal
                          header={headerElement}
                          footer={footerContent}
                          style={{ width: "50rem" }}
                          onHide={() => {
                            setVisible(false);
                            setEditingRatingId(null);
                            setEditValue(null);
                            setEditComment("");
                          }}
                        >
                          <form className="tour-sidebar__search-form">
                            <div className="input-group">
                              <PrimeRating
                                value={editValue}
                                onChange={(e) => setEditValue(e.value)}
                                cancel={false}
                              />
                            </div>
                            <div className="input-group">
                              <textarea
                                placeholder="Message"
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                              ></textarea>
                            </div>
                          </form>
                        </Dialog>
                      </div>
                    </div>

                    <div className="tour-details__review-comment-content">
                      <PrimeRating
                        value={rating.rate}
                        readOnly
                        cancel={false}
                      />
                      <p>{rating.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tour-sidebar">
              <div
                className="tour-sidebar__search tour-sidebar__single"
                style={{
                  display: ratings.some(
                    (rating) => rating.user.id === user?.userId
                  )
                    ? "none"
                    : "block",
                }}
              >
                <h3 className="tour-details__title">{t("write_a_review")}</h3>
                <form
                  onSubmit={handleSubmit}
                  className="tour-sidebar__search-form"
                >
                  <div className="input-group">
                    <PrimeRating
                      value={value}
                      onChange={(e) => setValue(e.value)}
                      cancel={false}
                    />
                  </div>
                  <div className="input-group">
                    <textarea
                      placeholder="Message"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="input-group">
                    <button type="submit" className="thm-btn">
                      {t("submit")}
                    </button>
                  </div>
                </form>
              </div>

              <div className="tour-details__review-score">
                <div className="tour-details__review-score-ave">
                  <div
                    className="my-auto d-flex align-items-center justify-content-between"
                    style={{ padding: "20px" }}
                  >
                    <h3>{place.generalRating.toFixed(1)}</h3>
                    <p>
                      <i className="fa fa-star"></i> Super
                    </p>
                  </div>
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
