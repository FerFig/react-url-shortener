import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Add", url: "/" },
    { name: "Search", url: "/SearchUrl" },
    { name: "List URL", url: "/UrlList" },
    { name: "About", url: "/About" },
    { name: "List (Material Table)", url: "/MaterialUiUrlList" }
  ];

  let linksComponents = links.map((link, index) => {
    return (
      <li key={index} className="nav">
        <NavLink
          className={"navLink"}
          activeClassName={"activeNavLink"}
          to={link.url}
          exact
        >
          {link.name}
        </NavLink>
      </li>
    );
  });

  return (
    <div className={"leftNavContainer"}>
      <ul>{linksComponents}</ul>
    </div>
  );
};

export default Sidebar;
