export interface IPrediction {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    confidence: number;
    class: number;
    name: string;
}
export type PredictionContextType = {
    predictions: IPrediction[] | null;
    savePredictions: (predictions: IPrediction[]) => void;
    updatePredictions?: (id: number) => void;
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

export const RAMP_COLOR = '#48BB78'
export const STAIRS_COLOR = '#C53030'