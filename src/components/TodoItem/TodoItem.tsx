import React, { useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../contexts/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.isCompleted,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.isCompleted}
          onChange={event => {
            const newTodos = [...todos];

            newTodos[todos.findIndex(item => todo.id === item.id)] = {
              ...todos[todos.findIndex(item => todo.id === item.id)],
              isCompleted: event.target.checked,
            };
            setTodos(newTodos);
          }}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.name}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => setTodos(todos.filter(item => item.id !== todo.id))}
      >
        ×
      </button>
    </div>
  );
};
