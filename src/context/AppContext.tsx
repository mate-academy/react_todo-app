import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
  useMemo,
} from 'react';
import { Action } from '../types/Action';
import { State } from '../types/State';
import { Filter } from '../types/Filter';
import { AppContextType, initialAppContext } from '../types/AppContext';

const initialState: State = {
  todos: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo = {
        id: +new Date(),
        title: action.payload.trim(),
        completed: false,
      };
      const newTodos = [...state.todos, newTodo];

      localStorage.setItem('todos', JSON.stringify(newTodos));

      return {
        ...state,
        todos: newTodos,
      };
    case 'CHANGE_TODO_STATUS':
      const updatedTodos = state.todos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return {
        ...state,
        todos: updatedTodos,
      };
    case 'DELETE_TODO':
      const filteredTodos = state.todos.filter(
        todo => todo.id !== action.payload,
      );

      localStorage.setItem('todos', JSON.stringify(filteredTodos));

      return {
        ...state,
        todos: filteredTodos,
      };
    case 'LOAD_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case 'UPDATE_TODO_TITLE':
      const updTitleTodos = state.todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );

      localStorage.setItem('todos', JSON.stringify(updTitleTodos));

      return {
        ...state,
        todos: updTitleTodos,
      };
    case 'CLEAR_COMPLETED_TODOS':
      const withoutCompleted = state.todos.filter(todo => !todo.completed);

      localStorage.setItem('todos', JSON.stringify(withoutCompleted));

      return {
        ...state,
        todos: withoutCompleted,
      };
    case 'CHANGE_ALL_TODOS_STATUS':
      const allCompleted = state.todos.every(todo => todo.completed);
      const todosUpdStatus = state.todos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));

      localStorage.setItem('todos', JSON.stringify(todosUpdStatus));

      return {
        ...state,
        todos: todosUpdStatus,
      };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType>(initialAppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      dispatch({ type: 'LOAD_TODOS', payload: JSON.parse(storedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const filteredTodos = useMemo(() => {
    return state.todos.filter(todo => {
      if (filter === 'completed') {
        return todo.completed;
      } else if (filter === 'uncompleted') {
        return !todo.completed;
      }

      return true;
    });
  }, [state.todos, filter]);

  const globalList = state.todos;

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        filter,
        setFilter,
        filteredTodos,
        globalList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
