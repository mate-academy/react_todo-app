import {
  FormEvent, useContext, useEffect, useRef, useState,
} from 'react';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { Todo } from '../types/Todo';
import { ToggleAllButton } from './ToggleAllButton';
import { ErrorContext } from '../context/ErrorContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TodoContent = () => {
  const [todos, setTodos] = useLocalStorage('todos', '[]');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const {
    setIsEmptyTitleErrorShown,
  } = useContext(ErrorContext);

  const newTodoField = useRef<HTMLInputElement>(null);
  const [clickedIndex, setClickedIndex] = useState(-1);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClickedIndex(visibleTodos.length);
    const inputValue = newTodoField?.current?.value;

    if (inputValue?.length === 0) {
      setIsEmptyTitleErrorShown(true);

      return;
    }

    const lastTodoId = todos[todos.length - 1]?.id;

    const newTodoObj = {
      title: newTodoField.current?.value.trim() || '',
      completed: false,
      id: lastTodoId + 1 || 0,
    };

    setTodos((prev: Todo[]) => [...prev, newTodoObj]);

    if (newTodoField.current) {
      newTodoField.current.value = '';
    }
  }

  return (
    <div className="todoapp__content">
      <header className="todoapp__header">
        {!!visibleTodos.length && (
          <ToggleAllButton
            setTodos={setTodos}
            visibleTodos={visibleTodos}
          />
        )}

        <form
          onSubmit={onSubmitHandler}
        >
          <input
            data-cy="NewTodoField"
            type="text"
            ref={newTodoField}
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <TodoList
        visibleTodos={visibleTodos}
        setVisibleTodos={setVisibleTodos}
        clickedIndex={clickedIndex}
        setClickedIndex={setClickedIndex}
        setTodos={setTodos}
        todos={todos}
      />

      <Footer
        setVisibleTodos={setVisibleTodos}
        visibleTodos={visibleTodos}
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
};
