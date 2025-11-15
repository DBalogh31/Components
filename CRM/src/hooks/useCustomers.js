import { useCallback, useState } from "react";
import axios from "axios";

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchCustomers = useCallback(
    async (force = false) => {
      try {
        if (hasFetched && !force) {
          return customers || [];
        }
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:4000/customers");
        setCustomers(response.data);
        setHasFetched(true);
        return response.data;
      } catch (err) {
        setError(err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [customers, hasFetched]
  );

  return { customers, fetchCustomers, loading, error };
}
