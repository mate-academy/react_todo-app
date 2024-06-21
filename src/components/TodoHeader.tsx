import { useState, useContext, useRef, useEffect } from 'react';
import { LOCAL_STOR_KEY, SelectedContext, TodosContext } from '../store';
import { Todo } from '../types/type';
import cn from 'classnames';

export const TodoHeader: React.FC = () => {
  const { todos, dispatch } = useContext(TodosContext);
  const { selected } = useContext(SelectedContext);
  const [text, setText] = useState('');
  const storedTodos = localStorage.getItem(LOCAL_STOR_KEY);
  const storedTodosArray: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
  const inputRef = useRef<HTMLInputElement>(null);
  const isTodosActive = storedTodosArray.every(todo => todo.completed);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: text.trim(),
      completed: false,
    };

    if (event.key === 'Enter' && text.trim()) {
      event.preventDefault();
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      dispatch({ type: selected.toUpperCase() });
      localStorage.setItem(
        LOCAL_STOR_KEY,
        JSON.stringify([...storedTodosArray, newTodo]),
      );

      setText('');
    }
  };

  const toggleAllButton = () => {
    const updStore: Todo[] = storedTodosArray.map(todo => ({
      ...todo,
      completed: storedTodosArray.every(el => el.completed)
        ? !todo.completed
        : true,
    }));

    dispatch({ type: 'TOGGLE_ALL_BUTTON', payload: updStore });
    localStorage.setItem(LOCAL_STOR_KEY, JSON.stringify(updStore));
  };

  return (
    <header className="todoapp__header">
      {storedTodosArray.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: isTodosActive })}
          data-cy="ToggleAllButton"
          onClick={toggleAllButton}
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={event => setText(event.target.value)}
          onKeyPress={handleKeyPress}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
