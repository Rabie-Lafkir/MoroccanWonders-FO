import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useScrollToTop from "../../helpers/scrollToTop";
import axios from "axios";
import "./SignUpPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContext } from "../../helpers/context/ToastContext";
import { startLoading, stopLoading } from "../../store/loadingSlice";
import { useDispatch } from "react-redux";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  originCountry: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  originCountry?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function SignUpPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    originCountry: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [countries, setCountries] = useState<string[]>([]);
  const { scrollToTop } = useScrollToTop();
  const toastContext = useContext(ToastContext);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch country names and sort them alphabetically
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data
          .map((country) => country?.name.common)
          .sort((a, b) => a.localeCompare(b)); // Sort alphabetically
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

  const validatePassword = (password: string) => {
    // Minimum eight characters, at least one letter, one number, and one special character
    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleValidation = () => {
    const newErrors: Errors = {};
    if (!formData.firstName) newErrors.firstName = t("validation.required");
    if (!formData.lastName) newErrors.lastName = t("validation.required");
    if (!formData.email || !validateEmail(formData.email))
      newErrors.email = t("validation.invalidEmail");
    if (!formData.phoneNumber) newErrors.phoneNumber = t("validation.required");
    if (!formData.originCountry)
      newErrors.originCountry = t("validation.required");
    if (!formData.password || !validatePassword(formData.password))
      newErrors.password = t("validation.passwordRequirements");
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = t("validation.passwordMismatch");
    if (!formData.terms) newErrors.terms = t("validation.required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/account/sign_up`,
        formData
      );
      // Handle success
      console.log("Signup successful", response.data);
      toastContext?.showToast("success", t("success"), t("signupSuccess"));
      dispatch(stopLoading());
      navigate("/confirmation", { state: { email: formData.email } });
    } catch (error) {
      console.error("Signup failed", error);
      toastContext?.showToast("error", t("error"), t("signupFailed"));
      setError(t("signupFailed"));
      dispatch(stopLoading());
    } finally {
      setLoading(false);
      dispatch(stopLoading());
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Helmet>
        <title>{`${t("signup")} - Moroccan Wonders`}</title>
      </Helmet>
      <section className="contact-one" style={{ marginTop: "40px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="contact-one__content">
                <div className="block-title text-left">
                  <p>{t("signup")}</p>
                  <h3>{t("titleSignin")}</h3>
                </div>
                <div className="contact-one__content-text">
                  <p>{t("descriptionSignin")}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
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
                      className={`input-group ${errors.email ? "error" : ""}`}
                    >
                      <input
                        type="email"
                        name="email"
                        placeholder={t("email")}
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="error-message">{errors.email}</div>
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
                      className={`input-group ${errors.password ? "error" : ""}`}
                    >
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder={t("password")}
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <span
                        className="input-group-icon"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </span>
                      {errors.password && (
                        <div className="error-message">{errors.password}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={`input-group ${errors.confirmPassword ? "error" : ""}`}
                    >
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder={t("confirmPassword")}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <span
                        className="input-group-icon"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </span>
                      {errors.confirmPassword && (
                        <div className="error-message">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
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
                    <div
                      className={`input-group ${errors.terms ? "error" : ""}`}
                    >
                      <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                      />
                      <label htmlFor="terms" className="ml-2">
                        {t("agreedTerms")}{" "}
                        <Link onClick={scrollToTop} to={"/privacy"}>
                          {t("privacyPolicy")}
                        </Link>{" "}
                      </label>
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
                          t("signup")
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
