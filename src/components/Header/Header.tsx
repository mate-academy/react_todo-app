import { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../../store/store';

import cn from 'classnames';
import { Todo } from '../../Types/Todo';

const Header = () => {
  const [title, setTitle] = useState('');
  const { isFocus, todos, selectedTodo } = useContext(StateContext);

  const dispatch = useContext(DispatchContext);

  const allCompleted = todos.every(todo => todo.completed);

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocus || !selectedTodo) {
      input.current?.focus();
    }
  }, [isFocus, selectedTodo]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      dispatch({ type: 'load-todos', payload: JSON.parse(storedTodos) });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      title: title.trim(),
      id: +new Date(),
      completed: false,
    };

    dispatch({ type: 'add-todo', payload: newTodo });

    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: allCompleted === true,
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggle-all' })}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          ref={input}
          value={title}
          onChange={e => setTitle(e.target.value)}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

export default Header;
