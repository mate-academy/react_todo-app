import { useEffect } from 'react';
import { Action, State } from '../context/ReduxContex';

import { useReducer } from 'react';

function useLocalStorageReducer(
  key: string,
  reducer: (state: State, action: Action) => State,
  initialState: State,
): [State, React.Dispatch<Action>] {
  // Get the stored value from localStorage (if it exists)

  const storedValue = localStorage.getItem(key);
  // Parse the stored value as JSON or use the default value

  const initial = storedValue ? JSON.parse(storedValue) : initialState;

  // Define the reducer function
  const [state, dispatch] = useReducer(reducer, initial);

  // Update localStorage when the state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}

export default useLocalStorageReducer;
