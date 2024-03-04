import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ iconClass, name, path }) => {
  return (
    <>
      <li>
        <Link
          to={path}
          className="nav-link align-middle px-0"
        >
          <i className={iconClass}></i> <span className="ms-1 d-none d-sm-inline">{name}</span>
        </Link>
      </li>
    </>
  );
};

export default NavItem;
