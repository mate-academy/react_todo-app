import { useReducer, createContext, useEffect } from 'react';
import { ToDo, ToDoEnum } from '../types/ToDo';
import { todos } from '../data/todo';

type Action =
  | { type: 'changeStatus'; id: number }
  | { type: 'toggleStatus' }
  | { type: 'createNew'; newTodo: ToDo }
  | { type: 'changeTitle'; id: number; newTitle: string }
  | { type: 'removeToDo'; id: number }
  | { type: 'removeCompleted' }
  | { type: 'filterAll'; filterType: ToDoEnum }
  | { type: 'filterActive'; filterType: ToDoEnum }
  | { type: 'filterCompleted'; filterType: ToDoEnum };

interface State {
  todos: ToDo[];
  filterType: ToDoEnum;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'changeStatus':
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.id ? { ...item, completed: !item.completed } : item
        ),
      };
    case 'toggleStatus':
      return {
        ...state,
        todos: state.todos.map((item) => ({ ...item, completed: false })),
      };
    case 'createNew':
      return {
        ...state,
        todos: [...state.todos, action.newTodo],
      };
    case 'changeTitle':
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.id
            ? { ...item, title: action.newTitle.trim() }
            : item
        ),
      };
    case 'removeToDo':
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.id),
      };
    case 'removeCompleted':
      return {
        ...state,
        todos: state.todos.filter((item) => !item.completed),
      };
    case 'filterAll':
      return {
        ...state,
        filterType: action.filterType,
      };
    case 'filterActive':
      return {
        ...state,
        filterType: action.filterType,
      };
    case 'filterCompleted':
      return {
        ...state,
        filterType: action.filterType,
      };
    default:
      return state;
  }
}

const storedToDo = localStorage.getItem('todos');
const initialTodo = storedToDo ? JSON.parse(storedToDo) : todos;

const initialState: State = {
  todos: initialTodo,
  filterType: ToDoEnum.All,
};

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);

interface Props {
  children: React.ReactNode;
}

export const GlobalToDoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const localStorageData = localStorage.getItem('todos');

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);

      parsedData.forEach((storedTodo: ToDo) => {
        dispatch({
          type: 'changeTitle',
          id: storedTodo.id,
          newTitle: storedTodo.title,
        });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
