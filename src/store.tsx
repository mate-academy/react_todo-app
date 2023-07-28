/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useReducer, useState } from 'react';

export enum Status {
  All,
  Active,
  Completed,
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type State = Todo[];
type Action = { type: 'add', todo: Todo }
| { type: 'change-completeness', todo: Todo, completeness: boolean }
| { type: 'change-all', completeness: boolean }
| { type: 'delete', todo: Todo }
| { type: 'delete-completed' }
| { type: 'edit', todo: Todo, value: string };

const getInitialTodos = () => {
  const todos = localStorage.getItem('todos');

  if (todos) {
    return JSON.parse(todos);
  }

  return [];
};

const initialTodos: Todo[] = getInitialTodos();

export const TodosContext = React.createContext(initialTodos);
export const DispatchContext = React.createContext((_action: Action) => {});
export const FilterContext = React.createContext({
  filter: Status.All,
  setFilter(_filter: Status) {},
});

const reducer = (todos: State, action: Action) => {
  let newTodos: State = [];

  switch (action.type) {
    case 'add': {
      newTodos = [...todos, action.todo];

      break;
    }

    case 'change-completeness': {
      newTodos = todos.map(todo => {
        if (todo.id === action.todo.id) {
          return { ...todo, completed: action.completeness };
        }

        return todo;
      });

      break;
    }

    case 'change-all': {
      newTodos = todos.map(todo => {
        return { ...todo, completed: action.completeness };
      });

      break;
    }

    case 'delete': {
      newTodos = todos.filter(todo => todo.id !== action.todo.id);

      break;
    }

    case 'delete-completed': {
      newTodos = todos.filter(todo => todo.completed === false);

      break;
    }

    case 'edit': {
      newTodos = todos.map(todo => {
        if (todo.id === action.todo.id) {
          return { ...todo, title: action.value };
        }

        return todo;
      });

      break;
    }

    default: {
      newTodos = todos;
    }
  }

  localStorage.setItem('todos', JSON.stringify(newTodos));

  return newTodos;
};

interface Props {
  children: React.ReactNode;
}

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [filter, setFilter] = useState(Status.All);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <TodosContext.Provider value={todos}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </TodosContext.Provider>
    </FilterContext.Provider>
  );
};
