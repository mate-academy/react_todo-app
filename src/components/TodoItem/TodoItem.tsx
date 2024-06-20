import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { DispatchContext } from '../StoreTodos/StoreTodos';

type Props = {
  todo: Todo;
};

type SelectedItem = {
  selectedTodo: Todo | null;
  newTitle: string;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    selectedTodo: null,
    newTitle: '',
  });

  const updateTodo = (updatedTodo: Todo) => {
    dispatch({ type: 'update', payload: updatedTodo });
  };

  const deleteTodo = (todoId: number) => {
    dispatch({ type: 'delete', payload: todoId });
  };

  const startEditingTodo = () => {
    setSelectedItem({
      selectedTodo: todo,
      newTitle: todo.title,
    });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedItem({
      ...selectedItem,
      newTitle: event.target.value,
    });
  };

  const stopEditingTodo = () => {
    setSelectedItem({
      selectedTodo: null,
      newTitle: '',
    });
  };

  const handleInputBlur = () => {
    const { selectedTodo, newTitle } = selectedItem;

    const trimmedTitle = newTitle.trim();

    if (selectedTodo) {
      if (!trimmedTitle) {
        deleteTodo(todo.id);
      }

      if (newTitle === selectedTodo.title) {
        stopEditingTodo();
      }

      updateTodo({
        ...todo,
        title: trimmedTitle,
      });

      stopEditingTodo();
    }
  };

  const handleTodoStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateTodo({
      ...todo,
      completed: event.target.checked,
    });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      stopEditingTodo();
    }
  };

  const handleDeleteClick = () => {
    dispatch({ type: 'delete', payload: todo.id });
  };

  const handleUpdateTodoSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newTitle = selectedItem.newTitle.trim();

    if (!newTitle) {
      dispatch({
        type: 'delete',
        payload: todo.id,
      });
    }

    updateTodo({
      ...todo,
      title: newTitle,
    });

    stopEditingTodo();
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleTodoStatusChange}
        />
      </label>

      {selectedItem.selectedTodo ? (
        <form onSubmit={handleUpdateTodoSubmit}>
          <input
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={selectedItem.newTitle}
            onChange={handleTitleChange}
            onBlur={handleInputBlur}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={startEditingTodo}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDeleteClick}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
