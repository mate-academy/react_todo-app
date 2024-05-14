import { ChangeEvent, useContext, useState } from 'react';
import { TodoContext } from './TodoContext';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {};

function getNewId(todos: Todo[]) {
  if (todos.length === 0) {
    return 1;
  }

  let maxId = 0;

  for (let i = 0; i < todos.length; i++) {
    if (maxId <= todos[i].id) {
      maxId = todos[i].id;
    }
  }

  return maxId + 1;
}

export const TodoInput: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(true);

  const handleCompletedAll = () => {
    const isCompleted = todos.every(todo => todo.completed);

    if (!isCompleted) {
      const newTodos = todos.map(todo => ({
        ...todo,
        completed: true,
      }));

      setTodos(newTodos);
    } else {
      const newTodos = todos.map(todo => ({
        ...todo,
        completed: false,
      }));

      setTodos(newTodos);
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const eventListener = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && title.trim() !== '') {
      const newTodo = {
        completed: false,
        id: getNewId(todos),
        title: title,
      };

      setTitle('');

      setTodos([...todos, newTodo]);
    }
  };

  if (isFocused) {
    document.addEventListener('keyup', eventListener);
  } else {
    document.removeEventListener('keyup', eventListener);
  }

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed) && todos.length !== 0,
          })}
          data-cy="ToggleAllButton"
          onClick={handleCompletedAll}
        />
      )}
      <form onSubmit={event => event.preventDefault()}>
        <input
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          autoFocus
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          value={title}
          onChange={handleTitleChange}
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
