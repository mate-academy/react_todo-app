import { useState } from 'react';
import { useAppContextContainer } from '../../context/AppContext';
import classNames from 'classnames';

const TodoHeader = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const { todos, setTodos, inputRef } = useAppContextContainer();
  const isActiveButton = todos.every(el => el.completed);

  const handleClickCompliteAll = () => {
    if (!isActiveButton) {
      return setTodos(prev => prev.map(el => ({ ...el, completed: true })));
    }

    return setTodos(prev =>
      prev.map(el => ({ ...el, completed: !el.completed })),
    );
  };

  const handleSubmitAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!!todoTitle.length) {
      setTodoTitle('');
      setTodos(prev => [
        ...prev,
        {
          id: +new Date(),
          title: todoTitle.trim(),
          completed: false,
          isEdited: false,
        },
      ]);
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
