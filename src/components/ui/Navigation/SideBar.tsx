import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";

interface SideBarProps {
  list: string[];
  active: string;
  changePage: (page: string) => void;
  disabled?: boolean;
  off: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  list,
  active,
  changePage,
  disabled,
  off,
}) => {
  const classes = `SideBar ${disabled ? "close" : "open"}`;

  return (
    <div className={classes}>
      <ul>
        <li className="close-icon" onClick={off}>
          <FontAwesomeIcon icon={faClose} />
        </li>
        {list.map((item) => (
          <li
            key={item}
            className={`SideBarElement ${item === active ? "Active1" : ""}`}
            onClick={() => changePage(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
