/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';
import { FilterParams } from '../types/FilterParams';
import { saveTodos, getTodos } from '../utils/TodosLocaleStorage';

type TodosContexData = {
  todos: Todo[];
  showTodosByStatus: FilterParams;
};

type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo' | 'togleTodo'; payload: number }
  | { type: 'changeTitle'; payload: { id: number; title: string } }
  | { type: 'togleAll'; payload: boolean }
  | { type: 'deleteCompletedTodo' }
  | { type: 'changeFilterParam'; payload: FilterParams };

const initialTodosData: TodosContexData = {
  todos: getTodos(),
  showTodosByStatus: FilterParams.all,
};

export const TodosDataContext = React.createContext(initialTodosData);
export const DispatchContext = React.createContext((a: Action) => {});

function reducer(state: TodosContexData, action: Action): TodosContexData {
  const { todos, showTodosByStatus } = state;

  const updateTodosList = (t: Todo[]) => {
    saveTodos(t);

    return {
      ...state,
      todos: t,
    };
  };

  switch (action.type) {
    case 'addTodo':
      const addedTodo = [...todos, action.payload];

      return updateTodosList(addedTodo);
    case 'deleteTodo':
      const deletedTodo = todos.filter(todo => todo.id !== action.payload);

      return updateTodosList(deletedTodo);
    case 'deleteCompletedTodo':
      const deleteCompletedTodo = todos.filter(t => !t.completed);

      return updateTodosList(deleteCompletedTodo);
    case 'togleTodo':
      const togledTodo = todos.map(t => {
        if (t.id !== action.payload) {
          return t;
        }

        return { ...t, completed: !t.completed };
      });

      return updateTodosList(togledTodo);
    case 'togleAll':
      const toggleAllTodos = todos.map(t => ({
        ...t,
        completed: !action.payload,
      }));

      return updateTodosList(toggleAllTodos);
    case 'changeTitle':
      const changedTitle = todos.map(t => {
        if (t.id !== action.payload.id) {
          return t;
        }

        return { ...t, title: action.payload.title };
      });

      return updateTodosList(changedTitle);
    case 'changeFilterParam':
      return {
        ...state,
        showTodosByStatus: action.payload,
      };
  }
}

type Props = { children: React.ReactNode };

export const TodosDataProvider: React.FC<Props> = ({ children }) => {
  const [todosData, dispatch] = useReducer(reducer, initialTodosData);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosDataContext.Provider value={todosData}>
        {children}
      </TodosDataContext.Provider>
    </DispatchContext.Provider>
  );
};
