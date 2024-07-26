// ProfileDetailsPage.tsx
import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import axios from "axios";
//import "./ProfileDetailsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContext } from "../../../helpers/context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { startLoading, stopLoading } from "../../../store/loadingSlice";

interface FormData {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  originCountry: string;
  gender: string | undefined;
  username: string;
  image: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  originCountry?: string;
  gender?: string;
  username?: string;
  image?: string;
}

const ProfileDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toastContext = useContext(ToastContext);
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState<FormData>({
    userId: user?.userId || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    originCountry: user?.originCountry || "",
    gender: user?.gender,
    username: user?.username || "",
    image: user?.image || "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    // Fetch country names and sort them alphabetically
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data
          .map((country: any) => country?.name.common)
          .sort((a: string, b: string) => a.localeCompare(b)); // Sort alphabetically
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleValidation = () => {
    const newErrors: Errors = {};
    if (!formData.firstName) newErrors.firstName = t("validation.required");
    if (!formData.lastName) newErrors.lastName = t("validation.required");
    if (!formData.phoneNumber) newErrors.phoneNumber = t("validation.required");
    if (!formData.originCountry)
      newErrors.originCountry = t("validation.required");
    if (!formData.username) newErrors.username = t("validation.required");

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

  const updateUserInfo = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/user-info`, formData);
      console.log('User info updated successfully:', response.data);
      toastContext?.showToast("success", t("success"), t("profileUpdateSuccess"));
    } catch (error) {
      console.error('Error updating user info:', error);
      toastContext?.showToast("error", t("error"), t("profileUpdateFailed"));
    } finally {
      setLoading(false);
      dispatch(stopLoading());
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleValidation()) return;
    dispatch(startLoading());
    setLoading(true);
    await updateUserInfo();
  };

  return (
    <div>
      <Helmet>
        <title>{`${t("profileDetails")} - Moroccan Wonders`}</title>
      </Helmet>
      <section className="contact-one" style={{ marginTop: "40px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="contact-one__content">
                <div className="block-title text-left">
                  <p>{t("profileDetails")}</p>
                  <h3>{t("titleProfileDetails")}</h3>
                </div>
                <div className="contact-one__content-text">
                  <p>{t("descriptionProfileDetails")}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <form className="contact-one__form" onSubmit={handleSubmit} noValidate>
                <div className="row low-gutters">
                  <div className="col-md-6">
                    <div className={`input-group ${errors.firstName ? "error" : ""}`}>
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
                    <div className={`input-group ${errors.lastName ? "error" : ""}`}>
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
                    <div className={`input-group ${errors.phoneNumber ? "error" : ""}`}>
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder={t("phoneNumber")}
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                      {errors.phoneNumber && (
                        <div className="error-message">{errors.phoneNumber}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={`input-group ${errors.username ? "error" : ""}`}>
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
                    <div className={`input-group ${errors.originCountry ? "error" : ""}`}>
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
                        <div className="error-message">{errors.originCountry}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={`input-group ${errors.gender ? "error" : ""}`}>
                      <select
                        className="w-100 gender-select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="MALE">{t("male")}</option>
                        <option value="FEMALE">{t("female")}</option>
                        <option value="OTHER">{t("other")}</option>
                      </select>
                      {errors.gender && (
                        <div className="error-message">{errors.gender}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className={`input-group ${errors.image ? "error" : ""}`}>
                      <input
                        type="text"
                        name="image"
                        placeholder={t("image")}
                        value={formData.image}
                        onChange={handleChange}
                      />
                      {errors.image && (
                        <div className="error-message">{errors.image}</div>
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
                  {Object.keys(errors).length > 0 && (
                    <div className="col-md-12">
                      <p className="error-message">{t("formErrors")}</p>
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
};

export default ProfileDetailsPage;
