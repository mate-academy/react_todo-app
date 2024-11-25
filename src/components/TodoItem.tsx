/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useEffect, useState } from 'react';
import { focusInput } from '../utils/services';
import { deleteTodo, updateTodo } from '../api/todos';
import { USER_ID } from '../utils/constants';
import { useTodoContext } from './TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    inputRef,
    setActiveTodoId,
    setTodos,
    showError,
    activeTodoId,
    activeTodoList,
    setError,
  } = useTodoContext();

  const { id, completed, title } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  useEffect(() => {
    focusInput(inputRef);
  }, [isEditing, inputRef]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleUpdateTodo = async (todoItem: Todo, newTodoTitle: string) => {
    setActiveTodoId(todoItem.id);

    try {
      const updatedTodo = await updateTodo({
        id: todoItem.id,
        title: newTodoTitle,
        completed: todoItem.completed,
        userId: USER_ID,
      });

      setTodos(prevTodos =>
        prevTodos.map(tItem =>
          tItem.id === updatedTodo.id ? updatedTodo : tItem,
        ),
      );
    } catch (err) {
      showError('Unable to update a todo');
      throw err;
    } finally {
      setActiveTodoId(null);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    setActiveTodoId(todoId);
    try {
      await deleteTodo(todoId);
      setTodos(currentTodos => currentTodos.filter(t => t.id !== todoId));
    } catch (err) {
      showError('Unable to delete a todo');
      throw err;
    } finally {
      setActiveTodoId(null);
      focusInput(inputRef);
    }
  };

  const handleRenameSubmit = async () => {
    let errorMsg = false;

    if (newTitle.trim() === '') {
      try {
        await handleDeleteTodo(id);
      } catch (err) {
        if (err) {
          errorMsg = true;
        }

        focusInput(inputRef);
      }
    } else if (newTitle.trim() !== title) {
      try {
        await handleUpdateTodo(todo, newTitle.trim());
      } catch (err) {
        if (err) {
          errorMsg = true;
        }

        focusInput(inputRef);
      }
    }

    if (errorMsg) {
      focusInput(inputRef);

      return;
    }

    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRenameSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(todo.title);
    }
  };

  const handleBlur = () => {
    handleRenameSubmit();
  };

  const handleToggle = async (todoItem: Todo) => {
    setError('');
    setActiveTodoId(todoItem.id);
    const updatedtodo = { ...todoItem, completed: !todoItem.completed };

    try {
      const updated = await updateTodo(updatedtodo);

      setTodos(currentTodos =>
        currentTodos.map(t => (t.id === updated.id ? updated : t)),
      );
    } catch {
      showError('Unable to update a todo');
    } finally {
      setActiveTodoId(null);
    }
  };

  return (
    <div
      data-cy="Todo"
      key={id}
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label" htmlFor={`todo-checkbox-${id}`}>
        <input
          id={`todo-checkbox-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => handleToggle(todo)}
        />
      </label>
      {isEditing ? (
        <form onSubmit={e => e.preventDefault()}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            ref={inputRef}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleEdit}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active':
            todo.id === activeTodoId ||
            (activeTodoList && activeTodoList.includes(todo.id)),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
