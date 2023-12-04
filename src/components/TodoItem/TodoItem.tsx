import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem:React.FC<Props> = ({ todo }) => {
  const {
    handleDelete,
    handleInputChange,
    setSelectedTodo,
  } = useContext(TodosContext);

  return (
    <li key={todo.id}>
      <div className={classNames(
        'view',
        {
          completed: todo.completed,
        },
      )}
      >
        <input type="checkbox" className="toggle" id="toggle-view" />
        <label htmlFor="toggle-view">{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            handleDelete(todo.id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        onClick={() => handleInputChange(todo)}
        onSelect={() => setSelectedTodo(todo)}
      />
    </li>
  );
};
