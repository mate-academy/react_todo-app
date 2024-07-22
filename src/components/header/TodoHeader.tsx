import { useState } from 'react';
import { useAppContextContainer } from '../../context/AppContext';
import classNames from 'classnames';

const TodoHeader = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const { addNewTodo, todos, inputRef, makeTodosCompleted, makeTodosActive } =
    useAppContextContainer();
  const isActiveButton = todos.every(el => el.completed);

  const handleClickCompliteAll = () => {
    if (!isActiveButton) {
      return makeTodosCompleted();
    }

    return makeTodosActive();
  };

  const handleSubmitAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!!todoTitle.length) {
      setTodoTitle('');
      addNewTodo(todoTitle);
    }

    return;
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTodoTitle(value);
  };

  return (
    <header className="todoapp__header" onSubmit={handleSubmitAddTodo}>
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isActiveButton,
          })}
          data-cy="ToggleAllButton"
          onClick={handleClickCompliteAll}
        />
      )}
      <form>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleChangeTitle}
        />
      </form>
    </header>
  );
};

export default TodoHeader;
