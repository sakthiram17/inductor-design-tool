import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type NavbarProps = {
  off: () => void;
  setSmall: (val: boolean) => void;
  first: string;
  last: string;
  list: string[];
  active: string;
  changePage: (e: React.MouseEvent<HTMLLIElement>) => void;
  expand: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  off,
  setSmall,
  first,
  last,
  list,
  active,
  changePage,
  expand,
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        off();
        setSmall(false);
      } else {
        setSmall(true);
      }
    };

    window.addEventListener("resize", handleResize);
    // Run once initially in case of any layout adjustments
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [off, setSmall]);

  const isSmall = width < 768;

  const navList = !isSmall
    ? list.map((item, i) => (
        <li
          key={i}
          className={`NavbarElement ${item === active ? "Active" : ""}`}
          onClick={changePage}
        >
          {item}
        </li>
      ))
    : null;

  const menuButton = isSmall ? (
    <button className="menu-button" key="menu-btn" onClick={expand}>
      <FontAwesomeIcon icon={faBars} style={{ color: "white" }} />
    </button>
  ) : null;

  return (
    <div className="NavBar">
      <div className="btn-grp">{menuButton}</div>

      <div className={isSmall ? "small_nav-header" : "navbar-header"}>
        <span className="header-f">{first}</span>
        <span className="header-l">{last}</span>
      </div>

      {!isSmall && <ul>{navList}</ul>}
    </div>
  );
};

export default Navbar;
