import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface IDebounced {
  searchQuery: string;
  delay: number;
}

export const useDebounced = ({ searchQuery, delay }: IDebounced) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedValue;
};

export const useDebouncedPricing = ({
  minPrice,
  maxPrice,
  delay,
}: {
  minPrice: number;
  maxPrice: number;
  delay: number;
}) => {
  //   const [debouncedValue, setDebouncedValue] = useState({ minPrice, maxPrice }); // not default value -->because it is not set by reactjs
  const [debouncedValue, setDebouncedValue] = useState({});
  useEffect(() => {
    const handler = setTimeout(() => {
      //first time directly set this value not delay
      setDebouncedValue({ minPrice, maxPrice });
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [minPrice, maxPrice, delay]);

  return debouncedValue;
};

export function debounceFunction<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
      func(...args);
    };
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
