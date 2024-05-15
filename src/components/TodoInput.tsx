import { ChangeEvent, useContext, useState } from 'react';
import { TodoContext } from './TodoContext';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

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

export const TodoInput: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const handleCompletedAll = () => {
    const isCompleted = todos.every(todo => todo.completed);

    const newTodos = todos.map(todo => ({
      ...todo,
      completed: !isCompleted,
    }));

    setTodos(newTodos);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && title.trim() !== '') {
      const newTodo = {
        completed: false,
        id: getNewId(todos),
        title: title.trim(),
      };

      setTitle('');

      setTodos([...todos, newTodo]);
    }
  };

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
          onKeyUp={event => handleKeyUp(event)}
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
