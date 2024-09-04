import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { createTodo, updateTodo } from '../api/todos';
import { useTodos } from '../context/useTodos';
import { isAllTodosDone } from '../utils/Helpers';
import { ActionTypes } from '../types/ActionTypes';

type Props = {
  fieldTitle: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({ fieldTitle }) => {
  const [newTitle, setNewTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { todos, dispatch } = useTodos();

  const isAllTodosCompleted = useMemo(() => isAllTodosDone(todos), [todos]);

  useEffect(() => {
    fieldTitle.current?.focus();
  }, [isSubmitting, fieldTitle]);

  const handleOnChangeStatus = () => {
    const todoToToggle = todos.filter(
      todo => todo.completed === isAllTodosCompleted,
    );

    todoToToggle.map(todo => {
      const updatedTodo = {
        ...todo,
        completed: !isAllTodosCompleted,
      };

      dispatch({
        type: ActionTypes.onUpdate,
        payload: updatedTodo,
      });
      updateTodo(updatedTodo);
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = newTitle.trim();

    if (!title) {
      return;
    } else {
      setIsSubmitting(true);
      const newTodo = {
        title,
        completed: false,
        id: +new Date(),
      };

      dispatch({ type: ActionTypes.onAdd, payload: newTodo });
      createTodo(newTodo);
      setNewTitle('');
      setIsSubmitting(false);
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          onClick={handleOnChangeStatus}
          type="button"
          className={cn('todoapp__toggle-all', { active: isAllTodosCompleted })}
          data-cy="ToggleAllButton"
        />
      )}
      <form onSubmit={handleOnSubmit}>
        <input
          ref={fieldTitle}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          disabled={isSubmitting}
        />
      </form>
    </header>
  );
};
