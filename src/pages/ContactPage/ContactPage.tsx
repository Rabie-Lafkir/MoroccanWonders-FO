import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Helmet } from "react-helmet";

export default function ContactPage() {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("home"), url: "/" },
    { label: t("contact") },
  ];
  const title: string = `${t("contact")} - Moroccan Wonders`;
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader
        backgroundImageUrl="assets/images/backgrounds/page-header-contact.jpg"
        pageTitle="Contact"
        breadcrumbItems={breadcrumbItems}
      />
      <section className="contact-info-one">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="contact-info-one__single">
                <div className="contact-info-one__icon">
                  <i className="tripo-icon-placeholder"></i>
                </div>
                <div className="contact-info-one__content">
                  <p>
                    77 Broklyn Street, D Capital <br />
                    Road New York. USA 6666
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-info-one__single">
                <div className="contact-info-one__icon">
                  <i className="tripo-icon-phone-call"></i>
                </div>
                <div className="contact-info-one__content">
                  <p>
                    Local: <a href="tel:666-999-0000">666 999 0000</a> <br />
                    Mobile: <a href="tel:+123-456-hello">+ 123 456 hello</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-info-one__single">
                <div className="contact-info-one__icon">
                  <i className="tripo-icon-message"></i>
                </div>
                <div className="contact-info-one__content">
                  <p>
                    <a href="mailto:needhelp@tripo.com">needhelp@tripo.com</a>{" "}
                    <br />
                    <a href="mailto:info@tripo.com">info@tripo.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-one">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="contact-one__content">
                <div className="block-title text-left">
                  <p>Contact with us</p>
                  <h3>
                    Have any Question? <br />
                    feel free to contact <br />
                    with us.
                  </h3>
                </div>
                <div className="contact-one__content-text">
                  <p>
                    Lorem ipsum available isn but the majority have suffered
                    alteratin <br /> in some or form injected.
                  </p>
                </div>
                <div className="contact-one__social">
                  <a href="#">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-dribbble"></i>
                  </a>
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
                      <input type="text" name="name" placeholder="Your Name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input type="text" name="subject" placeholder="Subject" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <textarea
                        name="message"
                        placeholder="Write Message"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <button
                        type="submit"
                        className="thm-btn contact-one__btn"
                      >
                        Send message
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
