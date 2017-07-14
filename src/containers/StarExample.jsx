import React, { Component } from "react";
import Navigation from './Navigation';
import {Layer, Rect, Stage, Group, Star} from 'react-konva';

class Canvas extends React.Component {
  constructor(...args) {
      super(...args);
      this.state = {
        color: 'green'
      };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState({
        color: Konva.Util.getRandomColor()
      });
    }

    render () {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return (


        <div className="container">
          <Navigation />
          <h2>Canvas Component</h2>
          <div>
            <Stage width={width} height={height}>
        <Layer>
          {[...Array(10).keys()].map(() => {

            const scale = Math.random() * 3;

            return <Star
              x={Math.random() * width}
              y={Math.random() * height}
              numPoints={5}
              innerRadius={30}
              outerRadius={50}
              fill='#764abc'
              opacity={0.8}
              draggable={true}
              scale={{
                x : scale,
                y : scale
              }}
              rotation={Math.random() * 180}
              shadowColor='black'
              shadowBlur={10}
              shadowOffset={{
                x : 5,
                y : 5
              }}
              shadowOpacity={0.6}
              // custom attribute
              startScale={scale}
            />
        })}
        </Layer>
      </Stage>
          </div>
        </div>
      );
    }
}

export default Canvas;
