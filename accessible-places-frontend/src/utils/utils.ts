import React from "react";
import { IPrediction, RAMP_COLOR, STAIRS_COLOR } from "./models";
import Resizer from "react-image-file-resizer";

export const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const convertImageToCanvas = (url: any) => {
  const imageRef = React.useRef<HTMLImageElement | undefined>();
  const [_, setStateToken] = React.useState(0);

  React.useLayoutEffect(
    function () {
      if (!url) return;
      var img = document.createElement('img');

      function onload() {
        imageRef.current = img;
        setStateToken(Math.random());
      }

      function onerror() {
        imageRef.current = undefined;
        setStateToken(Math.random());
      }

      img.addEventListener('load', onload);
      img.addEventListener('error', onerror);
      img.src = url;

      return function cleanup() {
        img.removeEventListener('load', onload);
        img.removeEventListener('error', onerror);
      };
    },
    [url]
  );

  return imageRef.current as CanvasImageSource;
};


export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      640,
      640,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
export const convertCoortinatesToCanvas = (prediction: IPrediction) => {

  return {
    x: prediction.xmin,
    y: prediction.ymin,
    width: prediction.xmax - prediction.xmin,
    height: prediction.ymax - prediction.ymin,
    stroke: prediction.name.startsWith('stairs') ? STAIRS_COLOR : RAMP_COLOR,
    strokeWidth: 2,
    id: `${prediction.name}_${prediction.ymin.toFixed(0)}`,

  }
}