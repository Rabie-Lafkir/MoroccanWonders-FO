import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContext } from "../../helpers/context/ToastContext";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loadingSlice";

export default function ForgetPasswordPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);
  const dispatch =  useDispatch();


  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    dispatch(startLoading())

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/account/reset_password`, null, {
        params: { username: email },
      });
      console.log("Password reset initiation successful", response.data);
      setSuccess("Password reset instructions have been sent to your email.");
      toastContext?.showToast(
        "success",
        t("success"),
        t("resetPasswordSuccess")
      );
      dispatch(stopLoading())
      // Navigate to ConfirmResetPasswordPage and pass email as state
      navigate('/confirm-reset-password', { state: { email } });
    } catch (error) {
      console.error("Password reset initiation failed", error);
      setError("Failed to initiate password reset. Please try again.");
      dispatch(stopLoading())
      toastContext?.showToast(
        "error",
        t("error"),
        t("resetPasswordFailure")
      );
    } finally {
      setLoading(false);
      dispatch(stopLoading())
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${t('resetPassword')} - Moroccan Wonders`}</title>
      </Helmet>
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
                        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : t('submit')}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
