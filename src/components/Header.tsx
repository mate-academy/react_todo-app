import { useContext } from 'react';
import { TodoForm } from './Form';
import cn from 'classnames';
import { TodoContext } from './TodoContext';
import { Todo } from '../types/Todo';

type HeaderProps = {
  inputRef: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<HeaderProps> = ({ inputRef }) => {
  const { todos, setTodos } = useContext(TodoContext);

  const completedTodos = todos.reduce(
    (count, todo) => count + (todo.completed ? 1 : 0),
    0,
  );

  const handleToggleAll = () => {
    let toggledTodos: Todo[] = [];

    if (todos.length === completedTodos || completedTodos === 0) {
      toggledTodos = todos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      }));
    } else {
      toggledTodos = todos
        .filter(todo => !todo.completed)
        .map(todo => ({
          ...todo,
          completed: true,
        }));
    }

    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        const updatedTodos = toggledTodos.find(t => t.id === todo.id);

        return updatedTodos ? updatedTodos : todo;
      });
    });
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.length === completedTodos,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <TodoForm inputRef={inputRef} />
    </header>
  );
};
