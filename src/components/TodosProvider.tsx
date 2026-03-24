/* eslint-disable @typescript-eslint/indent */
import { createContext, useEffect, useReducer, useState } from 'react';
import {
  addTodoToStorage,
  deleteTodoFromStorage,
  getTodosFromStorage,
  setTodosInStorage,
  updateTodoInStorage,
} from '../api/todos';

export type TodoFilterStatus = 'All' | 'Completed' | 'Active';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodosContextType = {
  todos: Todo[];
  todoFilterStatus: TodoFilterStatus;
  setTodoFilterStatus: React.Dispatch<React.SetStateAction<TodoFilterStatus>>;
  submitTodo: (todo: Todo) => Promise<void>;
  updateTodo: (
    todoId: number,
    payload: Partial<Omit<Todo, 'id'>>,
  ) => Promise<void>;
  deleteTodo: (todoId: number) => Promise<void>;
  setTodos: (todos: Todo[]) => Promise<void>;
};

export type Action =
  | { type: 'add_todo'; payload: Todo }
  | {
      type: 'update_todo';
      todoId: Todo['id'];
      payload: Partial<Omit<Todo, 'id'>>;
    }
  | { type: 'delete_todo'; todoId: Todo['id'] }
  | { type: 'set_todos'; payload: Todo[] }
  | { type: 'toggle_todo'; todoId: Todo['id'] };

type Props = {
  children: React.ReactNode;
};

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'set_todos':
      return action.payload;
    case 'add_todo':
      return [...state, action.payload];
    case 'update_todo':
      return state.map(todo => {
        if (todo.id === action.todoId) {
          return { ...todo, ...action.payload };
        }

        return todo;
      });
    case 'delete_todo':
      return state.filter(todo => todo.id !== action.todoId);
    default:
      return state;
  }
}

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  todoFilterStatus: 'All',
  setTodoFilterStatus: () => {},
  deleteTodo: () => new Promise(() => {}),
  submitTodo: () => new Promise(() => {}),
  updateTodo: () => new Promise(() => {}),
  setTodos: () => new Promise(() => {}),
});

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  const [todoFilterStatus, setTodoFilterStatus] =
    useState<TodoFilterStatus>('All');

  async function deleteTodo(todoId: Todo['id']) {
    deleteTodoFromStorage(todoId);

    dispatch({ type: 'delete_todo', todoId });
  }

  async function submitTodo(todo: Todo) {
    addTodoToStorage(todo);

    dispatch({ type: 'add_todo', payload: todo });
  }

  async function updateTodo(
    todoId: Todo['id'],
    payload: Partial<Omit<Todo, 'id'>>,
  ) {
    updateTodoInStorage(todoId, payload);

    dispatch({ type: 'update_todo', todoId, payload });
  }

  async function setTodos(todos: Todo[]) {
    setTodosInStorage(todos);

    dispatch({ type: 'set_todos', payload: todos });
  }

  useEffect(() => {
    const todos = getTodosFromStorage();

    dispatch({ type: 'set_todos', payload: todos });
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos: state,
        todoFilterStatus,
        setTodoFilterStatus,
        deleteTodo,
        submitTodo,
        updateTodo,
        setTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
