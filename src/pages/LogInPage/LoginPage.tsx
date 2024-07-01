import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("home"), url: "/" },
    { label: t("login") },
  ];
  const title: string = `${t("login")} - Moroccan Wonders`;
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader
        backgroundImageUrl="assets/images/backgrounds/page-header-contact.jpg"
        pageTitle={t("login")}
        breadcrumbItems={breadcrumbItems}
      />
      <section className="contact-one" style={{ marginTop: "80px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-one__content">
                <div className="block-title text-left">
                  <p>{t("login")}</p>
                  <h3>{t("titleLogin")}</h3>
                </div>
                <div className="contact-one__content-text">
                  <p>{t("descriptionLogin")}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form className="contact-one__form">
                <div className="row low-gutters">
                  <div className="col-md-12">
                    <div className="input-group">
                      <input name="email" type="email" placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <p>
                      Don't have an account?{" "}
                      <Link to={"/signin"}>{t("signin")}</Link>
                    </p>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <button
                        type="submit"
                        className="thm-btn contact-one__btn"
                      >
                        {t("login")}
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
