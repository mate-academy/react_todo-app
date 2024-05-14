import { createContext, useEffect, useReducer } from 'react';
import ToDoReducer from '../components/ToDoReducer/ToDoReducer';
import { ToDo } from '../types/ToDo';
import { TypeContext } from '../types/TypeContext';
import { useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const initialState: ToDo[] = [];

export const ToDoContext = createContext<TypeContext>({
  locationPage: '',
  todos: [],
  dispatch: () => {},
});

export const ToDoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(ToDoReducer, initialState, () => {
    const data = localStorage.getItem('todos');

    return data ? JSON.parse(data) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  const location = useLocation();
  const locationPage = location.hash;

  const toDosTools = {
    locationPage,
    toDos: state,
    dispatch,
  };

  return (
    <ToDoContext.Provider value={toDosTools}>{children}</ToDoContext.Provider>
  );
};
