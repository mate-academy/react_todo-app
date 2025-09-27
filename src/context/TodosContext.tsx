// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { Todo } from '../types/Todo';
// import { Filter } from '../types/Filter';

// type TodosContextType = {
//   todos: Todo[];
//   filter: Filter;
//   addTodo: (title: string) => void;
//   deleteTodo: (id: number) => void;
//   toggleTodo: (id: number) => void;
//   renameTodo: (id: number, title: string) => void;
//   toggleAll: (completed: boolean) => void;
//   clearCompleted: () => void;
//   setFilter: (filter: Filter) => void;
// };

// const TodosContext = createContext<TodosContextType | undefined>(undefined);

// export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [filter, setFilter] = useState<Filter>(Filter.All);

//   // Load from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem('todos');

//     if (saved) {
//       setTodos(JSON.parse(saved));
//     }
//   }, []);

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem('todos', JSON.stringify(todos));
//   }, [todos]);

//   const addTodo = (title: string) => {
//     const newTodo: Todo = {
//       id: Date.now(),
//       title: title.trim(),
//       completed: false,
//     };

//     setTodos(prev => [...prev, newTodo]);
//   };

//   const deleteTodo = (id: number) => {
//     setTodos(prev => prev.filter(todo => todo.id !== id));
//   };

//   const toggleTodo = (id: number) => {
//     setTodos(prev =>
//       prev.map(todo =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo,
//       ),
//     );
//   };

//   const renameTodo = (id: number, title: string) => {
//     setTodos(prev =>
//       prev.map(todo => (todo.id === id ? { ...todo, title } : todo)),
//     );
//   };

//   const toggleAll = (completed: boolean) => {
//     setTodos(prev => prev.map(todo => ({ ...todo, completed })));
//   };

//   const clearCompleted = () => {
//     setTodos(prev => prev.filter(todo => !todo.completed));
//   };

//   return (
//     <TodosContext.Provider
//       value={{
//         todos,
//         filter,
//         addTodo,
//         deleteTodo,
//         toggleTodo,
//         renameTodo,
//         toggleAll,
//         clearCompleted,
//         setFilter,
//       }}
//     >
//       {children}
//     </TodosContext.Provider>
//   );
// };

// export const useTodos = (): TodosContextType => {
//   const context = useContext(TodosContext);

//   if (!context) {
//     throw new Error('useTodos must be used within a TodosProvider');
//   }

//   return context;
// };

import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  USER_ID,
} from '../api/todos';
import { UserWarning } from '../UserWarning';

type TodosContextType = {
  filter: {
    statusFilter: Filter;
    setStatusFilter: React.Dispatch<React.SetStateAction<Filter>>;
  };
  value: {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  };
  loadTodos: () => Promise<void>;
  loadingTodoIds: number[];
  setLoadingTodoIds: React.Dispatch<React.SetStateAction<number[]>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string>>;
  deletingTodoIds: number[];
  setDeletingTodoIds: React.Dispatch<React.SetStateAction<number[]>>;
  handleDelete: (todoId: number) => Promise<void>;
  handleRename: (todoId: number, newTitle: string) => void;
  onToggleStatus: (todoId: number, newStatus: boolean) => void;
  tempTodo: Todo | null;
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  isCreating: boolean;
  handleSubmit: (event: React.FormEvent) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  toggleAll: () => Promise<void>;
  onClearCompleted: () => void;
  completedCount: number;
  filteredTodos: Todo[];
};

export const TodosContext = React.createContext<TodosContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState<Filter>(Filter.All);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [deletingTodoIds, setDeletingTodoIds] = useState<number[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');

  const value = useMemo(() => ({ todos, setTodos }), [todos]);
  const filter = useMemo(
    () => ({ statusFilter, setStatusFilter }),
    [statusFilter],
  );

  const completedCount = todos.filter(todo => todo.completed).length;

  const loadTodos = useCallback(async () => {
    setLoadingTodoIds(ids => [...ids, 0]);
    setError('');

    try {
      const data = await getTodos();

      setTodos(data);
    } catch (err) {
      setError('Unable to load todos');

      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoadingTodoIds(ids => ids.filter(id => id !== 0));
    }
  }, []);

  const handleDelete = async (todoId: number) => {
    setDeletingTodoIds(ids => [...ids, todoId]);

    try {
      await deleteTodo(todoId);
      setTodos(current => current.filter(todo => todo.id !== todoId));
      // inputRef.current?.focus();
    } catch (err) {
      setError('Unable to delete a todo');
      setTimeout(() => setError(''), 3000);
      throw err;
    } finally {
      setDeletingTodoIds(ids => ids.filter(id => id !== todoId));
    }
  };

  const handleRename = async (todoId: number, newTitle: string) => {
    try {
      setLoadingTodoIds(ids => [...ids, 0]);

      const updatedTodo = await updateTodo(todoId, { title: newTitle });

      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === todoId ? { ...todo, title: updatedTodo.title } : todo,
        ),
      );
    } catch (err) {
      setError('Unable to update a todo');
      setTimeout(() => setError(''), 3000);
      throw err;
    } finally {
      setLoadingTodoIds(ids => ids.filter(id => id !== 0));
    }
  };

  const onToggleStatus = (todoId: number, newStatus: boolean) => {
    setLoadingTodoIds(ids => [...ids, 0]);

    updateTodo(todoId, { completed: newStatus })
      .then(updatedTodo => {
        setTodos(current =>
          current.map(todo =>
            todo.id === todoId
              ? { ...todo, completed: updatedTodo.completed }
              : todo,
          ),
        );
      })
      .catch(() => {
        setError('Unable to update a todo');
      })
      .finally(() => {
        setLoadingTodoIds(ids => ids.filter(id => id !== 0));
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Title should not be empty');
      setTimeout(() => setError(''), 3000);

      return;
    }

    const newTodo = {
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    setIsCreating(true);
    setTempTodo({ ...newTodo, id: 0 });

    try {
      const createdTodo = await addTodo(newTodo);

      setTodos(current => [...current, createdTodo]);
      setTitle('');
    } catch {
      setError('Unable to add a todo');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsCreating(false);
      setTempTodo(null);
    }
  };

  const toggleAll = async () => {
    const areAllCompleted = todos.every(todo => todo.completed);
    const newStatus = !areAllCompleted;

    const todosToUpdate = todos.filter(todo => todo.completed !== newStatus);

    setLoadingTodoIds(ids => [...ids, ...todosToUpdate.map(todo => todo.id)]);
    try {
      const updates = await Promise.all(
        todosToUpdate.map(todo =>
          updateTodo(todo.id, { completed: newStatus }),
        ),
      );

      setTodos(current =>
        current.map(todo => {
          const updated = updates.find(u => u.id === todo.id);

          return updated ? { ...todo, completed: updated.completed } : todo;
        }),
      );
    } catch {
      setError('Unable to update some todos');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoadingTodoIds(ids =>
        ids.filter(id => !todosToUpdate.some(todo => todo.id === id)),
      );
    }
  };

  const onClearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    const deletePromises = completedTodos.map(todo => {
      setDeletingTodoIds(current => [...current, todo.id]);

      return deleteTodo(todo.id)
        .then(() => {
          setTodos(current => current.filter(t => t.id !== todo.id));
        })
        .catch(() => {
          setError('Unable to delete a todo');
        })
        .finally(() => {
          setDeletingTodoIds(current => current.filter(id => id !== todo.id));
        });
    });

    Promise.allSettled(deletePromises).then(() => {
      // inputRef.current?.focus();
    });
  };

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === Filter.Active) {
      return !todo.completed;
    }

    if (statusFilter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <TodosContext.Provider
      value={{
        value,
        filter,
        error,
        loadingTodoIds,
        setLoadingTodoIds,
        loadTodos,
        setError,
        deletingTodoIds,
        setDeletingTodoIds,
        handleDelete,
        handleRename,
        onToggleStatus,
        tempTodo,
        setTempTodo,
        isCreating,
        handleSubmit,
        title,
        setTitle,
        toggleAll,
        onClearCompleted,
        completedCount,
        filteredTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = (): TodosContextType => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
