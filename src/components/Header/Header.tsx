import cn from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../../TodosContext';

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  mainInput: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({ query, setQuery, mainInput }) => {
  const context = useContext(TodosContext);
  const { todos, saveTodos } = context;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const normalizedTodo = query.trim();

    if (!normalizedTodo) {
      return;
    }

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newTodos = [
      ...todos,
      { id: maxId + 1, userId: 1, title: normalizedTodo, completed: false },
    ];

    saveTodos(newTodos);
    setQuery('');
  }

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            const allCompleted = todos.every(td => td.completed);

            const newCompleted = !allCompleted;
            const updatedTodos = todos.map(todo => ({
              ...todo,
              completed: newCompleted,
            }));

            saveTodos(updatedTodos);
          }}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={mainInput}
        />
      </form>
    </header>
  );
};
