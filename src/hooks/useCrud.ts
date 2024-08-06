import useAxiosWithInterceptor from "@/lib/helpers/jwtInterceptor";
import axios from "axios";
import {Dispatch, SetStateAction, useState} from "react";
import {toast} from "react-toastify";

interface Props<T> {
    data: T
    fetchData: (headers?:any) => Promise<T>
    sendData: (data: any, method?: "post" | "put", headers?:any) => Promise<T>
    error: Error | null
    isLoading: boolean
    setUrlAPI: Dispatch<SetStateAction<string>>
}

const useCrud = <T>(initialData: T, url: string): Props<T> => {
    const [urlAPI, setUrlAPI] = useState<string>(url)
    const jwtAxios = useAxiosWithInterceptor()
    const [data, setData] = useState<T>(initialData);
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const fetchData = async (headers:any={}) => {
        setIsLoading(true)
        try {
            console.log("url", url)
            const response = await jwtAxios.get(url, {headers})
            console.log("fetch response", response)
            setError(null)
            setIsLoading(false)
            setData(response.data)
            return response.data
        } catch (e: any) {
            console.log("Error Fetching data!!!", e)
            if (e.response && [400, 405].indexOf(e.response.status) != -1) {
                setError(new Error(`${e.response.status}`))
            }
            setIsLoading(false)
            // throw e
            return null
        }

    }

    const sendData = async (data: any, method: ('post' | 'put') = 'post',headers:any={}) => {
        setIsLoading(true)
        try {
            console.log("url", urlAPI)
            const response = await jwtAxios[method](urlAPI, data, {headers})
            console.log("fetch response", response)
            setError(null)
            setIsLoading(false)
            return response.data
        } catch (e: any) {
            console.log("Error Fetching data!!!", e)
            if (e.response && [400, 405].indexOf(e.response.status) != -1) {
                setError(new Error(`${e.response.status}`))
            }
            console.log("(axios.isAxiosError(e)", axios.isAxiosError(e))
            if (axios.isAxiosError(e)) {
                const $error = (e.response?.data.errors || []) as any[];
                for (const i in $error) {
                    let detail = $error[i].detail;
                    const attr = $error[i].attr
                    if (attr) detail += `: ${attr}`
                    toast.error(detail);
                }
                if ($error.length == 0) toast.error(e.message);
            } else {
                toast.error("Erreur inattendue");
            }
            setIsLoading(false)
            // throw e
            return null
        }

    }

    return {data, fetchData, sendData, error, isLoading, setUrlAPI}
}

export default useCrud
