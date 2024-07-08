import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { InputOtp } from "primereact/inputotp";
import axios from "axios";

export default function OtpConfirmation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [token, setTokens] = useState<string | number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
      navigate("/login"); // Redirect to sign-in page after successful OTP confirmation
    } catch (error) {
      console.error("OTP confirmation failed", error);
      setError("OTP confirmation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const resendConfirmationCode = async (email:string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/account/resend_confirm_code`, null, {
        params: { username: email },
      });
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
                        {loading ? t("confirming") : t("confirm")}
                      </button>
                    </div>
                    <a href="javascript:void(0)" onClick={handleResendCode}>Resend code</a>
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
    </>
  );
}
