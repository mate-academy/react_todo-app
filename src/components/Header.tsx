import classNames from 'classnames';
import { addTodo, changeTodo } from '../api/localStorageFunctions';
import { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import { FocusContext } from '../context/FocusContext';

export const Header = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const { inputRef } = useContext(FocusContext);
  const [title, setTitle] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    addTodo(newTodo);
    setTodos(prev => [...prev, newTodo]);

    setTitle('');
  };

  const handleToggle = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const todosToChange = allCompleted
      ? [...todos]
      : todos.filter(todo => !todo.completed);

    const newStatus = allCompleted ? false : true;

    todosToChange.map(todo => changeTodo(todo.id, { completed: newStatus }));
    setTodos(
      todos.map(todo => {
        return { ...todo, completed: newStatus };
      }),
    );
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggle}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
          ref={inputRef}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
