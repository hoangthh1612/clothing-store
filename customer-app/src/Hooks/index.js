import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export function useQuery() {
  const { search } = useLocation();
  //console.log(search);
  return useMemo(() => queryString.parse(search), [search]);
}
