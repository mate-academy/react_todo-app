import classNames from 'classnames';
import {
  createRef, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import {
  deleteTodoFromServer, editTodo,
} from './api';
import { TodosContext } from './TodosProvider';
import { Todo } from './types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEdit, setIsEdit] = useState(false);
  const [todoName, setTodoName] = useState(todo.title);

  const editTodos = (editedTodo: Todo) => {
    const editedTodos = todos.map(prevTodo => {
      if (prevTodo.id === editedTodo.id) {
        return editedTodo;
      }

      return prevTodo;
    });

    setTodos(editedTodos);
  };

  const resetChange = useCallback(() => {
    editTodos(todo);
  }, [todo]);

  const deleteTodo = () => {
    const editedTodos = todos.filter(
      prevTodo => prevTodo.id !== todo.id,
    );

    deleteTodoFromServer(todo.id)
      .catch(resetChange);

    setTodos(editedTodos);
  };

  const editTodoName = () => {
    if (!todoName) {
      deleteTodo();
    } else {
      const editedTodo = { ...todo, title: todoName };

      editTodo(todo.id, todo.completed, todoName)
        .catch(resetChange);

      editTodos(editedTodo);
      setIsEdit(false);
    }
  };

  const input = useMemo(() => createRef<HTMLInputElement>(), []);

  useEffect(() => {
    if (isEdit) {
      input.current?.focus();
    }
  }, [isEdit]);

  return (
    <li
      className={classNames({ completed: todo.completed, editing: isEdit })}
      onDoubleClick={() => {
        setIsEdit(true);
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={event => {
            const editedTodo = { ...todo, completed: event.target.checked };

            editTodo(todo.id, event.target.checked, todoName)
              .catch(resetChange);

            editTodos(editedTodo);
          }}
        />
        <label>{todo.title}</label>
        <button
          aria-label="Save"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
        />
      </div>
      <input
        ref={input}
        type="text"
        className="edit"
        value={todoName}
        onChange={event => {
          setTodoName(event.target.value);
        }}
        onKeyUp={event => {
          if (event.key === 'Escape') {
            setTodoName(todo.title);
            setIsEdit(false);

            return false;
          }

          if (event.key === 'Enter') {
            if (todo.title !== todoName) {
              editTodoName();
            } else {
              setIsEdit(false);
            }
          }

          return false;
        }}
      />
    </li>
  );
};
