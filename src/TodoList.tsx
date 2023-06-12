/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from './types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  deleteTodo: (todoId: number) => void,
  toggleCompleteTodos: (todoId: number, completed: boolean) => void,
  changeTodoTitle: (todoId: number, newTitle: string) => void,
  toggleAllCompleteTodos: () => void,
  isAllCompleted: boolean,
};

export const TodoList: React.FC<Props> = ({
  todos, deleteTodo, toggleCompleteTodos,
  changeTodoTitle,
  toggleAllCompleteTodos, isAllCompleted,
}) => {
  return (
    <section className="main">

      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isAllCompleted}
        onChange={toggleAllCompleteTodos}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleCompleteTodos={toggleCompleteTodos}
            changeTodoTitle={changeTodoTitle}
          />
        ))}

      </ul>
    </section>
  );
};
