import classNames from 'classnames';
import { useTodo } from './TodoContext';
import { Todo } from '../types/Todo';

export const TodoHeader: React.FC = () => {
  const { todos, inputRef, title, setTitle, setTodos, setErrorMessage } =
    useTodo();
  const areAllTodosCompleted =
    todos.length > 0 ? todos.every(todo => todo.completed) : false;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setErrorMessage('');
    setTitle(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Input cant be empty');

      return;
    }

    const maxTodoId = Math.max(0, ...todos.map(todo => todo.id));
    const newTodo: Todo = {
      id: maxTodoId + 1,
      title: title.trim(),
      completed: false,
    };

    setTodos(current => [...current, newTodo]);
    setTitle('');
  };

  const handleChangeAll = () => {
    setTodos(current => {
      const shouldCompleteAll = current.some(todo => !todo.completed);

      return current.map(todo => ({
        ...todo,
        completed: shouldCompleteAll,
      }));
    });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllTodosCompleted,
          })}
          onClick={handleChangeAll}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          value={title}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
