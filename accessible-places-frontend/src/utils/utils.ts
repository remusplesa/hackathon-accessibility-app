import React from "react";

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

export const convertImageToCanvas = (url:any) => {
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