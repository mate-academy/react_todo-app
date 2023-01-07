import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { ToggleAllButton } from '../ToggleAllButton';

type Props = {
  todos: Todo[];
  completedTodos: Todo[];
  toggleAll: () => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (newTitle: string, id: number) => void;
};

export const TodoList = React.memo<Props>(({
  todos,
  completedTodos,
  toggleAll,
  removeTodo,
  toggleTodo,
  updateTodo,
}) => {
  const [updatedTodoId, setUpdatedTodoId] = useState<number | null>(null);

  return (
    <section className="main">
      <ToggleAllButton
        todos={todos}
        completedTodos={completedTodos}
        toggleAll={toggleAll}
      />

      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => {
          const { id, completed } = todo;

          return (
            <li
              key={id}
              className={classNames(
                { editing: updatedTodoId === id },
                { completed },
              )}
            >
              <TodoItem
                todo={todo}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
                updateTodo={updateTodo}
                updatedTodoId={updatedTodoId}
                setUpdatedTodoId={setUpdatedTodoId}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
});
