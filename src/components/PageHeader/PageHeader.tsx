import React from "react";
import { PageHeaderProps } from "../../types/PageHeaderProps";
import "./PageHeader.css";

const PageHeader: React.FC<PageHeaderProps> = ({
  pageTitle,
  breadcrumbItems,
}) => {
  return (
    <section className="page-header">
      <div className="container">
        <h2>{pageTitle}</h2>
        <ul className="thm-breadcrumb list-unstyled">
          {breadcrumbItems.map((item, index) => (
            <li key={index}>
              {item.url ? (
                <a href={item.url}>{item.label}</a>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PageHeader;
