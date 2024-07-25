import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContext } from "../../helpers/context/ToastContext";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loadingSlice";

export default function ConfirmResetPasswordPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const email = location.state?.email || ""; 
  const [newPassword, setNewPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const toastContext = useContext(ToastContext)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmationCodeChange = (e) => setConfirmationCode(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    dispatch(startLoading())
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/account/confirm_reset_password`, {
        username: email,
        newPassword,
        confirmationCode,
      });
      console.log("Password reset confirmation successful", response.data);
      setSuccess("Your password has been reset successfully.");
      dispatch(stopLoading())
      toastContext?.showToast(
        "success",
        t("success"),
        t("resetPasswordConfirmedMessage")
      );
      navigate('/login')
      
    } catch (error) {
      console.error("Password reset confirmation failed", error);
      setError("Failed to reset password. Please try again.");
      dispatch(stopLoading())
      toastContext?.showToast(
        "error",
        t("error"),
        t("resetPasswordFailedMessage")
      );
    } finally {
      setLoading(false);
      dispatch(stopLoading())
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${t('confirmResetPassword')} - Moroccan Wonders`}</title>
      </Helmet>
      <section className="contact-one" style={{ marginTop: '80px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-one__content">
                <div className="block-title text-left">
                  <p>{t('confirmResetPassword')}</p>
                  <h3>{t('confirmResetPasswordTitle')}</h3>
                </div>
                <div className="contact-one__content-text">
                  <p>{t("confirmForgotPasswordDesc")}</p>
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
                        type="email"
                        placeholder="Email"
                        value={email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <input
                        name="newPassword"
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <input
                        name="confirmationCode"
                        type="text"
                        placeholder="Confirmation Code"
                        value={confirmationCode}
                        onChange={handleConfirmationCodeChange}
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
