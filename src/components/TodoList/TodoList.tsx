import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  hasCompletedTodo: boolean,
  todos: Todo[],
  toggleTodo: (todos: Todo[]) => void,
  removeTodo: (todoIds: number[]) => void,
};

export const TodoList: React.FC<Props> = ({
  hasCompletedTodo,
  todos,
  toggleTodo,
  removeTodo,
}) => {
  const [changeTitle, setChangeTitle] = useState<number | null>(null);

  const handleToggleAll = () => {
    let allCompleted = todos.filter(todo => !todo.completed);

    if (!allCompleted.length) {
      allCompleted = [...todos];
    }

    toggleTodo(allCompleted.map(todo => (
      { ...todo, completed: !todo.completed }
    )));
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={hasCompletedTodo}
        onClick={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => {
          const { id, completed } = todo;

          return (
            <li
              key={id}
              className={classNames(
                { completed },
                { editing: changeTitle === id },
              )}
            >
              <TodoInfo
                toggleTodo={toggleTodo}
                removeTodo={removeTodo}
                todo={todo}
                setChangeTitle={setChangeTitle}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
