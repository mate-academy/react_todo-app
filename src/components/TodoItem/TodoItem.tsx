// import classnames from 'classnames';
// import {
//   useContext, useRef, useState, useEffect,
// } from 'react';

// import { Todo } from '../../interface/Todo';
// import { TodoContext } from '../../context/TodoContext';

// type Props = {
//   todo: Todo;
// };

// export const TodoItem: React.FC<Props> = ({ todo }) => {
//   const { todos, setTodos } = useContext(TodoContext);

//   const handleComplete = () => {
//     const todosCopy = [...todos];
//     const index = todosCopy.findIndex(({ id: currentId }) => {
//       return todo.id === currentId;
//     });
//     const updatedTodo: Todo = {
//       ...todo,
//       completed: !todo.completed,
//     };

//     todosCopy.splice(index, 1, updatedTodo);
//     setTodos(todosCopy);
//   };

//   const handleDelete = (currentTodo: Todo) => {
//     const todosCopy = [...todos];

//     setTodos(todosCopy.filter(({ id }) => id !== currentTodo.id));
//   };

//   // TEMP

//   const editInput = useRef<HTMLInputElement>(null);

//   const [editingTitle, setEditingTitle] = useState(todo.title);
//   const [isEdit, setIsEdit] = useState(false);

//   useEffect(() => {
//     if (editInput.current) {
//       editInput.current.focus();
//     }
//   }, [isEdit]);

//   const saveChange = () => {
//     if (!editingTitle.trim()) {
//       return todos.filter(({ id }) => id !== todo.id);
//     }

//     const currentTodo = todos.find(({ id }) => id === todo.id);

//     if (!currentTodo) {
//       return todos;
//     }

//     const newTodos = [...todos];
//     const index = todos.indexOf(currentTodo);

//     newTodos.splice(index, 1, {
//       ...currentTodo,
//       title: editingTitle,
//     });

//     setIsEdit(false);

//     return newTodos;
//   };

//   const handleEditingKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Escape') {
//       setIsEdit(false);
//       setEditingTitle(todo.title);
//     }

//     if (event.key === 'Enter') {
//       saveChange();
//     }
//   };

//   const handleEditingBlur = () => {
//     if (isEdit) {
//       saveChange();
//     }
//   };

//   const handleEditingChange
//   = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     setEditingTitle(event.target.value);
//   };

//   return (
//     <li className={classnames(
//       {
//         completed: todo.completed,
//         editing: isEdit,
//       },
//     )}
//     >
//       <div className="view">
//         <input
//           type="checkbox"
//           className="toggle"
//           id={classnames({
//             'toggle-view': !todo.completed && !isEdit,
//             'toggle-completed': todo.completed,
//             'toggle-editing': isEdit,
//           })}
//           onChange={handleComplete}
//           checked={todo.completed}
//         />
//         <label
//           onDoubleClick={() => setIsEdit(true)}
//         >
//           {todo.title}
//         </label>
//         <button
//           type="button"
//           aria-label="Delete Todo"
//           className="destroy"
//           data-cy="deleteTodo"
//           onClick={() => handleDelete(todo)}
//         />
//         <input
//           type="text"
//           className="edit"
//           value={editingTitle}
//           ref={editInput}
//           onChange={handleEditingChange}
//           onKeyUp={handleEditingKeyUp}
//           onBlur={handleEditingBlur}
//         />
//       </div>
//     </li>
//   );
// };
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { TodoContext } from '../../context/TodoContext';
import { Todo } from '../../interface/Todo';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos } = useContext(TodoContext);
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleComplete = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodos(prev => prev.map(currentTodo => {
      if (currentTodo.id === todo.id) {
        return { ...currentTodo, completed: event.target.checked };
      }

      return currentTodo;
    }));
  };

  const handleDelete = () => {
    setTodos(prev => prev.filter(({ id }) => id !== todo.id));
  };

  const handleEditTodo = (
    title: string,
  ) => {
    if (title && title !== todo.title) {
      setTodos(prev => prev.map(currentTodo => {
        if (currentTodo.id === todo.id) {
          return { ...currentTodo, title };
        }

        return currentTodo;
      }));
      setIsEdit(false);
    }

    if (!title) {
      handleDelete();
    }
  };

  const handlePressEscape = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setIsEdit(false);
    }
  };

  const handlePressEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleEditTodo(newTitle);
    }
  };

  return (
    <li
      className={classnames({
        completed: todo.completed,
        editing: isEdit,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={classnames({
            'toggle-view': !todo.completed && !isEdit,
            'toggle-completed': todo.completed,
            'toggle-editing': isEdit,
          })}
          checked={todo.completed}
          onChange={handleComplete}
        />
        <label
          onDoubleClick={() => setIsEdit(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onKeyUp={handlePressEscape}
        onChange={(event) => setNewTitle(event.target.value)}
        onKeyDown={handlePressEnter}
        onBlur={() => handleEditTodo(newTitle)}
      />
    </li>
  );
};
