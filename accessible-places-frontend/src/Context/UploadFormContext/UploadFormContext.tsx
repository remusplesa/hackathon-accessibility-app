import { createContext, useState } from "react";
import { IUpload, UploadFormContextType } from "../../utils/models";

export const UploadFormContext = createContext<UploadFormContextType | null>(null);

//@ts-ignore
export const UploadFormProvider = ({ children }) => {
    const [formData, setFormData] = useState<IUpload | null>(null)

    const saveData = (formData: Partial<IUpload>) => {
        setFormData((prev) => ({ ...prev, ...formData }))
    }

    return (
        <UploadFormContext.Provider value={{ formData, saveData }}>
            {children}
        </UploadFormContext.Provider>
    )

}

