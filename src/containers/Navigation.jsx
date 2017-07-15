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
                to="/rooms"
                activeClassName="active-link"
                activeStyle={{ fontWeight: "bold" }}
              >
                Rooms
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leaderboard"
                activeClassName="active-link"
                activeStyle={{ fontWeight: "bold" }}
              >
                Leaderboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery"
                activeClassName="active-link"
                activeStyle={{ fontWeight: "bold" }}
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/canvas"
                activeClassName="active-link"
                activeStyle={{ fontWeight: "bold" }}
              >
                Canvas Test
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/countdown"
                activeClassName="active-link"
                activeStyle={{ fontWeight: "bold" }}
              >
                Countdown Test
              </NavLink>
            </li>
          </ul>
        </div>

        <div className = "top-bar-right">
          <ul className = "menu">
            <li className = "menu-text">
              <a href = "/api/logout">
                Logout
              </a>
            </li>
          </ul>
        </div>

      </div>
    );
  }

}

export default Navigation;
