import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { IPrediction } from "../../utils/models";

export const usePredict = (file: FileList | null) => {
    const [data, setData] = useState<IPrediction[][] | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const prod_url = import.meta.env.VITE_ML_ENDPOINT
    const base_url = 'http://127.0.0.1:5001'
    const isProd = import.meta.env.PROD
    const url = `${isProd ? prod_url : base_url}/predict`

    const prepareImage = async (file: FileList) => {
        let formData = new FormData();
        const fileArr = Array.from(file)
        fileArr.forEach(f => {
            formData.append(f.name, f);
        })
        return formData
    }

    const fetch = (file: FileList) => {
        prepareImage(file).then(img => {
            axios
                .post(url, img, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                .then((response) => {
                    setData(response.data?.map(item => JSON.parse(item)))
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

    }, []);
    return { data, error, loading };
};