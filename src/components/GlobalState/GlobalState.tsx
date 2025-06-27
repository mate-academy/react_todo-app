import React, { useEffect, useReducer, useRef } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  children: React.ReactNode;
};

type Action =
  | { type: 'addTodo'; payload: string }
  | { type: 'editTitle'; payload: { id: number; title: string } }
  | { type: 'editCompleted'; payload: Todo }
  | { type: 'completeAllActive'; payload?: boolean }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'deleteCompletedTodos' };

function addTodo(title: string, todos: Todo[]) {
  if (title === '') {
    return todos;
  }

  const newTodo: Todo = {
    id: +new Date(),
    title,
    completed: false,
  };

  return [...todos, newTodo];
}

function deleteTodo(todoId: number, todos: Todo[]) {
  return [...todos.filter(todo => todo.id !== todoId)];
}

function editTodo(newTitle: string, todo: Todo, todos: Todo[]) {
  return todos.map(item => {
    if (item.id === todo.id) {
      return { ...todo, title: newTitle };
    }

    return item;
  });
}

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'addTodo':
      return addTodo(action.payload, todos);
    case 'deleteTodo':
      return deleteTodo(action.payload, todos);
    case 'deleteCompletedTodos': {
      return todos.filter(todo => !todo.completed);
    }

    case 'editTitle': {
      const { id, title } = action.payload;
      const todo = todos.find(item => item.id === id);

      if (!todo) {
        return todos;
      }

      return editTodo(title, todo, todos);
    }

    case 'editCompleted': {
      const { id, completed } = action.payload;

      return todos.map(item => {
        if (item.id === id) {
          return { ...item, completed };
        }

        return item;
      });
    }

    case 'completeAllActive': {
      if (action.payload) {
        return todos.map(todo => ({ ...todo, completed: false }));
      }

      return todos.map(todo => {
        if (!todo.completed) {
          return { ...todo, completed: true };
        }

        return todo;
      });
    }

    default:
      return todos;
  }
}

function initialTodos(): Todo[] {
  const saved = localStorage.getItem('todos');

  return saved ? JSON.parse(saved) : [];
}

export const InputContext =
  React.createContext<React.RefObject<HTMLInputElement> | null>(null);
export const TodosContext = React.createContext<Todo[]>([]);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalState: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialTodos());
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>
        <InputContext.Provider value={inputRef}>
          {children}
        </InputContext.Provider>
      </TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
