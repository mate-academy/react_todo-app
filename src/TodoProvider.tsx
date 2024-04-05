import { createContext, useEffect, useReducer } from 'react';
import TodoReducer from './Reducer/TodoReducer';
import { Todo } from './type/Todo';
import { TypeContext } from './type/TypeContext';
import { useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const initialState: Todo[] = [];

export const TodoContext = createContext<TypeContext>({
  locationPage: '',
  todos: [],
  dispatch: () => {},
});
export const initializer = (initialValue = initialState) => {
  const data = localStorage.getItem('todos');

  if (data === null) {
    return initialValue;
  }

  return JSON.parse(data);
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);
  const location = useLocation();
  const locationPage = location.hash;

  const todosTools = {
    locationPage,
    todos: state,
    dispatch,
  };

  return (
    <TodoContext.Provider value={todosTools}>{children}</TodoContext.Provider>
  );
};
