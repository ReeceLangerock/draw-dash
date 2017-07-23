import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    //this.renderLoginOrLogout = this.renderLoginOrLogout.bind(this);
  }

  render() {
    var renderLoginOrLogout = () => {
      if (this.props.isAuthenticated) {
        return (
          <a href="/api/logout">
            Logout
          </a>
        );
      } else if (this.props.isGuest) {
        return (
          <a href="/api/authenticate">
            Login
          </a>
        );
      }
    };

    return (
      <div className="top-bar naver">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text nav-item"><i>Draw Dash</i></li>
            <li className="nav-item">
              <NavLink to="/lobby" activeClassName="active-link" activeStyle={{ fontWeight: "bold" }}>
                Rooms
              </NavLink>
            </li>
            <li  className="nav-item">
              <NavLink to="/leaderboard" activeClassName="active-link" activeStyle={{ fontWeight: "bold" }}>
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/gallery" activeClassName="active-link" activeStyle={{ fontWeight: "bold" }}>
                Gallery
              </NavLink>
            </li>


          </ul>
        </div>

        <div className="top-bar-right">
          <ul className="menu">
            <li className="nav-item">
              {renderLoginOrLogout()}
            </li>
          </ul>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isGuest: state.authReducer.isGuest
});

export default connect(mapStateToProps, null)(Navigation);
