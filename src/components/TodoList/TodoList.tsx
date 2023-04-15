import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoChanges } from '../../types/TodoChanges';
import { TodoInfo } from '../TodoInfo';

type Props = {
  someCompletedTodo: boolean,
  todos: Todo[],
  setTodos: TodoChanges,
};

export const TodoList: React.FC<Props> = ({
  someCompletedTodo,
  todos,
  setTodos,
}) => {
  const [changeTitle, setChangeTitle] = useState<number | null>(null);

  const handleToggleAll = () => {
    let allCompleted = todos.filter(todo => todo.completed === false);

    if (!allCompleted.length) {
      allCompleted = [...todos];
    }

    setTodos.toggle(allCompleted.map(todo => (
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
        checked={someCompletedTodo}
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
                setTodos={setTodos}
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
