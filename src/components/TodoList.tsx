/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { SortBy, Todo } from '../types';

type Props = {
  todos: Todo[],
  handleUpdateCheckTodo: (value: number) => void,
  handleDeleteTodo: (value: number) => void,
  sortBy: SortBy,
  handleSetTodos: (newTodos: Todo[]) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleUpdateCheckTodo,
  handleDeleteTodo,
  sortBy,
  handleSetTodos,
}) => {
  const [isTodoEdit, setIsTodoEdit] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [oldTitle, setOldTitle] = useState<string>('');
  const filteredTodos = useMemo(() => {
    if (sortBy === SortBy.all) {
      return todos;
    }

    const isCompleted = sortBy === SortBy.completed;

    return todos.filter(({ completed }) => completed === isCompleted);
  }, [sortBy, todos]);

  const TodoClass = (todoEditing: Todo) => cn(
    { completed: todoEditing.completed },
    { editing: isTodoEdit === todoEditing.id },
  );

  const editTodo = (newTodos: Todo[]) => {
    handleSetTodos(newTodos);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current && isTodoEdit !== null) {
      inputRef.current.focus();
    }
  }, [isTodoEdit]);

  const handleKeyDown = (
    e: { key: string; }, todoId:number, todoTitle:string,
  ) => {
    if (e.key === 'Enter') {
      let updatedTodo: Todo | undefined = todos.find(
        todo => todo.id === todoId,
      );

      if (todoTitle === '' && updatedTodo) {
        handleDeleteTodo(todoId);
      } else if (updatedTodo && todoTitle !== updatedTodo.title) {
        updatedTodo = { ...updatedTodo, title: todoTitle };

        editTodo(todos.map(todo => (todo.id === todoId
          ? { ...todo, title: todoTitle } : { ...todo })));

        setIsTodoEdit(null);
      } else {
        setIsTodoEdit(null);
      }
    }

    if (e.key === 'Escape') {
      setInputValue(oldTitle);
      setIsTodoEdit(null);
      setOldTitle('');
    }
  };

  return (
    <>
      {filteredTodos.map(todo => (
        <li
          className={TodoClass(todo)}
          key={todo.id}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onClick={() => {
                handleUpdateCheckTodo(todo.id);
              }}
            />
            <label
              onDoubleClick={() => {
                setIsTodoEdit(todo.id);
                setInputValue(todo.title);
                setOldTitle(todo.title);
              }}
            >
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => {
                handleDeleteTodo(todo.id);
              }}
            />
          </div>
          <input
            type="text"
            ref={todo.id === isTodoEdit ? inputRef : null}
            className="edit"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e, todo.id, inputValue);
            }}
            onBlur={() => {
              handleKeyDown({ key: 'Enter' }, todo.id, inputValue);
            }}
          />
        </li>
      ))}
    </>
  );
};
