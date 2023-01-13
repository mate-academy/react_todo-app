import { useSearchParams } from 'react-router-dom';
import {
  FormEvent, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { Todo } from '../types/Todo';
import { ToggleAllButton } from './ToggleAllButton';
import { ErrorContext } from '../context/ErrorContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FilterType } from '../types/filterType';

export const TodoContent = () => {
  const [searchParams] = useSearchParams();
  const [todos, setTodos] = useLocalStorage('todos', '[]');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const { setIsEmptyTitleErrorShown } = useContext(ErrorContext);

  const newTodoField = useRef<HTMLInputElement>(null);
  const [clickedIndex, setClickedIndex] = useState(-1);

  useEffect(() => {
    setVisibleTodos(todos);

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClickedIndex(visibleTodos.length);
    const inputValue = newTodoField?.current?.value;

    if (!inputValue?.length) {
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

  const filterType = useMemo(() => {
    return searchParams.get('filter') || FilterType.All;
  }, [searchParams]);

  useEffect(() => {
    switch (filterType) {
      case FilterType.All:
        setVisibleTodos(todos);

        break;

      case FilterType.Completed:
        setVisibleTodos(todos.filter((todo: Todo) => todo.completed));
        break;

      case FilterType.Active:
        setVisibleTodos(todos.filter((todo: Todo) => !todo.completed));
        break;

      default:
        throw new Error('Wrong Type');
    }
  }, [filterType, todos]);

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

      {!!todos.length && (
        <Footer
          visibleTodos={visibleTodos}
          todos={todos}
          setTodos={setTodos}
        />
      )}
    </div>
  );
};
