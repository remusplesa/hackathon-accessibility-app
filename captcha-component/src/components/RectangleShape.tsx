import React from "react";
import { Label, Rect, Tag, Transformer, Text } from "react-konva";

export const RectangleShape = ({
  shapeProps,
  isSelected,
  dragable = false,
  onSelect,
  onChange,
  onDelete,
}: Props) => {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  const handleKeyDown = (event) => {
    const key = event.key
    if (isSelected) {
      if (key === "Backspace" || key === "Delete") {
        onDelete && onDelete()
      }
    }
  };
  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  })

  return (
    <React.Fragment>
      <Label x={shapeProps.x} y={shapeProps.y}>
        <Tag fill={shapeProps.stroke} />
        <Text text={shapeProps.id} />
      </Label>
      <Rect
        on
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        visible
        {...shapeProps}
        draggable={dragable}
        onDragEnd={(e) => {
          const node: any = shapeRef.current;
          if (node) {
            onChange && onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
              // absolutePosition: node.absolutePosition(),
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
            onChange && onChange({
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

      {isSelected && dragable && (
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
  dragable?: boolean
  onSelect?: (data: any) => void;
  onChange?: (data: any) => void;
  onDelete?: () => void;
};

export interface IRectangles {
  x: number;
  y: number;
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
  id: string;
}