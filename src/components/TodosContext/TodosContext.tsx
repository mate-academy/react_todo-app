/* eslint-disable @typescript-eslint/indent */
import React, { useReducer } from 'react';
import { Todo } from '../../helpers/Todo';

interface Props {
  children: React.ReactNode;
}

const createInitialTodos = (): Todo[] => {
  const data = localStorage.getItem('todos');

  if (data === null) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

const initialTodos: Todo[] = createInitialTodos();

type Action = { type: 'addTodo', newTodo: Todo }
            | { type: 'selectCompletedTodos' }
            | { type: 'selectActiveTodos' }
            | { type: 'clearCompletedTodos' }
            | { type: 'deleteTodo', id: number }
            | { type: 'editTodo',
                id: number,
                newTitle?: string,
                newCompleted?: boolean,
              };

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'addTodo': {
      const newTodos = [
        ...todos,
        action.newTodo,
      ];

      localStorage.setItem('todos', JSON.stringify(newTodos));

      return newTodos;
    }

    case 'editTodo': {
      const index = [...todos].findIndex(todo => todo.id === action.id);
      const newTodos = [...todos];

      if (action.newTitle !== undefined) {
        if (action.newTitle.length) {
          newTodos[index].title = action.newTitle;
        } else {
          newTodos.splice(index, 1);
        }
      }

      if (action.newCompleted !== undefined) {
        newTodos[index].completed = action.newCompleted;
      }

      localStorage.setItem('todos', JSON.stringify(newTodos));

      return newTodos;
    }

    case 'deleteTodo': {
      const index = [...todos].findIndex(todo => todo.id === action.id);
      const newTodos = [...todos];

      newTodos.splice(index, 1);

      localStorage.setItem('todos', JSON.stringify(newTodos));

      return newTodos;
    }

    case 'selectCompletedTodos': {
      return [...todos].map((todo: Todo) => ({
        ...todo,
        completed: true,
    }));
    }

    case 'selectActiveTodos':
      return [...todos].map((todo: Todo) => ({
        ...todo,
        completed: false,
    }));

    case 'clearCompletedTodos': {
      const newTodos = [...todos].filter(todo => todo.completed === false);

      localStorage.setItem('todos', JSON.stringify(newTodos));

      return newTodos;
    }

    default:
      throw Error('Something went wrong');
  }
}

export const DispatchTodos
  = React.createContext<React.Dispatch<Action>>(() => {});
export const StateTodos = React.createContext(initialTodos);

export const TodosContext: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  // const [todos, dispatch] = useLocalStorage('todos', initialTodos);

  return (
    <DispatchTodos.Provider value={dispatch}>
      <StateTodos.Provider value={todos}>
        {children}
      </StateTodos.Provider>
    </DispatchTodos.Provider>
  );
};
