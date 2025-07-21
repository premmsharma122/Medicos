import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import profile_pic from "../assets/profile_pic.png";
import menuimg from "../assets/menu_icon.svg";
import crossimg from "../assets/cross_icon.png";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false); // Profile dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu open/close

  // Logout logic
  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const handleLogout = () => {
    logOut(); // Reuse the logOut function
    setShowMenu(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".dropdownMenu") &&
        !e.target.closest('img[alt="profile"]')
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav style={navbarStyle}>
      {/* Left: Profile or Create Account */}
      <div style={leftSectionStyle}>
        {token && userData ? (
          <div style={{ position: "relative" }}>
            {
              /* <img
              src={userData.image || profile_pic}
              alt="profile"
              style={profileImageStyle}
              onClick={() => setShowMenu((prev) => !prev)}
            /> */
              <img
                src={
                  userData?.image && userData.image.trim() !== ""
                    ? userData.image
                    : profile_pic
                }
                alt="profile"
                style={profileImageStyle}
                onClick={() => setShowMenu((prev) => !prev)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = profile_pic;
                }}
              />
            }
            {showMenu && (
              <div className="dropdownMenu">
                <ul style={{ margin: 0, padding: 0 }}>
                  <li
                    className="dropdownItem"
                    onClick={() => {
                      navigate("/my-profile");
                      setShowMenu(false);
                    }}
                  >
                    My Profile
                  </li>
                  <li
                    className="dropdownItem"
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowMenu(false);
                    }}
                  >
                    My Appointments
                  </li>
                  <li className="dropdownItem" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate("/login")} style={buttonStyle}>
            Create Account
          </button>
        )}
      </div>

      {/* Center nav links */}
      <ul className="navList" style={navListStyle}>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? activeLinkStyle : navLinkStyle
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors" // ✅ Corrected route spelling
            style={({ isActive }) =>
              isActive ? activeLinkStyle : navLinkStyle
            }
          >
            ALL DOCTORS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            style={({ isActive }) =>
              isActive ? activeLinkStyle : navLinkStyle
            }
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            style={({ isActive }) =>
              isActive ? activeLinkStyle : navLinkStyle
            }
          >
            CONTACT
          </NavLink>
        </li>
      </ul>

      {/* Mobile menu icon */}
      <div
        className="mobileMenuIcon"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setMobileMenuOpen(true)}
        style={{ width: 30, height: 30 }}
      >
        <img
          src={menuimg}
          alt="menu icon"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Mobile sliding menu */}
      <div className={`mobileMenuOverlay ${mobileMenuOpen ? "open" : ""}`}>
        <div
          className="mobileMenuCloseBtn"
          onClick={() => setMobileMenuOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setMobileMenuOpen(false)}
        >
          <img
            src={crossimg}
            alt="Close menu"
            style={{ width: 24, height: 24 }}
          />
        </div>

        <ul className="mobileMenuList">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={({ isActive }) =>
              isActive ? activeLinkStyle : navLinkStyle
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            onClick={() => setMobileMenuOpen(false)}
            style={({ isActive }) =>
              isActive ? activeLinkStyle : navLinkStyle
            }
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            style={({ isActive }) =>
              isActive ? activeLinkStyle : navLinkStyle
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            style={({ isActive }) =>
              isActive ? activeLinkStyle : navLinkStyle
            }
          >
            CONTACT
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

// Inline styles (mostly for desktop layout)
const navbarStyle = {
  display: "flex",
  alignItems: "center",
  padding: "16px 24px",
  borderBottom: "1px solid gray",
  justifyContent: "space-between",
  position: "relative",
  zIndex: 10,
};

const leftSectionStyle = {
  display: "flex",
  alignItems: "center",
  position: "relative",
  minWidth: "120px",
};

const navListStyle = {
  display: "flex",
  gap: "32px",
  listStyle: "none",
  margin: 0,
  padding: 0,
  justifyContent: "center",
  flex: 1,
};

const navLinkStyle = {
  textDecoration: "none",
  color: "black",
  borderBottom: "2px solid transparent",
  paddingBottom: "4px",
  cursor: "pointer",
};

const activeLinkStyle = {
  ...navLinkStyle,
  borderBottom: "2px solid black",
  fontWeight: "600",
};

const buttonStyle = {
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
};

const profileImageStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  cursor: "pointer",
};

export default Navbar;
