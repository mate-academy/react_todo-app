// import React, { useEffect, useRef, useState } from 'react';
// import { UserWarning } from './UserWarning';
// import {
//   addTodo,
//   deleteTodo,
//   getTodos,
//   updateTodo,
//   USER_ID,
// } from './api/todos';
// import { Header } from './components/Header';
// import { TodoList } from './components/TodoList';
// import { Footer } from './components/Footer';
// import { Error } from './components/Error';
// import { Todo } from './types/Todo';
// import { Filter } from './types/Filter';

// export const App: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
//   const [error, setError] = useState('');
//   const [statusFilter, setStatusFilter] = useState<Filter>(Filter.All);
//   const [title, setTitle] = useState('');
//   const [isCreating, setIsCreating] = useState(false);
//   const [tempTodo, setTempTodo] = useState<Todo | null>(null);
//   const [deletingTodoIds, setDeletingTodoIds] = useState<number[]>([]);

//   const isLoading = loadingTodoIds.length > 0;

//   const inputRef = useRef<HTMLInputElement>(null);

//   const completedCount = todos.filter(todo => todo.completed).length;

//   const loadTodos = async () => {
//     setLoadingTodoIds(ids => [...ids, 0]);
//     setError('');

//     try {
//       const data = await getTodos();

//       setTodos(data);
//     } catch (err) {
//       setError('Unable to load todos');

//       setTimeout(() => {
//         setError('');
//       }, 3000);
//     } finally {
//       setLoadingTodoIds(ids => ids.filter(id => id !== 0));
//     }
//   };

//   useEffect(() => {
//     loadTodos();
//   }, []);

//   const handleFilterChange = (newFilter: Filter) => {
//     setStatusFilter(newFilter);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const trimmedTitle = title.trim();

//     if (!trimmedTitle) {
//       setError('Title should not be empty');
//       setTimeout(() => setError(''), 3000);

//       return;
//     }

//     const newTodo = {
//       userId: USER_ID,
//       title: trimmedTitle,
//       completed: false,
//     };

//     setIsCreating(true);
//     setTempTodo({ ...newTodo, id: 0 });

//     try {
//       const createdTodo = await addTodo(newTodo);

//       setTodos(current => [...current, createdTodo]);
//       setTitle('');
//     } catch {
//       setError('Unable to add a todo');
//       setTimeout(() => setError(''), 3000);
//     } finally {
//       setIsCreating(false);
//       setTempTodo(null);
//     }
//   };

//   const handleDelete = async (todoId: number) => {
//     setDeletingTodoIds(ids => [...ids, todoId]);

//     try {
//       await deleteTodo(todoId);
//       setTodos(current => current.filter(todo => todo.id !== todoId));
//       inputRef.current?.focus();
//     } catch (err) {
//       setError('Unable to delete a todo');
//       setTimeout(() => setError(''), 3000);
//       throw err;
//     } finally {
//       setDeletingTodoIds(ids => ids.filter(id => id !== todoId));
//     }
//   };

//   const onClearCompleted = () => {
//     const completedTodos = todos.filter(todo => todo.completed);

//     const deletePromises = completedTodos.map(todo => {
//       setDeletingTodoIds(current => [...current, todo.id]);

//       return deleteTodo(todo.id)
//         .then(() => {
//           setTodos(current => current.filter(t => t.id !== todo.id));
//         })
//         .catch(() => {
//           setError('Unable to delete a todo');
//         })
//         .finally(() => {
//           setDeletingTodoIds(current => current.filter(id => id !== todo.id));
//         });
//     });

//     Promise.allSettled(deletePromises).then(() => {
//       inputRef.current?.focus();
//     });
//   };

//   const onToggleStatus = (todoId: number, newStatus: boolean) => {
//     setLoadingTodoIds(ids => [...ids, 0]);

//     updateTodo(todoId, { completed: newStatus })
//       .then(updatedTodo => {
//         setTodos(current =>
//           current.map(todo =>
//             todo.id === todoId
//               ? { ...todo, completed: updatedTodo.completed }
//               : todo,
//           ),
//         );
//       })
//       .catch(() => {
//         setError('Unable to update a todo');
//       })
//       .finally(() => {
//         setLoadingTodoIds(ids => ids.filter(id => id !== 0));
//       });
//   };

//   const toggleAll = async () => {
//     setLoadingTodoIds(ids => [...ids, 0]);

//     const areAllCompleted = todos.every(todo => todo.completed);
//     const newStatus = !areAllCompleted;

//     const todosToUpdate = todos.filter(todo => todo.completed !== newStatus);

//     try {
//       const updates = await Promise.all(
//         todosToUpdate.map(todo =>
//           updateTodo(todo.id, { completed: newStatus }),
//         ),
//       );

//       setTodos(current =>
//         current.map(todo => {
//           const updated = updates.find(u => u.id === todo.id);

//           return updated ? { ...todo, completed: updated.completed } : todo;
//         }),
//       );
//     } catch {
//       setError('Unable to update some todos');
//       setTimeout(() => setError(''), 3000);
//     } finally {
//       setLoadingTodoIds(ids => ids.filter(id => id !== 0));
//     }
//   };

//   const filteredTodos = todos.filter(todo => {
//     if (statusFilter === Filter.Active) {
//       return !todo.completed;
//     }

//     if (statusFilter === Filter.Completed) {
//       return todo.completed;
//     }

//     return true;
//   });

//   if (!USER_ID) {
//     return <UserWarning />;
//   }

//   const handleRename = async (todoId: number, newTitle: string) => {
//     try {
//       setLoadingTodoIds(ids => [...ids, 0]);

//       const updatedTodo = await updateTodo(todoId, { title: newTitle });

//       setTodos(prevTodos =>
//         prevTodos.map(todo =>
//           todo.id === todoId ? { ...todo, title: updatedTodo.title } : todo,
//         ),
//       );
//     } catch (err) {
//       setError('Unable to update a todo');
//       setTimeout(() => setError(''), 3000);
//       throw err;
//     } finally {
//       setLoadingTodoIds(ids => ids.filter(id => id !== 0));
//     }
//   };

//   return (
//     <div className="todoapp">
//       <h1 className="todoapp__title">todos</h1>

//       <div className="todoapp__content">
//         <Header
//           title={title}
//           setTitle={setTitle}
//           handleSubmit={handleSubmit}
//           isCreating={isCreating}
//           inputRef={inputRef}
//           toggleAll={toggleAll}
//           isAllCompleted={todos.every(todo => todo.completed)}
//           todos={todos}
//           isLoadingTodos={isLoading}
//         />

//         <TodoList
//           todos={filteredTodos}
//           tempTodo={tempTodo}
//           setError={setError}
//           onDelete={handleDelete}
//           onRename={handleRename}
//           deletingTodoIds={deletingTodoIds}
//           onToggleStatus={onToggleStatus}
//           loadingAllTodos={isLoading}
//         />

//         {todos.length > 0 && (
//           <Footer
//             todos={todos}
//             statusFilter={statusFilter}
//             onFilterChange={handleFilterChange}
//             onClearCompleted={onClearCompleted}
//             completedCount={completedCount}
//           />
//         )}
//       </div>

//       <Error error={error} onClose={() => setError('')} />
//     </div>
//   );
// };

import React, { useRef } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';
import { useTodos } from './context/TodosContext';

export const App: React.FC = () => {
  const {
    value: { todos },
    // loadTodos,
  } = useTodos();

  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   loadTodos();
  // }, [loadTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          inputRef={inputRef}
          isAllCompleted={todos.every(todo => todo.completed)}
        />

        <TodoList />

        {todos.length > 0 && <Footer />}
      </div>

      <Error />
    </div>
  );
};
