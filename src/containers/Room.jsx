import React from "react";
import Navigation from "./Navigation";
import Canvas from "./Canvas";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getRooms} from "./../actions/actions";
const io = require("socket.io-client");
const socket = io();

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.emitOnUnload = this.emitOnUnload.bind(this);
    socket.on('user_join', (payload) => {
      console.log(payload.displayName + ' joined')
    });
  }

  handleUserLeavingPage(ev) {
    ev.preventDefault();
    return ev.returnValue = 'Are you sure you want to close?';
  }

  emitOnUnload(ev){

    ev.preventDefault();

    socket.emit(
      "leave_room",
      { roomId: this.props.roomId, user: this.props.user },
      function(data) {}
    );


  }

  componentWillMount() {
    socket.emit("join_room", { roomId: this.props.roomId, user: this.props.user }, function(
      data
    ) {console.log("Data",data)});
  //  this.props.getRooms();
    //if (!this.props.isAuthenticated) {
  //    this.props.sendAuthorizationCheck();
  //  }
  }

  componentDidMount() {
    window.addEventListener("unload",this.emitOnUnload)

    window.addEventListener("beforeunload",this.handleUserLeavingPage)
  }

  componentWillUnmount() {
    alert('you sure?')
    socket.emit(
      "leave_room",
      { roomId: this.props.roomId, user: this.props.user },
      function(data) {}
    );
    window.removeEventListener("beforeunload",this.handleUserLeavingPage);
  }

  // handleRoomSelection(id) {
  //   // emit to backend if user joins a room
  //   socket.emit("join", { roomId: id, user: this.props.user }, function(
  //     data
  //   ) {});
  //   //dispatch actions to add user to room and redirect to selected room
  //   this.props.addUserToRoom(id, this.props.user);
  //   this.props.changePage(`room${id}`);
  // }

  render() {
    return (
      <div>
        <Navigation />
        <h1 className="page-title">Room{this.props.roomId}</h1>
        <div className="row">
          <div className="columns small-centered small-12 medium-10 large-8">

            <h1>Timer Placeholder</h1>
            <div className = 'canvas-container'>


              <Canvas />
              <Canvas />
            </div>
            <h1>Chat Placeholder</h1>
        </div>
      </div>


      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer,
  roomId: state.roomReducer.currentUserRoom

});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getRooms,
      changePage: room => push(room)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Room);
