import {useEffect, useState} from 'react';

import {pokeAPI} from '../utils';

export const useAxios = endpoint => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, [endpoint]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await pokeAPI(endpoint);
      setData(res.data);
    } catch (err) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
  };
};
