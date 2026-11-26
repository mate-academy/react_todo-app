import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodosContext } from '../context/TodoContext';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useTodosContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

// {/* This is a completed todo */}
//       <div data-cy="Todo" className="todo completed">
//         <label className="todo__status-label">
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//             checked
//           />
//         </label>

//         <span data-cy="TodoTitle" className="todo__title">
//           Completed Todo
//         </span>

//         {/* Remove button appears only on hover */}
//         <button type="button" className="todo__remove" data-cy="TodoDelete">
//           ×
//         </button>
//       </div>

//       {/* This todo is an active todo */}
//       <div data-cy="Todo" className="todo">
//         <label className="todo__status-label">
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//           />
//         </label>

//         <span data-cy="TodoTitle" className="todo__title">
//           Not Completed Todo
//         </span>

//         <button type="button" className="todo__remove" data-cy="TodoDelete">
//           ×
//         </button>
//       </div>

//       {/* This todo is being edited */}
//       <div data-cy="Todo" className="todo">
//         <label className="todo__status-label">
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//           />
//         </label>

//         {/* This form is shown instead of the title and remove button */}
//         <form>
//           <input
//             data-cy="TodoTitleField"
//             type="text"
//             className="todo__title-field"
//             placeholder="Empty todo will be deleted"
//             value="Todo is being edited now"
//           />
//         </form>
//       </div>

//       {/* This todo is in loadind state */}
//       <div data-cy="Todo" className="todo">
//         <label className="todo__status-label">
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//           />
//         </label>

//         <span data-cy="TodoTitle" className="todo__title">
//           Todo is being saved now
//         </span>

//         <button type="button" className="todo__remove" data-cy="TodoDelete">
//           ×
//         </button>
//       </div>
