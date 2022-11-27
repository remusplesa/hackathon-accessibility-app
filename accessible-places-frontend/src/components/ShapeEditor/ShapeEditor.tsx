import { useContext, useEffect, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import { PredictionContext } from "../../Context/PredictionContext/PredictionContext";
import { IRectangles, PredictionContextType } from "../../utils/models";
import { convertCoortinatesToCanvas } from "../../utils/utils";
import { RectangleShape } from "../RectangleShape/RectangleShape";



export function ShapeEditor({ selectedFile }: Props) {
  const { predictions } = useContext(PredictionContext) as PredictionContextType

  const [selectedId, selectShape] = useState<any>(null);
  const [rectangles, setRectangles] = useState<IRectangles[] | undefined>();

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const getRectangles = () => {
    const rect = predictions?.map(prediction => {
      return convertCoortinatesToCanvas(prediction)
    })
    setRectangles(rect)
  }

  useEffect(() => {
    selectedFile && getRectangles()
  }, [predictions])



  return (
    <>
      {selectedFile && (

        <Stage
          width={Number(selectedFile.width) > 539 ? 539 : Number(selectedFile.width)}
          height={Number(selectedFile.height)}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            <Image image={selectedFile} />
            {rectangles?.map((rect, i: number) => (
              <RectangleShape
                key={`positionRect_${rect.id}_${i}`}
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

      )}
    </>
  );
}

type Props = {
  selectedFile: CanvasImageSource;
};
