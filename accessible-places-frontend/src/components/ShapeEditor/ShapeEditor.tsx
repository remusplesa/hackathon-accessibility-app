import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Stage, Layer, Rect } from "react-konva";

export function ShapeEditor() {
  console.log("--- ooo daaa");
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect width={50} height={50} fill="red" />
      </Layer>
    </Stage>
  );
}
