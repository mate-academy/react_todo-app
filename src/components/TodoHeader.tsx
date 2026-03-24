import { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from './TodosProvider';
import classNames from 'classnames';
import { checkAllTodosCompleted } from '../utils';

export const TodoHeader: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const { todos, submitTodo, setTodos } = useContext(TodosContext);

  function handleTodoSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (todoTitle.trim() === '') {
      return;
    }

    setTodoTitle('');
    submitTodo({
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    });
  }

  function toggleAllTodos() {
    if (todos.every(todo => todo.completed)) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));

      return;
    }

    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  }

  const titleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInput.current) {
      titleInput.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: checkAllTodosCompleted(todos),
          })}
          onClick={() => toggleAllTodos()}
          data-cy="ToggleAllButton"
        />
      )}
      <form onSubmit={event => handleTodoSubmit(event)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setTodoTitle(event.target.value)}
          value={todoTitle}
          ref={titleInput}
        />
      </form>
    </header>
  );
};
