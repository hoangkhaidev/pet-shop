import { useState, useEffect, useCallback } from 'react';
// import { toast } from "react-toastify";
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import { useNavigate } from 'react-router-dom';
import useRouter from './useRouter';

const ROOT_API_URL = process.env.REACT_APP_ROOT_API_URL;

export default function useFetchData(endpoint, objFilter, dependency = []) {
  const router = useRouter();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authentication.token);

  const [data, setData] = useState({
    dataResponse: [],
    total_size: 0,
    isLoading: true,
    isHasPermission: true,
    total: null,
  });

  const fetchData = useCallback(async () => {
    // console.log('xxxxxxxxxxxxxxxx');
    setData((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const stringified = queryString.stringify(objFilter);

    let url = `${router.location.pathname}?${stringified}`;

    router.navigate(url);

    try {
      const response = await fetch(`${ROOT_API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(objFilter),
      });

      const dataJSON = await response.json();

      if (get(dataJSON, 'success', false)) {
        return setData({
          isLoading: false,
          dataResponse: get(dataJSON, 'data', []),
          total_size: get(dataJSON, 'data.total_size', []),
          isLoaded: false,
          isHasPermission: true,
          total: get(dataJSON, 'data.total', null),
          refetch: false,
        });

      } else {

        if (dataJSON?.err === 'err:internal_error') {
          // console.log(1)
          toast.warn('Internal Server Error. Please try again!');
          return setData({
            isLoading: false,
            dataResponse: null,
            total_size: 0,
            isLoaded: false,
            isHasPermission: false,
            total: 0,
            refetch: false,
          });
        }

        if (dataJSON?.err === 'err:no_permission') {
          // console.log(2)
          toast.warn('No Permission');
          return setData({
            isLoading: false,
            dataResponse: null,
            total_size: 0,
            isLoaded: false,
            isHasPermission: false,
            total: 0,
            refetch: false,
          });
        }

        if (dataJSON?.err === 'err:brand_not_found') {
          // console.log(3)
          toast.warn('Brand not found');
          return setData({
            isLoading: false,
            dataResponse: null,
            total_size: 0,
            isLoaded: false,
            isHasPermission: false,
            total: 0,
            refetch: false,
          });
        }

        if (dataJSON?.err === 'err:operator_not_found') {
          // console.log(4)
          toast.warn('Operator not found');
          return setData({
            isLoading: false,
            dataResponse: null,
            total_size: 0,
            isLoaded: false,
            isHasPermission: false,
            total: 0,
            refetch: false,
          });
        }

        if (dataJSON?.err === 'err:account_not_found') {
          // console.log(5)
          toast.warn('Account not found');
          return setData({
            isLoading: false,
            dataResponse: null,
            total_size: 0,
            isLoaded: false,
            isHasPermission: false,
            total: 0,
            refetch: false,
          });
        }

        if (dataJSON?.err === 'err:invalid_token') {
          navigate("/login");
          toast.warn('Your account has been changed password. Please contact your upline to get new password ');
        }

        setData((prevState) => ({
          ...prevState,
          isLoading: false,
        }));

        return toast.error(dataJSON?.err);
      }
    } catch (e) {
      console.log('e', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objFilter, token, router.navigate, endpoint, ...dependency]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
}
