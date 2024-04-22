import { useReducer, createContext, useEffect } from 'react';
import { ToDo, ToDoEnum } from '../types/ToDo';

type Action =
  | { type: 'changeStatus'; id: number }
  | { type: 'toggleStatus'; completed: boolean }
  | { type: 'createNew'; newTodo: ToDo }
  | { type: 'changeTitle'; id: number; newTitle: string }
  | { type: 'removeToDo'; id: number }
  | { type: 'removeCompleted' }
  | { type: 'changeFilterValue'; filterType: ToDoEnum }
  | { type: 'setIsEditing' }
  | { type: 'inputFocusTrue' }
  | { type: 'inputFocusFalse' };

interface State {
  todos: ToDo[];
  filterType: ToDoEnum;
  isEditing: boolean;
  inputFocus: boolean;
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
        todos: state.todos.map((item) => (
          { ...item, completed: action.completed }
        )),
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
            ? { ...item, title: action.newTitle }
            : item
        ),
      };

    case 'removeToDo':
      return {
        ...state,
        inputFocus: true,
        todos: state.todos.filter((item) => item.id !== action.id),
      };

    case 'removeCompleted':
      return {
        ...state,
        todos: state.todos.filter((item) => item.completed),
      };

    case 'changeFilterValue':
      return {
        ...state,
        filterType: action.filterType,
      };

    case 'setIsEditing':
      return {
        ...state,
        isEditing: !state.isEditing
      };

    case 'inputFocusTrue':
      return {
        ...state,
        inputFocus: true,
      };

    case 'inputFocusFalse':
      return {
        ...state,
        inputFocus: false,
      };
    default:
      return state;
  }
}

const storedToDo = localStorage.getItem('todos');
const initialTodo = storedToDo ? JSON.parse(storedToDo) : [];

const initialState: State = {
  todos: initialTodo,
  filterType: ToDoEnum.All,
  isEditing: false,
  inputFocus: true,
};

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);

interface Props {
  children: React.ReactNode;
}

export const GlobalTodoProvider: React.FC<Props> = ({ children }) => {
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
