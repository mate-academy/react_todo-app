import { useState, useContext } from 'react';
import classNames from 'classnames';
import { DispatchContext, TodosContext } from '../TodosContext';
import { Todo } from '../types/Todo';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isHasError, setIsHasError] = useState(false);
  const todos = useContext(TodosContext);
  const onSubmit = useContext(DispatchContext);
  const handleChandge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsHasError(false);
  };

  function getNewTodoID(todosArray: Todo[]) {
    const maxId = Math.max(...todosArray.map(todo => todo.id)) + 1;

    return maxId;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsHasError(!title);

    if (title) {
      onSubmit({
        type: 'add',
        payload: {
          id: getNewTodoID(todos),
          title,
          completed: false,
        },
      });
      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          type="text"
          data-cy="createTodo"
          className={classNames(isHasError
            ? 'new-todo error'
            : 'new-todo')}
          placeholder={classNames(isHasError
            ? 'Please add a text'
            : 'What needs to be done?')}
          onChange={handleChandge}
          value={title}
        />
      </form>
    </header>
  );
};
