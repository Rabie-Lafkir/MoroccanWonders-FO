import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function CategoryPage() {

    const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("home"), url: "/" },
    { label: t("category") },
  ];
  const title: string = `${t("category")} - Moroccan Wonders`;
  return (
    <>
    <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader
        backgroundImageUrl="assets/images/backgrounds/page-header-contact.jpg"
        pageTitle={t("category")}
        breadcrumbItems={breadcrumbItems}
      />
      <section className="team-one">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="team-one__single">
                <div className="team-one__image">
                  <img src="src/assets/images/team/team-2-1.jpg" alt="" />
                </div>
                <div className="team-one__content">
                  <h3>Gregory Bowman</h3>
                  <p className="text-uppercase">Tour Guide</p>
                  <div className="team-one__social">
                    <a href="#">
                      <i className="fab fa-facebook-square"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-one__single">
                <div className="team-one__image">
                  <img src="src/assets/images/team/team-2-2.jpg" alt="" />
                </div>
                <div className="team-one__content">
                  <h3>Daisy Phillips</h3>
                  <p className="text-uppercase">Tour Guide</p>
                  <div className="team-one__social">
                    <a href="#">
                      <i className="fab fa-facebook-square"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-one__single">
                <div className="team-one__image">
                  <img src="src/assets/images/team/team-2-3.jpg" alt="" />
                </div>
                <div className="team-one__content">
                  <h3>Elijah Rios</h3>
                  <p className="text-uppercase">Tour Guide</p>
                  <div className="team-one__social">
                    <a href="#">
                      <i className="fab fa-facebook-square"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-one__single">
                <div className="team-one__image">
                  <img src="src/assets/images/team/team-2-4.jpg" alt="" />
                </div>
                <div className="team-one__content">
                  <h3>Ryan Graves</h3>
                  <p className="text-uppercase">Tour Guide</p>
                  <div className="team-one__social">
                    <a href="#">
                      <i className="fab fa-facebook-square"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-one__single">
                <div className="team-one__image">
                  <img src="src/assets/images/team/team-2-5.jpg" alt="" />
                </div>
                <div className="team-one__content">
                  <h3>Stephen Fowler</h3>
                  <p className="text-uppercase">Tour Guide</p>
                  <div className="team-one__social">
                    <a href="#">
                      <i className="fab fa-facebook-square"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-one__single">
                <div className="team-one__image">
                  <img src="src/assets/images/team/team-2-6.jpg" alt="" />
                </div>
                <div className="team-one__content">
                  <h3>Flora Larson</h3>
                  <p className="text-uppercase">Tour Guide</p>
                  <div className="team-one__social">
                    <a href="#">
                      <i className="fab fa-facebook-square"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
