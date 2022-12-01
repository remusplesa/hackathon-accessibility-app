import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import { UploadFormContext } from "../../Context/UploadFormContext/UploadFormContext";
import { IPrediction, IRectangles } from "../../utils/models";
import { convertCoortinatesToCanvas } from "../../utils/utils";
import { RectangleShape } from "../RectangleShape/RectangleShape";



export function ShapeEditor({ selectedFile, predictions, predictionID }: Props) {

  const [selectedId, selectShape] = useState<any>(null);
  const [rectangles, setRectangles] = useState<IRectangles[] | undefined>();
  const [edit, setEdit] = useState(false)

  const { saveData, formData: { boundingBoxes } } = useContext(UploadFormContext)

  const checkDeselect = (e: any) => {

    const clickedOnEmpty = Object.getPrototypeOf(e.target)?.className === 'Image'
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
    if (boundingBoxes && selectedFile) {
      setRectangles(boundingBoxes[predictionID])
    } else if (selectedFile && !boundingBoxes) {
      getRectangles()
    }
  }, [predictions])


  const onSaveRect = () => {

    if (boundingBoxes) {
      let tempArr = boundingBoxes
      tempArr[predictionID] = rectangles
      saveData({ boundingBoxes: tempArr })
    } else {
      const newBox = [rectangles]
      saveData({ boundingBoxes: newBox })
    }

    setEdit(false)
  }


  return (
    <>
      {selectedFile && (
        // @ts-ignore 
        <Stage
          width={Number(selectedFile.width) > 539 ? 539 : Number(selectedFile.width)}
          height={Number(selectedFile.height)}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            <Image image={selectedFile} />
            {rectangles?.map((rect, i) => (
              <RectangleShape
                key={`positionRect_${rect.id}_${i}`}
                shapeProps={rect}
                isSelected={rect.id === selectedId && edit}
                dragable={edit}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={(newAttrs) => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
                }}
                onDelete={() => {
                  const rects = rectangles.filter((_item, key) => key != i)
                  setRectangles(rects)
                }}

              />
            ))}
          </Layer>
        </Stage>
      )}
      <Flex justifyContent={'space-between'}>
        <Button disabled={edit} onClick={() => setEdit(true)}>Edit</Button>
        <Button disabled={!edit} onClick={() => onSaveRect()}>Save</Button>

      </Flex>

    </>
  );
}

type Props = {
  selectedFile: CanvasImageSource;
  predictions: IPrediction[];
  predictionID: number;
};

