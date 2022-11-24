import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ShapeEditor,
  ImageLayer,
  DrawLayer,
  SelectionLayer,
  wrapShape,
} from 'react-shape-editor';

function arrayReplace(arr, index, item) {
  return [
    ...arr.slice(0, index),
    ...(Array.isArray(item) ? item : [item]),
    ...arr.slice(index + 1),
  ];
}

const RectShape = wrapShape(({ width, height }) => (
  <rect width={width} height={height} fill="rgba(0,0,255,0.5)" />
));

let idIterator = 1;
const Editor = () => {
  const [items, setItems] = useState([
    { id: '1', x: 20, y: 120, width: 145, height: 140 },
    { id: '2', x: 15, y: 0, width: 150, height: 95 },
  ]);

  const [{ vectorHeight, vectorWidth }, setVectorDimensions] = useState({
    vectorHeight: 0,
    vectorWidth: 0,
  });
  const [isSelectionMode, setIsSelectionMode] = useState(true);
  const [selectedShapeIds, setSelectedShapeIds] = useState([]);

  const shapes = items.map((item, index) => {
    const { id, height, width, x, y } = item;
    return (
      <RectShape
        key={id}
        active={selectedShapeIds.indexOf(id) >= 0}
        shapeId={id}
        shapeIndex={index}
        height={height}
        width={width}
        x={x}
        y={y}
        onChange={newRect => {
          setItems(currentItems =>
            arrayReplace(currentItems, index, {
              ...item,
              ...newRect,
            })
          );
        }}
        onDelete={() => {
          setItems(currentItems => arrayReplace(currentItems, index, []));
        }}
      />
    );
  });

  return (
    <div>
      <div>
        <label htmlFor="mode-draw">
          <input
            id="mode-draw"
            type="radio"
            value="draw"
            onChange={event => setIsSelectionMode(false)}
            checked={!isSelectionMode}
          />{' '}
          Draw
        </label>
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="mode-select">
          <input
            id="mode-select"
            type="radio"
            value="select"
            onChange={event => setIsSelectionMode(true)}
            checked={isSelectionMode}
          />{' '}
          Select
        </label>
      </div>

      {isSelectionMode
        ? 'Click and drag to select shapes (or shift-click)'
        : 'Click and drag to draw rects'}
      <ShapeEditor vectorWidth={vectorWidth} vectorHeight={vectorHeight}>
        <ImageLayer
          // Photo by Sarah Gualtieri on Unsplash
          src="https://user-images.githubusercontent.com/4413963/70390894-a1880180-1a12-11ea-9901-e250d0f7bb2b.jpg"
          onLoad={({ naturalWidth, naturalHeight }) => {
            setVectorDimensions({
              vectorWidth: naturalWidth,
              vectorHeight: naturalHeight,
            });
          }}
        />
        {isSelectionMode ? (
          <SelectionLayer
            selectedShapeIds={selectedShapeIds}
            onSelectionChange={ids => setSelectedShapeIds(ids)}
            keyboardTransformMultiplier={5}
            onChange={(newRects, selectedShapesProps) => {
              setItems(prevItems =>
                newRects.reduce((acc, newRect, index) => {
                  const { shapeIndex } = selectedShapesProps[index];
                  const item = acc[shapeIndex];
                  return arrayReplace(acc, shapeIndex, {
                    ...item,
                    ...newRect,
                  });
                }, prevItems)
              );
            }}
            onDelete={(event, selectedShapesProps) => {
              setItems(prevItems =>
                selectedShapesProps
                  .map(p => p.shapeIndex)
                  // Delete the indices in reverse so as not to shift the
                  // other array elements and screw up the array indices
                  .sort((a, b) => b - a)
                  .reduce(
                    (acc, shapeIndex) => arrayReplace(acc, shapeIndex, []),
                    prevItems
                  )
              );
            }}
          >
            {shapes}
          </SelectionLayer>
        ) : (
          <>
            <DrawLayer
              onAddShape={({ x, y, width, height }) => {
                setItems(currentItems => [
                  ...currentItems,
                  { id: `id${idIterator}`, x, y, width, height },
                ]);
                idIterator += 1;
              }}
            />
            {shapes}
          </>
        )}
      </ShapeEditor>
      <br />
      <br />
      <br />
      <a href="https://github.com/fritz-c/react-shape-editor">
        React Shape Editor
      </a>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<Editor />, rootElement);
