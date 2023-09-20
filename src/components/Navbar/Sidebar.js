import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import {
  MdOutlineDashboardCustomize,
  MdAssessment,
  MdLogout,
  MdOutlineLibraryBooks,
  MdChatBubbleOutline,
  MdOutlinePersonSearch,
} from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { HiMenuAlt2 } from "react-icons/hi";
import { useState } from "react";
import Logo from '../../assets/Kupalogo.svg'

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <MdOutlineDashboardCustomize />,
    },
    {
      path: "/students",
      name: "Students",
      icon: <PiStudent />,
    },
    {
      path: "/assessments",
      name: "Assessments",
      icon: <MdAssessment />,
    },
    {
      path: "/reportings",
      name: "Reporting",
      icon: <MdOutlineLibraryBooks />,
    },
    {
      path: "/inbox",
      name: "Inbox",
      icon: <MdChatBubbleOutline />,
    },
  ];
  const bottomitem = [
    {
      path: "/profile",
      name: "Moyosore Weke",
      email: "mweke@gmail.com",
      icon: <MdOutlinePersonSearch />,
    },
    {
      path: "/logout",
      name: "Logout",
      icon: <MdLogout />,
    },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
  };

  return (
    <div className="nav__container">
      <div
        style={{
          alignItems: isOpen ? "unset" : "center",
          transition: "max-width 0.3s ease",
        }}
        className="sidebar"
      >
        <div className="top_section">
          <div style={{ display: isOpen ? "block" : "none" }} className="logo">
          <img src={Logo} alt="My Logo" className="kupa-logo" />
          </div>
          <div
            style={{
              marginLeft: isOpen ? "20px" : "0px",
              marginTop: isOpen ? "" : "15px",
              marginRight: isOpen ? "" : "0",
              transition: "margin 0.3s ease",
              color: "#f2f2ff"
            }}
            className="bars"
          >
            <HiMenuAlt2 onClick={toggle} />
          </div>
        </div>
        <div className="mid__section">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <div className="bottom__section">
          <NavLink
            to={bottomitem[0].path}
            className="link"
            activeclassname="active"
          >
            <div>{bottomitem[0].icon}</div>
            <div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="profile__text"
              >
                {bottomitem[0].name}
              </div>{" "}
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="profile__text"
              >
                {bottomitem[0].email}
              </div>
            </div>
          </NavLink>
          <NavLink
            to={bottomitem[1].path}
            className="link"
            activeclassname="active"
            onClick={handleLogout}
          >
            <div className="icon">{bottomitem[1].icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {bottomitem[1].name}
            </div>
          </NavLink>
        </div>
      </div>
      <main style={{ width: "100%", marginLeft: isOpen ? "180px" : "60px" }}>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
