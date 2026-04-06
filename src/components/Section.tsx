import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';
import { NewTodo } from './NewTodo';
import { RemoveTodo } from './RemoveTodo';

type Props = {
  filteredTodos: Todo[];
};

export const Section: React.FC<Props> = ({ filteredTodos }) => {
  const { todos, setTodos, editingId, setEditingId, setEditingTitle } =
    React.useContext(TodoContext)!;

  const updateMark = (id: number, completed: boolean) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed } : todo,
    );

    setTodos(updatedTodos);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              aria-label="Mark todo"
              checked={todo.completed}
              onChange={() => {
                updateMark(todo.id, !todo.completed);
              }}
            />
          </label>

          {editingId === todo.id ? (
            <NewTodo todo={todo} />
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setEditingId(todo.id);
                setEditingTitle(todo.title);
              }}
            >
              {todo.title}
            </span>
          )}

          {editingId !== todo.id && <RemoveTodo todo={todo} />}
        </div>
      ))}
    </section>
  );
};
