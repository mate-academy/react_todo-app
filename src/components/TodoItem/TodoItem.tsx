/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
}) => {
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [editTitle, setEditTitle] = useState(false);

  const onCompleted = useCallback(() => {
    const newTodos = [...todos];
    const changeTodo = newTodos.find(newTodo => newTodo.id === todo.id);

    if (changeTodo !== undefined) {
      changeTodo.completed = !changeTodo.completed;
    }

    setTodos(newTodos);
  }, [todos]);

  const onSetTodoTitle = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
  }, [todoTitle]);

  const onDeleteTodo = useCallback(() => {
    const deleteTodo = todos.filter(item => item.id !== todo.id);

    setTodos(deleteTodo);
  }, [todos]);

  const onEditTitle = useCallback(() => {
    setEditTitle(true);
  }, [todo]);

  const onEditTitleOnBlur = useCallback(() => {
    if (todoTitle === '') {
      onDeleteTodo();

      return;
    }

    const newTodos = [...todos];
    const changedTodo = newTodos.find(newTodo => newTodo.id === todo.id);

    if (changedTodo !== undefined) {
      changedTodo.title = todoTitle;

      setTodos(newTodos);
      setEditTitle(false);
    }
  }, [todoTitle]);

  const onEditTitleOnKeyDown = useCallback((
    event: React.KeyboardEvent,
  ) => {
    if (event.key === 'Escape') {
      setEditTitle(false);
      setTodoTitle(todo.title);
    }

    if (event.key === 'Enter' || event.key === '') {
      onEditTitleOnBlur();
    }
  }, [todoTitle]);

  return (
    <li
      className={classNames(
        {
          completed: todo.completed,
          editing: editTitle,
        },
      )}
      onDoubleClick={onEditTitle}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={onCompleted}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={onDeleteTodo}
        />
      </div>
      {editTitle && (
        <input
          type="text"
          className="edit"
          value={todoTitle}
          onChange={onSetTodoTitle}
          onBlur={onEditTitleOnBlur}
          onKeyDown={onEditTitleOnKeyDown}
          ref={input => input && input.focus()}
        />
      )}
    </li>
  );
};
