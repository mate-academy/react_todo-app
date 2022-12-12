import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo;
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  setActiveTodos: (active: number | ((prev: number) => number)) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  setActiveTodos,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const handleCompleted = useCallback(() => {
    const newTodos = [...todos];
    const changedTodo = newTodos.find(newTodo => newTodo.id === todo.id);

    if (changedTodo !== undefined) {
      changedTodo.completed = !changedTodo.completed;
    }

    setTodos(newTodos);
    setActiveTodos(newTodos.reduce(
      (acc, curr) => (acc + (curr.completed ? 0 : 1)), 0,
    ));
  }, [todos]);

  const handleDeleteTodo = useCallback(() => {
    if (!todo.completed) {
      setActiveTodos((prev) => prev - 1);
    }

    setTodos(todos.filter(item => item.id !== todo.id));
  }, [todos]);

  const handleEditTitle = useCallback(() => {
    setEditMode(true);
  }, [todo]);

  const handleSetTitle = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
  }, [todoTitle]);

  const handleChangeTitleOnBlur = useCallback(() => {
    if (todoTitle === '') {
      handleDeleteTodo();

      return;
    }

    const newTodos = [...todos];
    const changedTodo = newTodos.find(newTodo => newTodo.id === todo.id);

    if (changedTodo !== undefined) {
      changedTodo.title = todoTitle;

      setTodos(newTodos);
      setEditMode(false);
    }
  }, [todoTitle]);

  const handleChangeTitleOnKeyDown = useCallback((
    event: React.KeyboardEvent,
  ) => {
    if (event.key === 'Escape') {
      setEditMode(false);
      setTodoTitle(todo.title);
    }

    if (event.key === 'Enter' || event.key === '') {
      handleChangeTitleOnBlur();
    }
  }, [todoTitle]);

  return (
    <li
      key={todo.id}
      className={cn(
        {
          completed: todo.completed,
          editing: editMode,
        },
      )}
      onDoubleClick={handleEditTitle}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={handleCompleted}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      {editMode && (
        <input
          type="text"
          className="edit"
          ref={input => input && input.focus()}
          value={todoTitle}
          onChange={handleSetTitle}
          onBlur={handleChangeTitleOnBlur}
          onKeyDown={handleChangeTitleOnKeyDown}
        />
      )}
    </li>
  );
};
