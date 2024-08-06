import axios, {AxiosInstance} from "axios";
import {useRouter} from "next/navigation";


export const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_HOST

const useAxiosWithInterceptor = (): AxiosInstance => {
    const instance = axios.create({baseURL: API_BASE_URL})
    // const navigate = useRouter()

    instance.interceptors.response.use(
        (resp) => {
            return resp
        },
        async (error) => {
            const originalRequest = error.config
            if (error.response?.status == 403) {
                window.location.href = '/401';
            }
            return Promise.reject(error)
        })

    return instance
}

export default useAxiosWithInterceptor
