/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
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

        console.log(dataJSON?.err?.count);
        if (dataJSON?.err === 'err:no_permission') {
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

        if (dataJSON?.err === 'err:player_business_summary_args_limit') {
          toast.warn('Please enter Player ID or Nickname to search by date range');
          return setData({
            isLoading: false,
            dataResponse: null,
            total_size: 0,
            isLoaded: false,
            isHasPermission: true,
            total: 0,
            refetch: false,
          });
        }

        if (dataJSON?.err === 'err:player_not_found') {
          toast.warn('Player not found');
          return setData({
            isLoading: false,
            dataResponse: null,
            total_size: 0,
            isLoaded: false,
            isHasPermission: true,
            total: 0,
            refetch: false,
          });
        }

        if (dataJSON?.err === 'err:invalid_token') {
          navigate("/login");
          return setData({
            isLoading: false,
            dataResponse: null,
            total_size: 0,
            isLoaded: false,
            isHasPermission: true,
            total: 0,
            refetch: false,
          });
        }

        if (dataJSON?.err === 'err:inactive_account') {
          navigate("/login");
          return setData({
            isLoading: false,
            dataResponse: null,
            total_size: 0,
            isLoaded: false,
            isHasPermission: true,
            total: 0,
            refetch: false,
          });
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
  }, [objFilter, token, router.navigate, endpoint, ...dependency]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
}
