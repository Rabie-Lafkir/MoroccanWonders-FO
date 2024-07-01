import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useScrollToTop from "../../helpers/scrollToTop";

export default function SignInPage() {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("home"), url: "/" },
    { label: t("signin") },
  ];
  const title: string = `${t("signin")} - Moroccan Wonders`;
  const { scrollToTop } = useScrollToTop();


  return (
    <div>
      <Helmet>
        <title>{title}</title>
        {/* <meta name="description" content={description} /> */}
      </Helmet>
      <PageHeader
        backgroundImageUrl="assets/images/backgrounds/page-header-contact.jpg"
        pageTitle={t("signin")}
        breadcrumbItems={breadcrumbItems}
      />
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
              <form
                action="https://pixydrops.com/tripo/inc/sendemail.php"
                className="contact-one__form"
              >
                <div className="row low-gutters">
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="text"
                        name="firstname"
                        placeholder={t("firstName")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="text"
                        name="email"
                        placeholder={t("lastName")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="email"
                        name="email"
                        placeholder={t("email")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="text"
                        name="phone"
                        placeholder={t("phoneNumber")}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <input name="country" placeholder={t("originCountry")} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <input type="checkbox" name="terms" />
                    <label htmlFor="terms" className="ml-2">
                      {t("agreedTerms")}{" "}
                      <Link onClick={scrollToTop} to={"/privacy"}>{t("privacyPolicy")}</Link>{" "}
                    </label>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <button
                        type="submit"
                        className="thm-btn contact-one__btn"
                      >
                        {t("signin")}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
