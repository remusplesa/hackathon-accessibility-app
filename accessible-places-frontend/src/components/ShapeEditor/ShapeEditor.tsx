import { useState } from "react";
import { Stage, Layer, Rect, Image } from "react-konva";
import { convertImageToCanvas } from "../../utils/utils";
import { RectangleShape } from "../RectangleShape/RectangleShape";

export function ShapeEditor({ selectedFile }: Props) {
  const image = convertImageToCanvas(selectedFile);
  const rectProps = [
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      stroke: "#83988b",
      strokeWidth: 2,
      id: "rect1",
    },
  ];
  const [selectedId, selectShape] = useState<any>(null);
  const [rectangles, setRectangles] = useState<any>(rectProps);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <>
      {image && (
        <>
          <Stage
            width={Number(image.width)}
            height={Number(image.height)}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          >
            <Layer>
              <Image image={image} />
              {rectangles.map((rect: any, i: number) => (
                <RectangleShape
                  key="positionRect"
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              ))}
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
