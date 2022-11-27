import axios from "axios";
import { useEffect, useState } from "react";
import { IPrediction } from "../../utils/models";
import { resizeFile } from "../../utils/utils";

export const usePredict = (file: File | null) => {
    const [data, setData] = useState<IPrediction[] | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // const base_url = import.meta.env.VITE_ML_ENDPOINT
    const base_url = 'http://127.0.0.1:5001'
    const url = `${base_url}/predict`

    const prepareImage = async (file: File) => {
        let formData = new FormData();
        try {
            const resizedImage = await resizeFile(file)
            // @ts-ignore
            formData.append("image", resizedImage);

        } catch (err) {
            console.error(err)
        }
        return formData
    }

    const fetch = (file: File) => {
        prepareImage(file).then(img => {
            axios
                .post(url, img, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                .then((response) => {
                    setData(JSON.parse(response.data))
                    setLoading(false)

                })
                .catch((error) => setError(error.message))
                .finally(() => setLoading(false));
        })


    }
    useEffect(() => {

        if (file) {
            setLoading(true)
            fetch(file);
        }

    }, [file]);

    return { data, error, loading };
};