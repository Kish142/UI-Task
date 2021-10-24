import { useState, useCallback } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = 'GET', data = null, headers = {}) => {
      setIsLoading(true);

      try {
        const response = await axios({
          url,
          method,
          data,
          headers,
        //   withCredentials: true,
        });

        response && console.log(response);

        if (!response.ok) {
          setError(response);
        }

        setIsLoading(false);

        return response.data;
      } catch (err) {
        setError(err.response);
        setIsLoading(false);
        console.log(err.response);
      }
    },
    []
  );

  return { isLoading, error, sendRequest, setError };
};
