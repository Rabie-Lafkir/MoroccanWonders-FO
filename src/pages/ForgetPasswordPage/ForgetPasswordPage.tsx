import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgetPasswordPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();


  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/account/reset_password`, null, {
        params: { username: email },
      });
      console.log("Password reset initiation successful", response.data);
      setSuccess("Password reset instructions have been sent to your email.");
      // Navigate to ConfirmResetPasswordPage and pass email as state
      navigate('/confirm-reset-password', { state: { email } });
    } catch (error) {
      console.error("Password reset initiation failed", error);
      setError("Failed to initiate password reset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${t('resetPassword')} - Moroccan Wonders`}</title>
      </Helmet>
      {/* <PageHeader
        backgroundImageUrl="assets/images/backgrounds/page-header-contact.jpg"
        pageTitle={t('login')}
        breadcrumbItems={[
          { label: t('home'), url: '/' },
          { label: t('login') },
        ]}
      /> */}
      <section className="contact-one" style={{ marginTop: '80px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-one__content">
                <div className="block-title text-left">
                  <p>{t('resetPassword')}</p>
                  <h3>{t('resetPasswordTitle')}</h3>
                </div>
                <div className="contact-one__content-text">
                  <p>{t("forgotPasswordDesc")}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form className="contact-one__form" onSubmit={handleSubmit}>
                <div className="row low-gutters">
                  <div className="col-md-12">
                    <div className="input-group">
                      <input
                        name="username"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <button
                        type="submit"
                        className="thm-btn contact-one__btn"
                        disabled={loading}
                      >
                        {loading ? t('submitting') : t('submit')}
                      </button>
                    </div>
                  </div>
                  {error && <div className="col-md-12"><p className="error-message">{error}</p></div>}
                  {success && <div className="col-md-12"><p className="success-message">{success}</p></div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
