import React, { useState } from 'react';
import { Todo } from './types/Todo';
import {
  createTodo,
  deleteCompletedTodos,
  deleteTodos,
  getTodos as apiGetTodos,
  updateTodos,
} from './api/todos';

type Props = {
  children: React.ReactNode;
};

interface TodosContextType {
  todos: Todo[];
  getTodos: () => Promise<void>;
  addTodo: (todo: Omit<Todo, 'id'>) => Promise<Todo>;
  deleteTodo: (id: number) => Promise<void>;
  updateTodo: (td: Todo) => Promise<Todo>;
  deleteAllCompleted: (
    ids: number[],
  ) => Promise<PromiseSettledResult<unknown>[]>;
  handleToggling: () => Promise<PromiseSettledResult<Todo>[]>;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  getTodos: async () => Promise.resolve(),
  addTodo: async (todo: Omit<Todo, 'id'>) =>
    Promise.resolve({
      id: 0,
      title: todo.title,
      userId: todo.userId,
      completed: todo.completed,
    }),
  deleteTodo: async () => Promise.resolve(),
  updateTodo: async t => Promise.resolve(t),
  deleteAllCompleted: async () => Promise.resolve([]),
  handleToggling: async () => Promise.resolve([]),
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = () => {
    return apiGetTodos().then(data => {
      setTodos(data);
    });
  };

  const addTodoToServer = (todo: Omit<Todo, 'id'>) => {
    const trimmedTitle = todo.title.trim();

    return createTodo({
      title: trimmedTitle,
      userId: todo.userId,
      completed: todo.completed,
    }).then(newTodo => {
      setTodos(currentTodos => [...currentTodos, newTodo]);

      return newTodo;
    });
  };

  const deleteTodoFromServer = (id: number) => {
    return deleteTodos(id).then(() => {
      setTodos(current => current.filter(t => t.id !== id));
    });
  };

  const updateTodoOnServer = (td: Todo) => {
    return updateTodos(td).then(updated => {
      setTodos(prev => prev.map(t => (t.id === td.id ? updated : t)));

      return updated;
    });
  };

  const deleteCompletedFromServer = (ids: number[]) => {
    return deleteCompletedTodos(ids).then(results => {
      const fulfilledIds = results
        .map((r, i) => (r.status === 'fulfilled' ? ids[i] : null))
        .filter((id): id is number => id !== null);

      setTodos(current =>
        current.filter(todo => !fulfilledIds.includes(todo.id)),
      );

      return results;
    });
  };

  const toggleAllOnServer = (): Promise<PromiseSettledResult<Todo>[]> => {
    const allCompleted = todos.every(t => t.completed);
    const updates = allCompleted
      ? todos.map(t => ({ ...t, completed: false }))
      : todos.filter(t => !t.completed).map(t => ({ ...t, completed: true }));

    setTodos(prev => prev.map(t => updates.find(u => u.id === t.id) || t));

    return Promise.allSettled(updates.map(u => updateTodos(u))).then(res => {
      const fulfilled = res
        .filter(r => r.status === 'fulfilled')
        .map(r => (r as PromiseFulfilledResult<Todo>).value);

      setTodos(prev =>
        prev.map(t => fulfilled.find(ft => ft.id === t.id) || t),
      );

      return res;
    });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        getTodos: loadTodos,
        addTodo: addTodoToServer,
        deleteTodo: deleteTodoFromServer,
        updateTodo: updateTodoOnServer,
        deleteAllCompleted: deleteCompletedFromServer,
        handleToggling: toggleAllOnServer,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
