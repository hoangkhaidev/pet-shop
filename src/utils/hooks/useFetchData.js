import { useState, useEffect, useCallback } from "react";
// import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import queryString from "query-string";
import { useSelector } from "react-redux";

import { store } from "src/stores";
import get from "lodash/get";

import useRouter from "./useRouter";

const ROOT_API_URL = process.env.REACT_APP_ROOT_API_URL;

export default function useFetchData(endpoint, objFilter) {
  const router = useRouter();
  const token = useSelector(state => state.authentication.token);

  const [data, setData] = useState({
    dataResponse: [],
    total_size: 0,
    isLoading: true,
    isHasPermission: true,
    total: null,
  });

  const { t } = useTranslation();

  const fetchData = useCallback(async () => {
    setData(prevState => ({
      ...prevState,
      isLoading: true
    }));
    const stringified = queryString.stringify(objFilter);
    let url;
    if (stringified) {
      url = `${router.location.pathname}?${stringified}`;
    } else {
      url = `${router.location.pathname}`;
    }
    router.navigate(url);
    try {
      const response = await fetch(`${ROOT_API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(objFilter)
      });
      const dataJSON = await response.json();
      if (get(dataJSON, "success", false)) {
        return setData({
          dataResponse: get(dataJSON, "data", []),
          total_size: get(dataJSON, "data.total_size", []),
          isLoaded: false,
          isHasPermission: true,
          total: get(dataJSON, "data.total", null),
          refetch: false,
        });
      }
      if (dataJSON?.err === "err:no_permission") {
        return setData({
          dataResponse: null,
          total_size: 0,
          isLoading: false,
          isHasPermission: false,
          refetch: false,
        });
      }
      setData(prevState => ({
        ...prevState,
        isLoading: false,
      }));
      return console.log(t(data?.err));
    } catch (e) {
      console.log("e", e);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objFilter, token, router.navigate, endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
}
