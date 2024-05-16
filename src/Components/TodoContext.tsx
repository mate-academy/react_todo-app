import React, { useEffect, useReducer } from 'react';
import { Todo } from '../Types/Todo';
import { SortingTodos } from '../enums/Sortings';

type Action =
  | { type: 'updateTodoStatus'; payload: { id: number; newStatus: boolean } }
  | { type: 'deleteTodo'; payload: { id: number } }
  | { type: 'updateTodoTitle'; payload: { updatedTodo: Todo } }
  | { type: 'addTodo'; payload: { title: string; completed: boolean } }
  | { type: 'clearCompleted' }
  | { type: 'activeTab'; payload: { tab: SortingTodos } }
  | { type: 'initializeTodosFromStorage'; payload: { todos: Todo[] } }
  | { type: 'toggleAll'; payload: { todo: Todo[] } };

type Props = {
  children: React.ReactNode;
};

interface State {
  todos: Todo[];
  tab: SortingTodos;
}

const initialState: State = {
  todos: [],
  tab: SortingTodos.all,
};

const updatedTodoStatus = (
  state: State,
  id: number,
  newStatus: boolean,
): State => ({
  ...state,
  todos: state.todos.map(todo =>
    todo.id === id ? { ...todo, completed: newStatus } : todo,
  ),
});

const updateTodoTitle = (state: State, updatedTodo: Todo): State => {
  const newState = {
    ...state,
    todos: state.todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo,
    ),
  };

  return newState;
};

const deleteTodoItem = (state: State, id: number): State => ({
  ...state,
  todos: state.todos.filter(todo => todo.id !== id),
});

const clearCompleted = (state: State) => ({
  ...state,
  todos: state.todos.filter(todo => !todo.completed),
});

const addTodo = (state: State, title: string, completed: boolean): State => {
  const newTodo = {
    id: +new Date(),
    title,
    completed,
  };

  return {
    ...state,
    todos: [newTodo, ...state.todos],
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
      return addTodo(state, action.payload.title, action.payload.completed);
    case 'updateTodoTitle':
      return updateTodoTitle(state, action.payload.updatedTodo);
    case 'deleteTodo':
      return deleteTodoItem(state, action.payload.id);
    case 'clearCompleted':
      return clearCompleted(state);
    case 'activeTab':
      return activeTab(state, action.payload.tab);

    case 'initializeTodosFromStorage':
      return {
        ...state,
        todos: action.payload.todos,
      };

    case 'toggleAll':
      const areAllCompleted = state.todos.every(t => t.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !areAllCompleted,
        })),
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

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      dispatch({
        type: 'initializeTodosFromStorage',
        payload: { todos: JSON.parse(storedTodos) },
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodoContext.Provider value={state}>{children}</TodoContext.Provider>
    </DispatchContext.Provider>
  );
};
