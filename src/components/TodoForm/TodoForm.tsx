import { FC, useState } from 'react';
import { Todo } from '../../type';

interface Props {
  completedAllTodos: () => void
  addNewTodo: (event: React.FormEvent, targetValue: string) => void
  visibleTodos: Todo[]
}

export const TodoForm: FC<Props> = ({
  completedAllTodos,
  addNewTodo,
  visibleTodos,
}) => {
  const [targetValue, setTargetValue] = useState('');

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => {
            addNewTodo(event, targetValue);
            setTargetValue('');
          }}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={targetValue}
            onChange={(event) => {
              setTargetValue(event.target.value);
            }}
          />
        </form>
      </header>
      <section className="main">
        <input
          type="checkbox"
          checked={visibleTodos.every(todo => todo.completed)
            && visibleTodos.length !== 0}
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={() => completedAllTodos()}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
      </section>

    </>
  );
};
