// ProfilePage.tsx
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { Link, Outlet } from "react-router-dom";
import "./ProfilePage.css";
import AvatarCustom from "../../../components/AvatarCustom/AvatarCustom";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { t } = useTranslation();
  const breadcrumbItems = [{ label: t("profile"), url: "/profile" }];
  const title: string = `${t("profile")} - Moroccan Wonders`;
  const [visible, setVisible] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);

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
      <div className="profile-page-container">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <div className="sidebar-header d-flex flex-column align-items-center gap-5">
            <AvatarCustom
              firstName={user?.firstName || "U"}
              lastName={user?.lastName || "U"}
              size="xlarge"
              onClick={() => {}}
            />
            <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
          </div>
          <div className="sidebar-content">
            <ul className="sidebar-menu">
              <li>
                <Link to="details">{t("Profile Details")}</Link>
              </li>
              <li>
                <Link to="settings">{t("Profile Settings")}</Link>
              </li>
              <li>
                <Link to="history">{t("Profile History")}</Link>
              </li>
              <li>
                <Link to="/contact">{t("Contact")}</Link>
              </li>
            </ul>
          </div>
        </Sidebar>
        <Button
          icon="pi pi-arrow-right"
          onClick={() => setVisible(true)}
          className="sidebar-toggle-button"
        />
        <div className="profile-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
