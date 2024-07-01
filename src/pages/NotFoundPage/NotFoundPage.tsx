import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useScrollToTop from "../../helpers/scrollToTop";

export default function NotFoundPage() {
    const { t } = useTranslation();
    const title: string = `${t("notFound")} - Moroccan Wonders`;
    const { scrollToTop } = useScrollToTop();


  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="page-wrapper">
        <div className="error-page text-center">
          <div className="error-page__bg"></div>
          <div className="container">
            <Link onClick={scrollToTop} to="/" className="error-page__logo">
              <img src="src/assets/images/logo-light.png" width="240" alt="" />
            </Link>
            <div className="error-page__title">
              <h2>404</h2>
              <p>{t('error')}</p>
            </div>
            <div className="error-page__text">
              <p>{t('notFoundDesc')}</p>
            </div>
            <Link onClick={scrollToTop} to="/" className="thm-btn">
            {t('backToHome')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
