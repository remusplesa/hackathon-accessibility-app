import { createContext, useState } from "react";
import { IPrediction, PredictionContextType } from "../../utils/models";

export const PredictionContext = createContext<PredictionContextType | null>(null);

//@ts-ignore
export const PredictionProvider = ({ children }) => {
  const [predictions, setPredictions] = useState<IPrediction[]>([{
    class: 0,
    confidence: 0,
    name: '',
    xmax: 0,
    xmin: 0,
    ymax: 0,
    ymin: 0
  }])

  const savePredictions = (prediction: IPrediction[]) => {
    setPredictions([...prediction])
  }

  return (
    <PredictionContext.Provider value={{ predictions, savePredictions }}>
      {children}
    </PredictionContext.Provider>
  )

}

