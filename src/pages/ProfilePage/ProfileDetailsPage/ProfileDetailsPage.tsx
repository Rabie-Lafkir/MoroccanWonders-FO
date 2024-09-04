import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContext } from "../../../helpers/context/ToastContext";
import { startLoading, stopLoading } from "../../../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateUser } from "../../../store/authSlice";
import AvatarCustom from "../../../components/AvatarCustom/AvatarCustom";
import "./ProfileDetailsPage.css";

interface FormData {
  userId: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "";
  username: string;
  phoneNumber: string;
  originCountry: string;
  image: string; // This should be the fileKey returned from the upload
}

interface Errors {
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  originCountry?: string;
  gender?: string;
  image?: string;
}

export default function ProfileDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastContext = useContext(ToastContext);
  const user = useSelector((state: RootState) => state.auth.user);
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState<FormData>({
    userId: user?.userId || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    gender:
      user?.gender === "MALE" || user?.gender === "FEMALE" ? user.gender : "",
    username: user?.username || "",
    phoneNumber: user?.phoneNumber || "",
    originCountry: user?.originCountry || "",
    image: user?.image || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [countries, setCountries] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>(""); // State to store the image URL

  const uploadImage = async (image: File, token: string) => {
    const url = `${API_URL}/storage/save_file`;

    // Create a form data object to send the image file
    const formData = new FormData();
    formData.append("file", image);

    try {
      // Send the POST request with the Bearer token in the headers
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        success: true,
        message: response.data.message,
        data: response.data.fileKey, // Extracting fileKey
      };
    } catch (error) {
      // Handle errors, e.g., network issues, server errors
      return {
        success: false,
        message: error.response?.data?.message || "Failed to upload image",
      };
    }
  };

  const getImageData = async (fileKey: string | undefined): Promise<string> => {
    if (!fileKey) {
      return ""; // Return an empty string if there's no fileKey
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Missing access token");

      const response = await axios.get(
        `${API_URL}/storage/download/${fileKey}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer", // This is important for binary data
        }
      );

      // Convert the binary data to a Blob
      const blob = new Blob([response.data], { type: "image/png" }); // Adjust the type if necessary
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error fetching image data:", error);
      return "";
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data
          .map((country) => country?.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();

    // Fetch the image URL if the fileKey (image) is available
    if (formData.image) {
      getImageData(formData.image).then(setImageUrl);
    }
  }, [formData.image]);

  const handleValidation = () => {
    const newErrors: Errors = {};
    if (!formData.firstName) newErrors.firstName = t("validation.required");
    if (!formData.lastName) newErrors.lastName = t("validation.required");
    if (!formData.username) newErrors.username = t("validation.required");
    if (!formData.phoneNumber) newErrors.phoneNumber = t("validation.required");
    if (!formData.originCountry)
      newErrors.originCountry = t("validation.required");
    if (!formData.gender) newErrors.gender = t("validation.required");
    if (!formData.image) newErrors.image = t("validation.required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleImageUploadClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // Accept any image type
    fileInput.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const imageFile = target.files[0];
        const token = localStorage.getItem("accessToken");
        if (token) {
          setLoading(true);
          const response = await uploadImage(imageFile, token);
          if (response.success) {
            setFormData({ ...formData, image: response.data }); // Set the fileKey as image
            toastContext?.showToast(
              "success",
              t("success"),
              t("imageUploadSuccess")
            );
          } else {
            toastContext?.showToast("error", t("error"), response.message);
          }
          setLoading(false);
        } else {
          toastContext?.showToast("error", t("error"), t("missingToken"));
        }
      }
    };
    fileInput.click(); // Trigger the file input dialog
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleValidation()) return;

    setLoading(true);
    setError("");
    dispatch(startLoading());

    try {
      const token = localStorage.getItem("accessToken");

      await axios.put(`${API_URL}/account/user_info`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axios.get(`${API_URL}/account/user_info`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      dispatch(updateUser(data));
      toastContext?.showToast("success", t("success"), t("updateSuccess"));
      navigate("/profile");
    } catch (error) {
      console.error("Update failed", error);
      toastContext?.showToast("error", t("error"), t("updateFailed"));
      setError(t("updateFailed"));
    } finally {
      setLoading(false);
      dispatch(stopLoading());
    }
  };

  return (
    <div>
      <Helmet>
        <title>{`${t("profileUpdate")} - Moroccan Wonders`}</title>
      </Helmet>
      <section className="contact-one" style={{ marginTop: "40px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form
                className="contact-one__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="d-flex align-items-center justify-content-center mb-5">
                  <AvatarCustom
                    className="avatar"
                    firstName={formData.firstName}
                    lastName={formData.lastName}
                    size="xlarge"
                    onClick={() => {}} // Trigger the file input dialog
                    image={imageUrl}
                  >
                    <button
                      className="upload-icon"
                      type="button"
                      onClick={handleImageUploadClick}
                    >
                      <FontAwesomeIcon icon={faCamera} />
                    </button>
                  </AvatarCustom>
                </div>
                <div className="row low-gutters">
                  <div className="col-md-6">
                    <div
                      className={`input-group ${errors.firstName ? "error" : ""}`}
                    >
                      <input
                        type="text"
                        name="firstName"
                        placeholder={t("firstName")}
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && (
                        <div className="error-message">{errors.firstName}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={`input-group ${errors.lastName ? "error" : ""}`}
                    >
                      <input
                        type="text"
                        name="lastName"
                        placeholder={t("lastName")}
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && (
                        <div className="error-message">{errors.lastName}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={`input-group ${errors.username ? "error" : ""}`}
                    >
                      <input
                        type="text"
                        name="username"
                        placeholder={t("username")}
                        value={formData.username}
                        onChange={handleChange}
                      />
                      {errors.username && (
                        <div className="error-message">{errors.username}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={`input-group ${errors.phoneNumber ? "error" : ""}`}
                    >
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder={t("phoneNumber")}
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                      {errors.phoneNumber && (
                        <div className="error-message">
                          {errors.phoneNumber}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={`input-group ${errors.gender ? "error" : ""}`}
                    >
                      <select
                        className="w-100 country-select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          {t("gender")}
                        </option>
                        <option value="MALE">{t("male")}</option>
                        <option value="FEMALE">{t("female")}</option>
                      </select>
                      {errors.gender && (
                        <div className="error-message">{errors.gender}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={`input-group ${errors.originCountry ? "error" : ""}`}
                    >
                      <select
                        className="w-100 country-select"
                        name="originCountry"
                        value={formData.originCountry}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          {t("originCountry")}
                        </option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.originCountry && (
                        <div className="error-message">
                          {errors.originCountry}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <button
                        type="submit"
                        className="thm-btn contact-one__btn"
                        disabled={loading}
                      >
                        {loading ? (
                          <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                          t("updateProfile")
                        )}
                      </button>
                    </div>
                  </div>
                  {error && (
                    <div className="col-md-12">
                      <p className="error-message">{error}</p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
