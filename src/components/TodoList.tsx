import classNames from 'classnames';
import { FC, useState } from 'react';
import { MakeChanges } from '../types/MakeChanges';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[],
  setTodos: MakeChanges,
  isCompletedTodo: boolean,
};

export const TodoList: FC<Props> = ({
  todos,
  setTodos,
  isCompletedTodo,
}) => {
  const [titleChange, setTitleChange] = useState<number | null>(null);

  const hendlerToggleAll = () => {
    const allCompletedTodos = todos.some(todo => !todo.completed);

    const newTodos = todos.map(todo => (
      { ...todo, completed: allCompletedTodos }
    ));

    setTodos.toggle(newTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isCompletedTodo}
        onClick={hendlerToggleAll}
      />
      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>

      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              { completed: todo.completed },
              { editing: titleChange === todo.id },
            )}
          >
            <TodoInfo
              todo={todo}
              setTodos={setTodos}
              setChangeTitle={setTitleChange}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
