import React, { useEffect, useReducer, useRef } from 'react';
import { Todo } from '../../type/Todo';

type Action =
  | { type: 'addTodo'; payload: string }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'completeAll'; payload: boolean }
  | { type: 'updateComplete'; playload: { id: number; completed: boolean } }
  | { type: 'editTodo'; payload: { id: number; title: string } }
  | { type: 'deleteComplitedTodos' };

function addTodo(todos: Todo[], newTitle: string) {
  if (newTitle === '') {
    return todos;
  }

  const newTodo: Todo = {
    id: +new Date(),
    title: newTitle,
    completed: false,
  };

  return [...todos, newTodo];
}

function deleteTodo(todos: Todo[], id: number): Todo[] {
  return todos.filter(todo => todo.id !== id);
}

function editTodo(todos: Todo[], id: number, newTitle: string) {
  return todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, title: newTitle };
    }

    return todo;
  });
}

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'addTodo':
      return addTodo(todos, action.payload);
    case 'deleteTodo':
      return deleteTodo(todos, action.payload);
    case 'editTodo': {
      const { id, title } = action.payload;
      const todo = todos.find(item => item.id === id);

      if (!todo) {
        return todos;
      }

      return editTodo(todos, todo.id, title);
    }

    case 'completeAll': {
      if (action.payload) {
        return todos.map(todo => ({ ...todo, completed: false }));
      }

      return todos.map(todo => {
        if (todo.completed) {
          return todo;
        }

        return { ...todo, completed: true };
      });
    }

    case 'deleteComplitedTodos':
      return todos.filter(todo => !todo.completed);

    case 'updateComplete': {
      const { id, completed } = action.playload;

      return todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !completed };
        }

        return todo;
      });
    }

    default:
      return todos;
  }
}

const STORAGE_KEY = 'todos';

function initiialState(): Todo[] {
  const save = localStorage.getItem(STORAGE_KEY);

  return save ? JSON.parse(save) : [];
}

type Props = {
  children: React.ReactNode;
};

export const InputContext =
  React.createContext<React.RefObject<HTMLInputElement> | null>(null);

export const TodoContext = React.createContext<Todo[]>([]);
export const DispathContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initiialState());
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <DispathContext.Provider value={dispatch}>
      <TodoContext.Provider value={todos}>
        <InputContext.Provider value={inputRef}>
          {children}
        </InputContext.Provider>
      </TodoContext.Provider>
    </DispathContext.Provider>
  );
};
