import cn from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { DispatchContext, StateContext } from '../GlobalProvider';

export const Header: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const isAllTodosCompleted = todos.every(todo => todo.completed);
  const isAnyTodos = !!todos.length;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      userId: 3044,
      id: +Date.now(),
      title: todoTitle.trim(),
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });
    setTodoTitle('');
  };

  const onToggleAllCompleted = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    todos.forEach(todo => {
      if (todo.completed !== !areAllCompleted) {
        dispatch({
          type: 'updateTodoStatus',
          payload: { id: todo.id, complete: !todo.completed },
        });
      }
    });
  };

  return (
    <header className="todoapp__header">
      {isAnyTodos && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: isAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={onToggleAllCompleted}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
          ref={inputRef}
          autoFocus
        />
      </form>
    </header>
  );
};
