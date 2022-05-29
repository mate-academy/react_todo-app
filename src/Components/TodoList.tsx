/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { TodoItem } from './TodoItem';

type Props = {
  todoList: Todo[];
  destroyHandler: (index: number) => void,
  toggleClass: (index: number) => void,
  changeTodo: (todoValue: string, index: number) => void,
  toggleAll: () => void,
};

export const TodoList: React.FC<Props> = ({
  todoList,
  destroyHandler,
  toggleClass,
  changeTodo,
  toggleAll,
}) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
      />
      <label
        onClick={toggleAll}
        htmlFor="toggle-all"
      >
        Mark all as complete

      </label>
      <ul className="todo-list" data-cy="todoList">
        {todoList.map((todo, index) => (
          <TodoItem
            todo={todo}
            index={index}
            destroyHandler={destroyHandler}
            toggleClass={toggleClass}
            changeTodo={changeTodo}
          />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
