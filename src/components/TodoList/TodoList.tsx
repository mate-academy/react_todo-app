/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { TodoItem } from '../TodoItem';

type Props = {
  visibleTodos: Todo[],
  handlerChecked: (todoId: number) => void,
  handlerDeleteTodo: (todoId: number) => void,
  handlerAllChecked: () => void,
  handlerEditTodo: (title: string, todoId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  handlerChecked,
  handlerDeleteTodo,
  handlerAllChecked,
  handlerEditTodo,
}) => {
  const checkeAll = visibleTodos.every(todo => todo.completed === true);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={checkeAll}
        onClick={handlerAllChecked}
      />
      <label
        htmlFor="toggle-all"
      >
        <span>
          Mark all as complete
        </span>
      </label>
      <ul className="todo-list">
        {visibleTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todoId={todo.id}
            title={todo.title}
            completed={todo.completed}
            handlerChecked={handlerChecked}
            handlerDeleteTodo={handlerDeleteTodo}
            handlerEditTodo={handlerEditTodo}
          />
        ))}
      </ul>
    </section>
  );
};
