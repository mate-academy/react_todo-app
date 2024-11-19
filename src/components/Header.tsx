import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Form } from './Form';
import { TodosStateContext } from '../providers/TodosProvider';
import classNames from 'classnames';

export const Header = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const { state, dispatch } = useContext(TodosStateContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const isNotAllCompleted = useMemo(
    () =>
      state.todos.some(todo => todo.completed) &&
      state.todos.some(todo => !todo.completed),
    [state.todos],
  );

  const isAllCompleted = state.todos.every(todo => todo.completed);

  const onChangeTitleHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(e.target.value);
    },
    [],
  );

  const addTodo = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (todoTitle.trim().length) {
        dispatch({ type: 'add', payload: { title: todoTitle.trim() } });
        setTodoTitle('');
      }
    },
    [dispatch, todoTitle],
  );

  const toggleAll = () => {
    if (isNotAllCompleted) {
      state.todos.forEach(todo => {
        if (!todo.completed) {
          dispatch({
            type: 'update',
            payload: { ...todo, completed: !todo.completed },
          });
        }
      });
    } else {
      state.todos.forEach(todo =>
        dispatch({
          type: 'update',
          payload: { ...todo, completed: !todo.completed },
        }),
      );
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [state]);

  return (
    <header className="todoapp__header">
      {state.todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <Form
        className="todoapp__new-todo"
        onSubmit={addTodo}
        value={todoTitle}
        onChange={onChangeTitleHandler}
        inputRef={inputRef}
      />
    </header>
  );
};
