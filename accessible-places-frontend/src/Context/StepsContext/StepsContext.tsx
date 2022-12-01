import { createContext, useState } from "react";
import { StepsContextType } from "../../utils/models";

export const StepsContext = createContext<StepsContextType | null>(null);

//@ts-ignore
export const StepsProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [totalSteps, setTotalSteps] = useState(0)


    return (
        <StepsContext.Provider value={{ currentStep, setCurrentStep, totalSteps, setTotalSteps }}>
            {children}
        </StepsContext.Provider>
    )

}

