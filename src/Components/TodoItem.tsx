import cn from 'classnames';
import React, { useContext, useRef, useState } from 'react';
import { Todo } from '../Types/Todo';
import { TodosContext } from './TodosContext';

interface Props {
  todo: Todo;
  todoIndex: number;
  input: React.RefObject<HTMLInputElement>;
}

export const TodoItem: React.FC<Props> = ({ todo, todoIndex, input }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState('');
  const [todoBeingEdited, setTodoBeingEdited] = useState<boolean>(false);
  const editField = useRef<HTMLInputElement>(null);

  const handleDelete = (todoToRemove: Todo) => {
    setTodos(todos.filter(item => item.id !== todoToRemove.id));

    input.current?.focus();
  };

  const handleDoubleClick = (todoToEdit: Todo) => {
    setTodoBeingEdited(true);
    setNewTitle(todoToEdit.title);

    setTimeout(() => {
      editField.current?.focus();
    }, 0);
  };

  const handleCheck = (todoToCheck: Todo, todoToCheckIndex: number) => {
    setTodos([
      ...todos.slice(0, todoToCheckIndex),
      { ...todoToCheck, completed: !todoToCheck.completed },
      ...todos.slice(todoToCheckIndex + 1),
    ]);

    input.current?.focus();
  };

  const handleEditSubmit = (
    e: React.FocusEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>,
    editedTodo: Todo,
    editedTodoIndex: number,
  ) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      setTodos(todos.filter(item => item.id !== editedTodo.id));

      return;
    }

    setTodos([
      ...todos.slice(0, editedTodoIndex),
      { ...editedTodo, title: newTitle.trim() },
      ...todos.slice(editedTodoIndex + 1),
    ]);

    setTodoBeingEdited(false);
    setNewTitle('');
  };

  const handleEscPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTodoBeingEdited(false);
      setNewTitle('');
    }
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
      key={todo.id}
      onDoubleClick={() => handleDoubleClick(todo)}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleCheck(todo, todoIndex)}
        />
      </label>

      {todoBeingEdited ? (
        <form onSubmit={e => handleEditSubmit(e, todo, todoIndex)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={e => handleEditSubmit(e, todo, todoIndex)}
            onKeyUp={e => handleEscPress(e)}
            ref={editField}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
