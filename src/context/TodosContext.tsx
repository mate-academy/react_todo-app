import React, { useEffect, useReducer } from 'react';
import { Todo } from '../interfaces/Todo';

type Action = { type: 'add', todo: Todo }
| { type: 'delete', todoId: number }
| { type: 'change completed status', todoId: number }
| { type: 'change title', todoId: number, newTitle: string }
| { type: 'change completed status for all', isCompletedAll: boolean }
| { type: 'delete completed' }
| { type: 'set todos', todos: Todo[] | [] };

export const TodosContext = React.createContext<Todo[]>([] as Todo[]);
export const DispatchTodosContext
= React.createContext((action: Action) => {
  // eslint-disable-next-line no-console
  console.log(action);
});

type Props = {
  children: React.ReactNode;
};

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'set todos':
      return [...action.todos];

    case 'add':
      return [
        ...todos,
        action.todo,
      ];

    case 'change completed status': {
      const currentTodo = todos.find(todo => todo.id === action.todoId);

      if (!currentTodo) {
        return todos;
      }

      const newTodos = [...todos];
      const index = todos.indexOf(currentTodo);

      newTodos.splice(index, 1, {
        ...currentTodo,
        completed: !currentTodo.completed,
      });

      return newTodos;
    }

    case 'change completed status for all':
      return todos.map(todo => (
        {
          ...todo,
          completed: !action.isCompletedAll,
        }
      ));
    case 'change title': {
      const currentTodo = todos.find(todo => todo.id === action.todoId);

      if (!currentTodo) {
        return todos;
      }

      const newTodos = [...todos];
      const index = todos.indexOf(currentTodo);

      newTodos.splice(index, 1, {
        ...currentTodo,
        title: action.newTitle,
      });

      return newTodos;
    }

    case 'delete completed':
      return todos.filter(todo => !todo.completed);

    case 'delete':
      return todos.filter(todo => todo.id !== action.todoId);

    default:
      return todos;
  }
}

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const storageTodos = localStorage.getItem('todos');

    dispatch({ type: 'set todos', todos: JSON.parse(storageTodos || '[]') });
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <DispatchTodosContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>
        {children}
      </TodosContext.Provider>
    </DispatchTodosContext.Provider>
  );
};
