import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useScrollToTop from "../../helpers/scrollToTop";
import axios from "axios";

export default function SignInPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  const { scrollToTop } = useScrollToTop();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/account/sign_up`, formData);
      // Handle success
      console.log("Signup successful", response.data);
      navigate("/confirmation", { state: { email: formData.email } });
    } catch (error) {
      console.error("Signup failed", error);
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>{`${t("signin")} - Moroccan Wonders`}</title>
      </Helmet>
      <section className="contact-one" style={{ marginTop: "40px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="contact-one__content">
                <div className="block-title text-left">
                  <p>{t("signin")}</p>
                  <h3>{t("titleSignin")}</h3>
                </div>
                <div className="contact-one__content-text">
                  <p>{t("descriptionSignin")}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <form className="contact-one__form" onSubmit={handleSubmit}>
                <div className="row low-gutters">
                  {/* Form inputs */}
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="text"
                        name="firstName"
                        placeholder={t("firstName")}
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="text"
                        name="lastName"
                        placeholder={t("lastName")}
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="email"
                        name="email"
                        placeholder={t("email")}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder={t("phoneNumber")}
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="password"
                        name="password"
                        placeholder={t("password")}
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder={t("confirmPassword")}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <input
                        type="text"
                        name="originCountry"
                        placeholder={t("originCountry")}
                        value={formData.originCountry}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="terms" className="ml-2">
                      {t("agreedTerms")}{" "}
                      <Link onClick={scrollToTop} to={"/privacy"}>{t("privacyPolicy")}</Link>{" "}
                    </label>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <button type="submit" className="thm-btn contact-one__btn" disabled={loading}>
                        {loading ? t("signingUp") : t("signin")}
                      </button>
                    </div>
                  </div>
                  {error && <div className="col-md-12"><p className="error-message">{error}</p></div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
