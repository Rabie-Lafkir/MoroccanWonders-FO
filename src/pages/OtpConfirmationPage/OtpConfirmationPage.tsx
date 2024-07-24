import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { InputOtp } from "primereact/inputotp";
import axios from "axios";
import { ToastContext } from "../../helpers/context/ToastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loadingSlice";

export default function OtpConfirmationPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [token, setTokens] = useState<string | number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toastContext = useContext(ToastContext);
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    dispatch(startLoading())

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/account/confirm_sign_up`,
        {
          username: email,
          confirmationCode: token,
        }
      );
      // Handle success (e.g., navigate to a new page, display a success message, etc.)
      console.log("OTP confirmation successful", response.data);
      toastContext?.showToast(
        "success",
        t("success"),
        t("otpConfirmationSuccess")
      );
      dispatch(stopLoading())
      navigate("/login"); // Redirect to sign-in page after successful OTP confirmation
    } catch (error) {
      console.error("OTP confirmation failed", error);
      setError("OTP confirmation failed. Please try again.");
      toastContext?.showToast(
        "error",
        t("error"),
        t("otpConfirmationFailure")
      );
      dispatch(stopLoading())
    } finally {
      setLoading(false);
      dispatch(stopLoading())
    }
  };

  const resendConfirmationCode = async (email: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/account/resend_confirm_code`,
        null,
        {
          params: { username: email },
        }
      );
      console.log("Resend confirmation code successful", response.data);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Resend confirmation code failed", error);
      throw error; // Throw the error to be handled by the caller
    }
  };

  const handleResendCode = async () => {
    try {
      await resendConfirmationCode(email);
      alert("Confirmation code resent successfully");
    } catch (error) {
      alert("Failed to resend confirmation code");
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${t("confirmationEmail")} - Moroccan Wonders`}</title>
      </Helmet>
      <PageHeader
        backgroundImageUrl="assets/images/backgrounds/page-header-contact.jpg"
        pageTitle={t("confirmationEmail")}
        breadcrumbItems={[
          { label: t("signin"), url: "/" },
          { label: t("confirmationEmail") },
        ]}
      />

      <section className="contact-one" style={{ marginTop: "80px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-one__content">
                <div className="block-title text-left">
                  <p>{t("confirmationEmail")}</p>
                  <h3>{t("titleConfirmEmail")}</h3>
                </div>
                <div className="contact-one__content-text">
                  <p>{t("descriptionConfirmation")}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form className="contact-one__form" onSubmit={handleSubmit}>
                <div className="row low-gutters">
                  <div className="col-md-12">
                    <div className="input-group">
                      <div className="flex justify-content-center">
                        <InputOtp
                          length={6}
                          value={token}
                          onChange={(e) => setTokens(e.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="input-group">
                      <button
                        type="submit"
                        className="thm-btn contact-one__btn"
                        disabled={loading}
                      >
                        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : t("confirm")}
                      </button>
                    </div>
                    <a href="javascript:void(0)" onClick={handleResendCode}>
                      Resend code
                    </a>
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
