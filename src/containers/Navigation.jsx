import React from 'react';
import { Link, NavLink } from "react-router-dom";

class Navigation extends React.Component {
  render () {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Draw Dash</li>
            <li>
              <NavLink
                to="/"
                activeClassName="active-link"
                activeStyle={{ fontWeight: "bold" }}
              >
                Rooms
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/test"
                activeClassName="active-link"
                activeStyle={{ fontWeight: "bold" }}
              >
                Leaderboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/test"
                activeClassName="active-link"
                activeStyle={{ fontWeight: "bold" }}
              >
                Image Gallery
              </NavLink>
            </li>
          </ul>
        </div>

        <div className = "top-bar-right">
          <ul className = "menu">
            <li>
              <NavLink
                to="/about"
                activeClassName="active-link"
                activeStyle={{ fontWeight: "bold" }}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>

      </div>
    );
  }

}

export default Navigation;
