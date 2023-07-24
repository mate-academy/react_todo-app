/* eslint-disable default-case */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  toDelete: (id: number) => void;
  toToggle: (id: number) => void;
  toChangeTitle: (title: string, id: number) => void;
};

enum EventTypes {
  Blur = 'blur',
  Escape = 'escape',
  Enter = 'enter',
}

export const TodoItem: React.FC<Props> = React.memo((({
  todo, toDelete, toToggle, toChangeTitle,
}) => {
  const { id, title, completed } = todo;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const applyTodoTitleChanges = (
    input: HTMLInputElement,
    event: EventTypes,
  ) => {
    const editedTodo = input.closest('li');

    switch (event) {
      case EventTypes.Escape:
      case EventTypes.Enter:
      case EventTypes.Blur:
        toChangeTitle(input.value, id);
        break;
      default:
        toChangeTitle('', id);
    }

    if (editedTodo) {
      editedTodo.classList.remove('editing');
    }
  };

  // Handler for identifying single click and double click. And opened input for editing todo
  const handlerClick = (event: React.MouseEvent) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (event.detail === 1) {
      timer.current = setTimeout(() => toToggle(id), 200);
    } else if (event.detail === 2) {
      if (event.target) {
        const targetTodo = event.target as HTMLInputElement;
        const targetTodoParent = targetTodo.closest('li');
        const targetTodoInput
          = targetTodoParent?.querySelector('.edit') as HTMLInputElement;

        if (targetTodoParent) {
          targetTodoParent.classList.add('editing');
        }

        if (targetTodoInput) {
          targetTodoInput.value = title;
          targetTodoInput.focus();
        }
      }
    }
  };

  const handlerBlurEditInput = (
    event: React.FocusEvent<HTMLInputElement>,
  ) => {
    applyTodoTitleChanges(event.target as HTMLInputElement, EventTypes.Blur);
  };

  const handlerKeyBoardEditInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      const editedText = event.target as HTMLInputElement;

      applyTodoTitleChanges(
        editedText,
        EventTypes.Escape,
      );
    }

    if (event.key === 'Enter') {
      applyTodoTitleChanges(
        event.target as HTMLInputElement,
        EventTypes.Enter,
      );
    }
  };

  return (
    <li className={cn({ completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`${id}`}
          checked={completed}
          onClick={handlerClick}
          onChange={() => {}}
        />
        <label
          htmlFor={`${id}`}
          onClick={handlerClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => toDelete(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        onBlur={handlerBlurEditInput}
        onKeyUp={handlerKeyBoardEditInput}
      />
    </li>
  );
}));
