import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { Link } from "react-router-dom";
import "./ProfilePage.css"

export default function ProfilePage() {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("profile"), url: "/profile" },
  ];
  const title: string = `${t("profile")} - Moroccan Wonders`;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader
        backgroundImageUrl="assets/images/backgrounds/page-header-contact.jpg"
        pageTitle={t("profile")}
        breadcrumbItems={breadcrumbItems}
      />
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            <li>
              <Link to="/visit-us">Visit Us</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </Sidebar>
        <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
      </div>
    </>
  );
}
