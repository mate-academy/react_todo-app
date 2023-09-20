import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContextProvider/TodosContextProvider';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const { id, title, completed } = todo;
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleChangeOfTitle = ((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTitle(event.target.value);
  });

  const handleTodoCompleting = (event: React.ChangeEvent<HTMLInputElement>) => {
    const todosCopy = [...todos];
    const searchedTodo = todos.find(({ id: todoId }) => todoId === id) as Todo;

    searchedTodo.completed = event.target.checked;

    setTodos(todosCopy);
  };

  const handleTodoDeleting = () => {
    const todosCopy = todos.filter(({ id: todoId }) => todoId !== id);

    setTodos(todosCopy);
  };

  const handleNewTitleSubmit = () => {
    if (!newTitle.trim()) {
      handleTodoDeleting();

      return;
    }

    const todosCopy = [...todos];
    const searchedTodo = todos.find(({ id: todoId }) => todoId === id) as Todo;

    searchedTodo.title = newTitle;

    setTodos(todosCopy);
    setIsBeingEdited(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsBeingEdited(false);

      return;
    }

    if (event.key === 'Enter') {
      handleNewTitleSubmit();
    }
  };

  return (
    <li
      className={classNames({
        completed,
        editing: isBeingEdited,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleTodoCompleting}
        />

        <label onDoubleClick={() => setIsBeingEdited(true)}>
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleTodoDeleting}
          aria-label="Delete the todo"
        />
      </div>
      {isBeingEdited && (
        <input
          type="text"
          className="edit"
          value={newTitle}
          onChange={handleChangeOfTitle}
          onKeyUp={handleKeyUp}
          onBlur={handleNewTitleSubmit}
          autoFocus
        />
      )}
    </li>
  );
};
