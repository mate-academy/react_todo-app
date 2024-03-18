/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  Reducer,
  ReducerAction,
  ReducerState,
  useEffect,
  useReducer,
} from 'react';

function createGetFromLocalStorageFn<T>(key: string) {
  return (value: T): T => {
    const foundState = localStorage.getItem(key);

    if (!foundState) {
      return value;
    }

    try {
      return JSON.parse(foundState);
    } catch {
      return value;
    }
  };
}

export const useLocalStorageReducer = <R extends Reducer<any, any>>(
  key: string,
  reducer: R,
  initialState: ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    createGetFromLocalStorageFn(key),
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
};
