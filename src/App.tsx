/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import Header from './components/Header';
import Section from './components/Section';
import { Footer } from './components/Footer';

import {
  DispatchContext,
  StateContext,
} from './components/GlobalStateProvider';

import { actions } from './vars/ActionsTypes';

export const App: React.FC = () => {
  const [todoTitle, setTodoTitle] = React.useState<string>('');
  const [editingTodoTitle, setEditingTodoTitle] = React.useState<string>('');

  const dispatch = React.useContext(DispatchContext);
  const { todos } = React.useContext(StateContext);

  React.useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const todo = savedTodos ? JSON.parse(savedTodos) : [];

    dispatch({
      type: actions.INIT_TODOS,
      payload: todo,
    });
  }, []);

  React.useEffect(() => {
    dispatch({
      type: actions.SAVE_TODOS,
    });
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header title={todoTitle} onChange={setTodoTitle} />

        <Section editTitle={editingTodoTitle} onChange={setEditingTodoTitle} />

        <Footer />
      </div>
    </div>
  );
};

// useStateUsage
// {
//   // interface Todo {
// //   id: number;
// //   title: string;
// //   completed: boolean;
// // }

// // type Filter = 'all' | 'active' | 'completed';

// // export const App: React.FC = () => {
// //   const [todos, setTodos] = React.useState<Todo[]>(() => {
// //     const savedTodos = localStorage.getItem('todos');

// //     return savedTodos ? JSON.parse(savedTodos) : [];
// //   });
// //   const [todoTitle, setTodoTitle] = React.useState('');

// //   const [addedTodo, setAddedTodo] = React.useState<Todo | null>(null);
// //   const [newTodoTitle, setNewTodoTitle] = React.useState('');

// //   const [filter, setFilter] = React.useState<Filter>('all');

// //   React.useEffect(() => {
// //     localStorage.setItem('todos', JSON.stringify(todos));
// //   }, [todos]);

// //   const handleFilterChange = (newFilter: Filter) => {
// //     setFilter(newFilter);
// //   };

// //   const filteredTodos = todos.filter(todo => {
// //     switch (filter) {
// //       case 'active':
// //         return !todo.completed;
// //       case 'completed':
// //         return todo.completed;
// //       default:
// //         return true;
// //     }
// //   });

// //   const getEditingTodo = (todo: Todo) => {
// //     setAddedTodo(todo);
// //     setNewTodoTitle(todo.title);
// //   };

// //   const saveEditingTodo = () => {
// //     if (!addedTodo) {
// //       return;
// //     }
// //     if (newTodoTitle.length === 0) {
// //       setTodos(todos.filter(todo => todo.id !== addedTodo.id));
// //     } else {
// //       const updatedTodos = todos.map(todo => {
// //         return todo.id === addedTodo.id
// //           ? { ...todo, title: newTodoTitle }
// //           : todo;
// //       });

// //       setTodos(updatedTodos);
// //     }

// //     setAddedTodo(null);
// //     setNewTodoTitle('');
// //   };

// //   const addTodo = (title: string) => {
// //     const newTodo: Todo = {
// //       id: Date.now(),
// //       title,
// //       completed: false,
// //     };

// //     setTodos([...todos, newTodo]);
// //   };

// //   const handleAddTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === 'Enter' && todoTitle.trim() !== '') {
// //       e.preventDefault();
// //       addTodo(todoTitle.trim());
// //       setTodoTitle('');
// //     }
// //   };

// //   const handleNewTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === 'Enter') {
// //       e.preventDefault();

// //       saveEditingTodo();
// //     } else if (e.key === 'Escape') {
// //       e.preventDefault();

// //       setAddedTodo(null);
// //       setNewTodoTitle('');
// //     }
// //   };

// //   const toggleTodoCompleted = (id: number) => {
// //     const updatedTodos = todos.map(todo => {
// //       return todo.id === id
// //         ? {
// //             ...todo,
// //             completed: !todo.completed,
// //           }
// //         : todo;
// //     });

// //     setTodos(updatedTodos);
// //   };

// //   const toggleAllTodosCompleted = () => {
// //     const isAllCompleted = todos.every(todo => todo.completed);

// //     const updatedTodos = todos.map(todo => ({
// //       ...todo,
// //       completed: !isAllCompleted,
// //     }));

// //     setTodos(updatedTodos);
// //   };

// //   const handeRemoveCompletedTodos = () => {
// //     setTodos(todos.filter(todo => !todo.completed));
// //   };

// //   const removeTodo = (id: number) => {
// //     const updatedTodos = todos.filter(todo => todo.id !== id);
// //     setTodos(updatedTodos);
// //   };

// //   return (
// //     <div className="todoapp">
// //       <h1 className="todoapp__title">todos</h1>

// //       <div className="todoapp__content">
// //         <header className="todoapp__header">
// //           <button
// //             type="button"
// //             className={cn('todoapp__toggle-all', {
// //               active: todos.every(todo => todo.completed),
// //             })}
// //             data-cy="ToggleAllButton"
// //             onClick={toggleAllTodosCompleted}
// //           />

// //           <form className="todoapp__new-todo-form">
// //             <input
// //               data-cy="NewTodoField"
// //               type="text"
// //               className="todoapp__new-todo"
// //               placeholder="What needs to be done?"
// //               value={todoTitle}
// //               onChange={e => setTodoTitle(e.target.value)}
// //               onKeyDown={handleAddTodoKeyDown}
// //               autoFocus
// //             />
// //           </form>
// //         </header>

// //         <section className="todoapp__main" data-cy="TodoList">
// //           {filteredTodos.map(todo => (
// //             <div
// //               data-cy="Todo"
// //               className={cn('todo', { completed: todo.completed })}
// //               key={todo.id}
// //             >
// //               <label className="todo__status-label">
// //                 <input
// //                   data-cy="TodoStatus"
// //                   type="checkbox"
// //                   className="todo__status"
// //                   checked={todo.completed}
// //                   onChange={() => toggleTodoCompleted(todo.id)}
// //                 />
// //               </label>
// //               {addedTodo === todo ? (
// //                 <form>
// //                   <input
// //                     data-cy="TodoTitleField"
// //                     type="text"
// //                     className="todo__title-field"
// //                     placeholder="Empty todo will be deleted"
// //                     value={newTodoTitle}
// //                     onKeyDown={handleNewTodoKeyDown}
// //                     onChange={e => setNewTodoTitle(e.target.value)}
// //                     onBlur={() => saveEditingTodo()}
// //                     autoFocus
// //                   />
// //                 </form>
// //               ) : (
// //                 <>
// //                   <span
// //                     data-cy="TodoTitle"
// //                     className="todo__title"
// //                     onClick={() => getEditingTodo(todo)}
// //                   >
// //                     {todo.title}
// //                   </span>

// //                   <button
// //                     type="button"
// //                     className="todo__remove"
// //                     data-cy="TodoDelete"
// //                     onClick={() => removeTodo(todo.id)}
// //                   >
// //                     ×
// //                   </button>
// //                 </>
// //               )}
// //             </div>
// //           ))}
// //         </section>
// //         {todos.length !== 0 && (
// //           <footer className="todoapp__footer" data-cy="Footer">
// //             <span className="todo-count" data-cy="TodosCounter">
// //               {todos.filter(todo => !todo.completed).length} items left
// //             </span>

// //             <nav className="filter" data-cy="Filter">
// //               <a
// //                 href="#/"
// //                 className={cn('filter__link', { selected: filter === 'all' })}
// //                 data-cy="FilterLinkAll"
// //                 onClick={() => handleFilterChange('all')}
// //               >
// //                 All
// //               </a>

// //               <a
// //                 href="#/active"
// //                 className={cn('filter__link', {
// //                   selected: filter === 'active',
// //                 })}
// //                 data-cy="FilterLinkActive"
// //                 onClick={() => handleFilterChange('active')}
// //               >
// //                 Active
// //               </a>

// //               <a
// //                 href="#/completed"
// //                 className={cn('filter__link', {
// //                   selected: filter === 'completed',
// //                 })}
// //                 data-cy="FilterLinkCompleted"
// //                 onClick={() => handleFilterChange('completed')}
// //               >
// //                 Completed
// //               </a>
// //             </nav>

// //             <button
// //               type="button"
// //               className="todoapp__clear-completed"
// //               data-cy="ClearCompletedButton"
// //               onClick={handeRemoveCompletedTodos}
// //             >
// //               Clear completed
// //             </button>
// //           </footer>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };
// }
