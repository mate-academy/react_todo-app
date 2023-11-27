import { useReducer } from 'react';
import { stateReducer } from '../reducers/reducer';
import { State } from '../types/State';

export function useLocalStorage(initialState: State) {
  return useReducer(stateReducer, initialState, () => {
    const currentState = { ...initialState };

    Object.entries(currentState).forEach(([key, value]) => {
      const data = localStorage.getItem(key);

      if (data === null) {
        localStorage.setItem(key, JSON.stringify(value));

        return;
      }

      try {
        Object.assign(currentState, { [key]: JSON.parse(data) });
      } catch (e) {
        localStorage.removeItem(key);
      }
    });

    return currentState;
  });
}
