import React, { useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setVisibleTodos, setTodos } = useContext(TodosContext);

  const toggleTodoCompleted = (id: string) => {
    const updateTodos = todos.map(currentTodo => {
      if (currentTodo.id.toString() === id) {
        return { ...currentTodo, completed: !currentTodo.completed };
      }

      return currentTodo;
    });

    setTodos(updateTodos);
    setVisibleTodos(updateTodos);
  };

  const deleteTodo = (id: string) => {
    const updateTodos = todos.filter(
      currentTodo => currentTodo.id.toString() !== id,
    );

    setTodos(updateTodos);
    setVisibleTodos(updateTodos);
  };

  return (
    <li
      key={todo.id.toString()}
      className={classNames('', {
        completed: todo.completed,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={todo.id.toString()}
          checked={todo.completed}
          onChange={event => toggleTodoCompleted(event.target.id)}
        />
        <label htmlFor={todo.id.toString()}>{todo.title}</label>
        {/* eslint-disable-next-line */}
        <button
          id={todo.id.toString()}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            deleteTodo(todo.id.toString());
          }}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
