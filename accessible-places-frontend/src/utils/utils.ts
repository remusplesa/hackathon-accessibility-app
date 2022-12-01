import React from "react";
import { IPrediction, IRectangles, RAMP_COLOR, STAIRS_COLOR } from "./models";

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



export const convertCoortinatesToCanvas = (prediction: IPrediction) => {

  return {
    x: prediction.xmin,
    y: prediction.ymin,
    width: prediction.xmax - prediction.xmin,
    height: prediction.ymax - prediction.ymin,
    stroke: prediction.name.startsWith('stairs') ? STAIRS_COLOR : RAMP_COLOR,
    strokeWidth: 2,
    id: `${prediction.name}_${prediction.ymin.toFixed(0)}_${prediction.ymax.toFixed(0)}`,

  }
}

class Resizer {
  static changeHeightWidth(
    height: number,
    maxHeight: number,
    width: number,
    maxWidth: number,
    minWidth?: number,
    minHeight?: number
  ) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
    if (minWidth && width < minWidth) {
      height = Math.round((height * minWidth) / width);
      width = minWidth;
    }
    if (minHeight && height < minHeight) {
      width = Math.round((width * minHeight) / height);
      height = minHeight;
    }
    return { height, width };
  }

  static resizeAndRotateImage(
    image: HTMLImageElement,
    maxWidth: number,
    maxHeight: number,
    minWidth?: number,
    minHeight?: number,
    compressFormat = "jpeg",
    quality = 100,
    rotation = 0
  ) {
    var qualityDecimal = quality / 100;
    var canvas = document.createElement("canvas");

    var width = image.width;
    var height = image.height;

    var newHeightWidth = this.changeHeightWidth(
      height,
      maxHeight,
      width,
      maxWidth,
      minWidth,
      minHeight
    );
    if (rotation && (rotation === 90 || rotation === 270)) {
      canvas.width = newHeightWidth.height;
      canvas.height = newHeightWidth.width;
    } else {
      canvas.width = newHeightWidth.width;
      canvas.height = newHeightWidth.height;
    }

    width = newHeightWidth.width;
    height = newHeightWidth.height;

    var ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, width, height);
      if (ctx.imageSmoothingEnabled && ctx.imageSmoothingQuality) {
        ctx.imageSmoothingQuality = 'high';
      }
      if (rotation) {
        ctx.rotate((rotation * Math.PI) / 180);
        if (rotation === 90) {
          ctx.translate(0, -canvas.width);
        } else if (rotation === 180) {
          ctx.translate(-canvas.width, -canvas.height);
        } else if (rotation === 270) {
          ctx.translate(-canvas.height, 0);
        } else if (rotation === 0 || rotation === 360) {
          ctx.translate(0, 0);
        }
      }
      ctx.drawImage(image, 0, 0, width, height);
    }
    return canvas.toDataURL(`image/${compressFormat}`, qualityDecimal);
  }

  static b64toByteArrays(b64Data: string, contentType: string) {
    contentType = contentType || "image/jpeg";
    var sliceSize = 512;

    var byteCharacters = atob(
      b64Data.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "")
    );
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    return byteArrays;
  }

  static b64toBlob(b64Data: string, contentType: string) {
    const byteArrays = this.b64toByteArrays(b64Data, contentType);
    // @ts-ignore
    var blob = new Blob(byteArrays, { type: contentType, lastModified: new Date() });
    return blob;
  }

  static b64toFile(b64Data: string, fileName: string, contentType: string) {
    const byteArrays = this.b64toByteArrays(b64Data, contentType);
    // @ts-ignore
    const file = new File(byteArrays, fileName, { type: contentType, lastModified: new Date() });
    return file;
  }

  static createResizedImage(
    file: File,
    maxWidth: number,
    maxHeight: number,
    compressFormat: string,
    quality: number,
    rotation: number,
    responseUriFunc: any,
    outputType = "base64",
    minWidth: number | null = null,
    minHeight: number | null = null,
  ) {
    const reader = new FileReader();
    if (file) {
      if (file.type && !file.type.includes("image")) {
        throw Error("File Is NOT Image!");
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          var image = new Image();
          // @ts-ignore
          image.src = reader.result;
          image.onload = function () {
            var resizedDataUrl = Resizer.resizeAndRotateImage(
              image,
              maxWidth,
              maxHeight,
              // @ts-ignore
              minWidth,
              minHeight,
              compressFormat,
              quality,
              rotation
            );
            const contentType = `image/${compressFormat}`;
            switch (outputType) {
              case "blob":
                const blob = Resizer.b64toBlob(resizedDataUrl, contentType);
                responseUriFunc(blob);
                break;
              case "base64":
                responseUriFunc(resizedDataUrl);
                break;
              case "file":
                let fileName = file.name;
                let fileNameWithoutFormat = fileName.toString().replace(/(png|jpeg|jpg|webp)$/i, "");
                let newFileName = fileNameWithoutFormat.concat(compressFormat.toString());
                const newFile = Resizer.b64toFile(resizedDataUrl, newFileName, contentType);
                responseUriFunc(newFile);
                break;
              default:
                responseUriFunc(resizedDataUrl);
            }
          };
        };
        reader.onerror = (error) => {
          // @ts-ignore
          throw Error(error);
        };
      }
    } else {
      throw Error("File Not Found!");
    }
  }
  static imageFileResizer = (
    file: File,
    maxWidth: number,
    maxHeight: number,
    compressFormat: string,
    quality: number,
    rotation: number,
    responseUriFunc: any,
    outputType: string,
    minWidth?: number | null,
    minHeight?: number | null) => {
    return Resizer.createResizedImage(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      responseUriFunc,
      outputType,
      minWidth,
      minHeight,);
  }
}

export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      640,
      640,
      "JPEG",
      100,
      0,
      (uri: any) => {
        resolve(uri);
      },
      "file"
    );
  });

export const uploadToAzure = async (imageUrl: string, imageRaw: File) => {
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(imageRaw);

  fileReader.onloadend = async (event) => {
    const target = event.target;
    if (target?.readyState == fileReader.DONE) {
      var xhr = new XMLHttpRequest();
      var requestData = new Uint8Array(target!.result as any);

      xhr.open("PUT", imageUrl, true);
      xhr.responseType = "blob";
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("X-File-Name", imageRaw.name);
      xhr.setRequestHeader("x-ms-blob-type", "BlockBlob");
      xhr.setRequestHeader(
        "Content-Type",
        imageRaw.type || "application/octet-stream"
      );
      xhr.setRequestHeader(
        "x-ms-blob-content-type",
        imageRaw.type || "application/octet-stream"
      );
      xhr.setRequestHeader("x-ms-version", "2016-05-31");

      xhr.send(requestData);
    }
  };
};
