export interface IPrediction {
  id: string;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  confidence: number;
  class: number;
  name: string;
}

export interface IUpload extends Place {
  imageRaw: FileList;
  imageBase64: string[];
  imageUrl: string[];
  predictions: IPrediction[][];
  boundingBoxes: IRectangles[][];
}
export type UploadFormContextType = {
  formData: IUpload | null;
  saveData: (formData: Partial<IUpload>) => void;
}
export type PredictionContextType = {
  predictions: IPrediction[][] | null;
  savePredictions: (predictions: IPrediction[][]) => void;
  updatePredictions?: (id: number) => void;
};

export type StepsContextType = {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  setTotalSteps: (steps: number) => void;
}


export interface IRectangles {
  x: number;
  y: number;
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
  id: string;
}

export const RAMP_COLOR = '#48BB78'
export const STAIRS_COLOR = '#C53030'
export const BLOB_BASE_URL = 'https://accessibilityphotos.blob.core.windows.net/photos-container'

export type Place = {
  _id?: string;
  poiName: string;
  isAccessible: boolean;
  createdBy: string;
  photos: {
    id: string;
    url: string;
    detections: IPrediction[];
  }[];
  accesibilityDetails?: {
    parking: boolean;
    elevator: boolean;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
};
