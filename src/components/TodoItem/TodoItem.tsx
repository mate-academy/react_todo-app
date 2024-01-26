import {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { TodosContext } from '../../context/TodosContext';

type Props = {
  todoProps: Todo;
};

export const TodoItem: React.FC<Props> = ({ todoProps }) => {
  const { todos, setTodo } = useContext(TodosContext);
  const [editing, setEditing] = useState<number | null>(null);
  const [onChange, setOnChange] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todoProps.id === editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing, todoProps.id]);

  const handleDeleteTodo = (id: number) => {
    const newTodo = [...todos].filter((todo: Todo) => (
      todo.id !== id
    ));

    setTodo([...newTodo]);
  };

  const handleCheckboxClick = (id: number) => {
    const todoIndex = todos.findIndex((todo: Todo) => todo.id === id);

    if (todoIndex !== -1) {
      const newTodos = [...todos];

      newTodos[todoIndex] = {
        ...newTodos[todoIndex],
        completed: !newTodos[todoIndex].completed,
      };
      setTodo(newTodos);
    }
  };

  const onDoubleClick = (id: number) => {
    const selectedTodo = todos.find((todo: Todo) => todo.id === id);

    if (selectedTodo) {
      setOnChange(selectedTodo.title);
      setEditing(id);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = event.target.value;

    newValue = newValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setOnChange(newValue);
  };

  const handleSubmit = (event: React.FormEvent, id: number) => {
    event.preventDefault();

    if (!onChange.trim()) {
      const newTodos = todos.filter((todo: Todo) => todo.id !== editing);

      setTodo([...newTodos]);

      setOnChange('');
      setEditing(null);

      return;
    }

    const newTodo = todos.map((todo: Todo) => {
      if (todo.id === id && todo.id === editing) {
        setEditing(null);

        return {
          ...todo,
          title: onChange,
        };
      }

      return todo;
    });

    setTodo([...newTodo]);

    setOnChange('');
  };

  const handleKeyUp = (event: React.KeyboardEvent, id: number) => {
    if (event.key === 'Escape') {
      const newTodo = todos.map((todo: Todo) => {
        if (todo.id === id && todo.id === editing) {
          setEditing(null);

          return {
            ...todo,
          };
        }

        return { ...todo };
      });

      setTodo([...newTodo]);
    }
  };

  return (
    <li
      onDoubleClick={() => onDoubleClick(todoProps.id)}
      className={classNames({
        editing: todoProps.id === editing,
        completed: todoProps.completed,
      })}
    >
      <div
        className="view"
      >
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todoProps.id}`}
          checked={todoProps.completed}
          onChange={() => handleCheckboxClick(todoProps.id)}
        />
        <label htmlFor="toggle-view">{todoProps.title}</label>
        <button
          onClick={() => handleDeleteTodo(todoProps.id)}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="handleDeleteTodo"
        />
      </div>
      <form
        onSubmit={(event) => handleSubmit(event, todoProps.id)}
      >
        <input
          type="text"
          className="edit"
          value={onChange}
          onChange={handleOnChange}
          onKeyUp={(event) => handleKeyUp(event, todoProps.id)}
          onBlur={(event) => handleSubmit(event, todoProps.id)}
          ref={inputRef}
        />
      </form>
    </li>
  );
};
