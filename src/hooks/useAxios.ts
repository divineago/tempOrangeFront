import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders } from "axios";
import { useContext, useEffect, useState } from "react";
import { IAuthResponse } from "@/components/lib/interfaces/IAuth";
import { fString } from "@/components/lib/utils/stringFormat";
import {
  IDTOnPageChange,
  IDTOnSearch
} from "@/components/ui/widgets/table/MyDataTable/MyDataTable";
import { randomUrlParams } from "@/components/lib/utils/randomUrlParams";
import { toast } from "react-toastify";
import {AppCtxt} from "@/components/lib/context/AppContext";

const baseURL = process.env.NEXT_PUBLIC_API;
console.log("NEXT_PUBLIC_API", process.env.NEXT_PUBLIC_API);

export const defaultAxiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

export interface IAxiosConfig {
  axiosInstance?: AxiosInstance;
  method?: "get" | "post" | "patch" | "put" | "delete";
  url: string;
  defautStatus?: 1 | 0;
  defaultHeader?: any;
  defaultQuery?: any;
  auto?: boolean;
  showToast?: boolean;
}

export interface IFetchRequest {
  apiToken?: IAuthResponse;
  urlParms?: string[];
  query?: any;
  status?: 1 | 0;

  headers?: any;
  config?: any;
}

export interface IPostRequest {
  apiToken?: IAuthResponse;
  urlParms?: string[];
  headers?: any;
  data?: any;
}

const useAxios = (input: IAxiosConfig) => {
  const {
    url,
    method = "get",
    defautStatus = 1,
    axiosInstance = defaultAxiosInstance,
    defaultQuery = {},
    auto = false,
    showToast = false,
    defaultHeader = { "Content-Type": "application/json" }
  } = input;

  const [isActive, setIsActive] = useState<1 | 0>(defautStatus);
  const [httpQuery, setHttpQuery] = useState<any>(defaultQuery);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController>();
  const { token } = useContext(AppCtxt);
  const [searchText, setSearchText] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (input: IFetchRequest) => {
    const {
      apiToken = token,
      urlParms = [],
      query = {},
      // status,
      headers = defaultHeader,
      config = {}
    } = input;
    const ctrl = new AbortController();
    const queryParams = query;

    const finalParams = {
      ...httpQuery,
      ...queryParams,
      rand: randomUrlParams()
    };
    // console.log(url, "finalParams", finalParams);
    for (const [key, value] of Object.entries(finalParams)) {
      //  console.log(key, value, typeof value, value === -1);
      if (value === "-1") delete finalParams[key];
    }

    // console.log("after finalParams", finalParams);

    let currentoken = apiToken;
    if (apiToken == null) currentoken = token;

    // console.log("selected status", currentStatus);
    // console.log("selected token", currentoken);

    setController(ctrl);
    setLoading(true);
    let res: any;
    //console.log("=====urlParms", urlParms);
    const endpoint = fString(url, ...urlParms);
    try {
      res = await axiosInstance[method](endpoint, {
        params: finalParams,
        headers: { ...headers, Authorization: `JWT ${currentoken?.access}` },
        signal: ctrl.signal,
        ...config
      });
      // console.log(endpoint, "response", res);
      setResponse(res.data);
    } catch (err: any | AxiosError) {
      console.error(method, err);
      if (axios.isAxiosError(err)) {
        const $error = (err.response?.data.errors || []) as any[];
        let c = 0;
        for (const i in $error) {
          const detail = $error[i].detail;
          if (c == 0)
            toast.error(detail);
          c++;
        }
      } else {
        toast.error("Erreur inattendue");
      }
      setError(err);
    }
    setLoading(false);
    return res;
  };

  const downloadFile = async (res: any) => {
    var blob = new Blob([res.data], { type: res.headers["content-type"] });
    const $url = window.URL.createObjectURL(blob);
    const $contentDisposition = res.headers["content-disposition"];
    console.log("response h", $contentDisposition);
    const link = document.createElement("a");
    link.href = $url;
    const $filename = $contentDisposition.replace("attachment; filename=", "");
    console.log("filename", $filename);
    link.setAttribute("download", $filename); //or any other extension
    document.body.appendChild(link);
    link.click();
  };

  const reloadAfterUpdate = (token: IAuthResponse, $query: any = {}, $urlParams:string[] = []) => {
    //  console.log("defaultQuery reloadAfterUpdate", $query);
    fetchData({ apiToken: token, query: $query, urlParms: $urlParams });
  };

  const getListData = (input: IDTOnPageChange) => {
    const { page, searchTxt = searchText, urlParms = [] } = input;
    if (searchTxt) {
      const query = { page, search: searchTxt, ...httpQuery };
      fetchData({ query, urlParms });
    } else {
      const query2 = { page, ...httpQuery };
      fetchData({ query: query2, urlParms });
    }
  };

  const onPageChange = (input: IDTOnPageChange) => {
    //console.log("on page change", input);
    setCurrentPage(input.page);
    getListData(input);
  };
  const searchData = (input: IDTOnSearch) => {
    const { text: search } = input;
    if (search == null) {
      setSearchText(null);
      getListData({ page: 1, searchTxt: null, ...httpQuery });
    } else {
      setSearchText(search);
      fetchData({ query: { search, ...httpQuery } });
    }
  };

  /* const onStatusChange = (newStatus: any) => {
     setIsActive(newStatus);
     const query = { page: 1, search: null };
     fetchData({ query, status: newStatus });
   };*/

  const postData = async (input: IPostRequest) => {
    const {
      apiToken = token,
      urlParms = [],
      data,
      headers = defaultHeader
    } = input;
    const ctrl = new AbortController();
    setController(ctrl);
    setLoading(true);
    let res: any;
    const endpoint = fString(url, ...urlParms);
    // console.log(endpoint, urlParms);
    try {
      if (method == "delete") {
        res = await axiosInstance[method](endpoint, {
          headers: { ...headers, Authorization: `JWT ${apiToken?.access}` },
          signal: ctrl.signal
        });
      } else {
        res = await axiosInstance[method](endpoint, data, {
          headers: { ...headers, Authorization: `JWT ${apiToken?.access}` },
          signal: ctrl.signal
        });
      }
      if (showToast)
        toast.success(res?.data?.msg ?? "Opération reussie");

      console.log("response", res);
      setResponse(res.data);
    } catch (err: any | AxiosError) {
      console.error(method, err);
      if (axios.isAxiosError(err)) {
        const $error = (err.response?.data.errors || []) as any[];
        for (const i in $error) {
          const detail = $error[i].detail;
          toast.error(detail);
        }
        if ($error.length == 0) toast.error(err.message);
      } else {
        toast.error("Erreur inattendue");
      }
      setError(err);
    }
    setLoading(false);
    return res;
  };

  useEffect(() => {
    return () => controller?.abort();
  }, [controller]);

  useEffect(() => {
    let c;
    if (c || !auto) return;
    fetchData({ query: defaultQuery });
    return () => {
      c = true;
    };
  }, [auto]);

  return {
    response,
    error,
    loading,
    fetchData,
    postData,
    getListData,
    searchData,
    isActive,
    setResponse,
    //onStatusChange,
    onPageChange,
    currentPage,
    reloadAfterUpdate,
    httpQuery,
    setHttpQuery,
    downloadFile
  };
};

export default useAxios;

