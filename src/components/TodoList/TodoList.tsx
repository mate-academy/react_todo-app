import classNames from 'classnames';
import { FC, useState } from 'react';
import { MakeChange, Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
  setTodos: MakeChange,
  isCompletedTodo: boolean,
};

export const TodoList: FC<Props> = ({
  todos,
  setTodos,
  isCompletedTodo,
}) => {
  const [changeTitle, setChangeTitle] = useState<number | null>(null);

  const hendlerTogglerAll = () => {
    let allCompletedTodos = todos
      .filter(todo => todo.completed === false);

    if (!allCompletedTodos.length) {
      allCompletedTodos = [...todos];
    }

    setTodos.toggle(allCompletedTodos.map(todo => (
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
        checked={isCompletedTodo}
        onClick={hendlerTogglerAll}
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
              { editing: changeTitle === todo.id },
            )}
          >
            <TodoInfo
              todo={todo}
              setTodos={setTodos}
              setChangeTitle={setChangeTitle}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
