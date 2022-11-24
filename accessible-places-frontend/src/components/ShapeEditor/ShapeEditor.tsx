import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Image } from "react-konva";
import { convertBase64, convertImageToCanvas } from "../../utils/utils";

export function ShapeEditor({ selectedFile }: Props) {
  const image = convertImageToCanvas(selectedFile);
  return (
    <>
      {selectedFile && (
        <>
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              <Image image={image} />
              <Rect width={50} height={50} fill="red" />
            </Layer>
          </Stage>
        </>
      )}
    </>
  );
}

type Props = {
  selectedFile: string;
};
