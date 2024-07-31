import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContext } from "../../../helpers/context/ToastContext";
import { startLoading, stopLoading } from "../../../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store"; 
import { setUser, updateUser } from "../../../store/updateSlice";

interface FormData {
  userId: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "";
  username: string;
  phoneNumber: string;
  originCountry: string;
  image: string;
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
    gender: user?.gender === "MALE" || user?.gender === "FEMALE" ? user.gender : "",
    username: user?.username || "",
    phoneNumber: user?.phoneNumber || "",
    originCountry: user?.originCountry || "",
    image: user?.image || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [countries, setCountries] = useState<string[]>([]);

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
  }, []);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleValidation()) return;
    dispatch(startLoading());
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/account/user_info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await axios.get(`${API_URL}/account/user_info`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
      }).then(response =>{
        const data = response?.data
        dispatch(
          setUser({
            
              userId: data.userId,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: data.gender,
              username: data.username,
              emailVerified: data.emailVerified,
              phoneNumber: data.phoneNumber,
              phoneNumberVerified: data.phoneNumberVerified,
              originCountry: data.originCountry,
              image: data.image,
              authorities: data.authorities,
           
          })
        );

      });
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
                  <div className="col-md-6">
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
