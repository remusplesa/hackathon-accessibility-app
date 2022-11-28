import React from "react";
import { Label, Rect, Tag, Transformer, Text } from "react-konva";
import { IRectangles } from "../../utils/models";

export const RectangleShape = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: Props) => {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Label x={shapeProps.x} y={shapeProps.y}>
        <Tag fill={shapeProps.stroke} />
        <Text text={shapeProps.id} />
      </Label>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          const node: any = shapeRef.current;
          if (node) {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
              absolutePosition: node.absolutePosition(),
              width: node.width(),
              height: node.height(),
            });
          }
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node: any = shapeRef.current;
          if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              absolutePosition: node.absolutePosition(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

type Props = {
  shapeProps: IRectangles;
  isSelected: boolean;
  onSelect: (data: any) => void;
  onChange: (data: any) => void;
};
