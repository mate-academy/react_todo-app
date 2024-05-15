import React, { useEffect, useReducer } from 'react';
import { Todo } from '../Types/Todo';
import { SortingTodos } from '../enums/Sortings';

type Action =
  | { type: 'updateTodoStatus'; payload: { id: number; newStatus: boolean } }
  | { type: 'deleteTodo'; payload: { id: number } }
  | { type: 'updateTodoTitle'; payload: { updatedTodo: Todo } }
  | { type: 'addTodo'; payload: { title: string; status: boolean } }
  | { type: 'clearCompleted' }
  | { type: 'activeTab'; payload: { tab: SortingTodos } }
  | { type: 'initializeTodosFromStorage'; payload: { todo: Todo[] } }
  | { type: 'toggleAll'; payload: { todo: Todo[] } };

type Props = {
  children: React.ReactNode;
};

interface State {
  todo: Todo[];
  tab: SortingTodos;
}

const initialState: State = {
  todo: [],
  tab: SortingTodos.all,
};

const updatedTodoStatus = (
  state: State,
  id: number,
  newStatus: boolean,
): State => ({
  ...state,
  todo: state.todo.map(todo =>
    todo.id === id ? { ...todo, status: newStatus } : todo,
  ),
});

const updateTodoTitle = (state: State, updatedTodo: Todo): State => ({
  ...state,
  todo: state.todo.map(todo =>
    todo.id === updatedTodo.id ? updatedTodo : todo,
  ),
});

const deleteTodoItem = (state: State, id: number): State => ({
  ...state,
  todo: state.todo.filter(todo => todo.id !== id),
});

const ClearCompleted = (state: State) => ({
  ...state,
  todo: state.todo.filter(todo => todo.status !== true),
});

const addTodo = (state: State, title: string, status: boolean): State => {
  const newTodo = {
    id: +new Date(),
    title,
    status,
  };

  return {
    ...state,
    todo: [newTodo, ...state.todo],
  };
};

const activeTab = (state: State, tab: SortingTodos): State => {
  return {
    ...state,
    tab: tab,
  };
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'updateTodoStatus':
      return updatedTodoStatus(
        state,
        action.payload.id,
        action.payload.newStatus,
      );

    case 'addTodo':
      return addTodo(state, action.payload.title, action.payload.status);
    case 'updateTodoTitle':
      return updateTodoTitle(state, action.payload.updatedTodo);
    case 'deleteTodo':
      return deleteTodoItem(state, action.payload.id);
    case 'clearCompleted':
      return ClearCompleted(state);
    case 'activeTab':
      return activeTab(state, action.payload.tab);

    case 'initializeTodosFromStorage':
      return {
        ...state,
        todo: action.payload.todo,
      };
    case 'toggleAll':
      const areAllCompleted = state.todo.every(t => t.status);

      return {
        ...state,
        todo: state.todo.map(todo => ({ ...todo, status: !areAllCompleted })),
      };

    default:
      return state;
  }
}

export const TodoContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Effect for initializing from local storage

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      dispatch({
        type: 'initializeTodosFromStorage',
        payload: { todo: JSON.parse(storedTodos) },
      });
    }
  }, [dispatch]);

  // Effect for storing to local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todo));
  }, [state.todo]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodoContext.Provider value={state}>{children}</TodoContext.Provider>
    </DispatchContext.Provider>
  );
};
