import React from 'react';
import { Layer, Stage, Image } from 'react-konva';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GithubPicker } from 'react-color';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasEvent = this.canvasEvent.bind(this);
    this.props.socket.on('canvas_update', data => {
      const idToUpdate = data.canvasId == 1 ? 'drawing2' : 'drawing1';
      const node = document.createElement('p');
      const textNode = document.createTextNode('test');
      node.appendChild(textNode);
      document.getElementById(idToUpdate).appendChild(node);
      this.updateKonva(idToUpdate, data.canvasJSON);
      this.handleChangeComplete = this.handleChangeComplete.bind(this);
      //this.renderDisabledKonva(undefined, data.canvasJSON, data.canvasId);
    });
  }

  handleChangeComplete(color) {
    newColor = color.hex;
  }

  canvasEvent(canvasJSON) {
    this.props.socket.emit('canvas_event', { roomId: this.props.roomId, canvasJSON: canvasJSON, canvasId: this.props.canvasId }, () => {});
  }

  renderSize() {
    return (
      <div className="sizes">
        Brush Size:<br />
        <div id="svgContainer">
          <div id="smallSize">
            <svg id="small" height="100" width="100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="5" fill="#000000" />
            </svg>
          </div>
          <div id="mediumSize">
            <svg id="medium" height="100" width="100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="12" fill="#000000" />
            </svg>
          </div>
          <div id="largeSize">
            <svg id="large" height="100" width="100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="20" fill="#000000" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  renderTools() {
    return (
      <div className="tool">
        Tool:
        <select id="tool">
          <option value="brush">Brush</option>
          <option value="eraser">Eraser</option>
        </select>
        <button className="alert button" id="clear">Clear</button>
      </div>
    );
  }

  renderKonva(container) {
    const that = this;
    const width = 400; // window.innerWidth;
    const height = 400; // window.innerHeight - 25;
    // first we need Konva core things: stage and layer
    const stage = new Konva.Stage({
      container: `drawing${this.props.canvasId}`,
      width: width,
      height: height
    });
    const layer = new Konva.Layer({});
    stage.add(layer);
    // then we are going to draw into special canvas element
    const canvas = document.createElement('canvas');
    canvas.width = stage.width() / 1.5;
    canvas.height = stage.height() / 1.5;
    // created canvas we can add to layer as 'Konva.Image' element
    let image = new Konva.Image({
      image: canvas,
      x: stage.width() / 6,
      y: stage.height() / 6,
      stroke: '#05AFF2',
      shadowBlur: 5,
    });
    layer.add(image);
    stage.draw();
    // Now we need to get access to context element
    const context = canvas.getContext('2d');
    // context.strokeStyle = this.state.background;
    context.lineJoin = 'round';
    context.lineWidth = 5;
    let isPaint = false;
    let lastPointerPosition;
    let mode = 'brush';
    let sizes = 'small';
    // now we need to bind some events
    // we need to start drawing on mousedown
    // and stop drawing on mouseup
    stage.on('contentMousedown.proto', () => {
      isPaint = true;
      lastPointerPosition = stage.getPointerPosition();
    });
    stage.on('contentMouseup.proto', () => {
      isPaint = false;
    });
    // and core function - drawing
    stage.on('contentMousemove.proto', () => {
      if (!isPaint) {
        return;
      }
      if (mode === 'brush') {
        context.globalCompositeOperation = 'source-over';
        if (sizes === 'small') {
          context.lineWidth = 5;
        } else if (sizes === 'medium') {
          context.lineWidth = 12;
        } else if (sizes === 'large') {
          context.lineWidth = 20;
        }
      }
      if (mode === 'eraser') {
        context.lineWidth = 15;
        context.globalCompositeOperation = 'destination-out';
      }
      context.beginPath();
      let localPos = {
        x: lastPointerPosition.x - image.x(),
        y: lastPointerPosition.y - image.y(),
      };
      context.moveTo(localPos.x, localPos.y);
      const pos = stage.getPointerPosition();
      localPos = {
        x: pos.x - image.x(),
        y: pos.y - image.y(),
      };
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();
      lastPointerPosition = pos;
      layer.draw();
      context.strokeStyle = newColor;
      const dataURL = stage.toDataURL();
      // window.open(dataURL);
      that.canvasEvent(dataURL);
      // that.canvasEvent(stage.toJSON());
      // console.log(layer);
    });
    const select = document.getElementById('tool');
    select.addEventListener('change', () => {
      mode = select.value;
    });
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      layer.draw();
    });
    const smallSize = document.getElementById('small');
    smallSize.addEventListener('click', () => {
      sizes = 'small';
    });
    const mediumSize = document.getElementById('medium');
    mediumSize.addEventListener('click', () => {
      sizes = 'medium';
    });
    const largeSize = document.getElementById('large');
    largeSize.addEventListener('click', () => {
      sizes = 'large';
    });
  }

  render() {
    return (
      <div className="container">
        {this.renderSize()}
        {this.renderTools()}<br />
        <div id="picker"><GithubPicker onChangeComplete={this.handleChangeComplete} /></div>
        <div id={'drawing' + this.props.canvasId} ref={ref => this.renderKonva(ref)} />
      </div>
    );
  }
}

let newColor = '#000000';

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer,
  roomId: state.roomReducer.currentUserRoom,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
