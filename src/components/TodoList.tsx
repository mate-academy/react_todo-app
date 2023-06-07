import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  removeTodo: (id: number) => void,
  changeTodo: (todoId: number, changingPart: Partial<Todo>) => void;
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    removeTodo,
    changeTodo,
  },
) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>
      {' '}
      <ul className="todo-list" data-cy="todoList">
        {todos.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              removeTodo={removeTodo}
              changeTodo={changeTodo}
            />
          );
        })}

      </ul>
    </section>
  );
};
