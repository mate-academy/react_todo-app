/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useCallback, useContext, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { Todo } from '../types/Todo';
import { Error } from './Error';
import { Footer } from './Footer';
import { TodosContext } from './TodosContext';

type Props = {
  hasError: boolean,
  errorMessage: string,
  setHasError: (value: boolean) => void,
};

export const TodoList: React.FC<Props> = React.memo((
  { hasError, errorMessage, setHasError },
) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isDoubleClickedId, setIsDoubleClickedId] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const { filter } = useParams();
  let visibleTodos = todos.sort((a, b) => a.id - b.id);

  if (filter) {
    switch (filter) {
      case 'active':
        visibleTodos = todos
          .filter(todo => !todo.completed);
        break;

      case 'completed':
        visibleTodos = todos
          .filter(todo => todo.completed);
        break;

      default:
        break;
    }
  }

  const handlerCheckAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const editedTodos = todos.map(todo => {
        const editedTodo = {
          ...todo,
          completed: event.target.checked,
        };

        return editedTodo;
      });

      setTodos(editedTodos.sort((a, b) => a.id - b.id));
    },
    [todos],
  );

  const deleteTodo = (todoId: number) => {
    const newTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(newTodos);
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>, todo: Todo) => {
    e.preventDefault();

    if (editValue.trim() === '') {
      deleteTodo(todo.id);

      return;
    }

    const newTodo = {
      ...todo,
      title: editValue,
    };

    const newTodos = todos.filter(t => t.id !== todo.id);

    setTodos([...newTodos, newTodo]);
    setIsDoubleClickedId(-1);
  };

  const handleChecked = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>, todo: Todo,
  ) => {
    const editedTodo = {
      ...todo,
      completed: event.currentTarget.checked,
    };
    const newTodos = todos
      .filter(t => t.id !== todo.id);

    setTodos([]);
    setTodos([...newTodos, editedTodo]);
  };

  const removeError = () => {
    setHasError(false);
  };

  return (
    <>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={todos.every(todo => todo.completed)}
          onChange={handlerCheckAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list" data-cy="todoList">
          {visibleTodos.map((todo: Todo) => (
            isDoubleClickedId === todo.id
              ? (
                <form
                  onSubmit={(e) => {
                    handleEdit(e, todo);
                  }}
                >
                  <input
                    className="edit"
                    defaultValue={todo.title}
                    placeholder="Empty TODO will be deleted"
                    onChange={(e) => {
                      setEditValue(e.currentTarget.value);
                    }}
                    onBlur={() => {
                      setIsDoubleClickedId(-1);
                    }}
                    onKeyUp={event => {
                      if (event.key === 'Escape') {
                        setIsDoubleClickedId(-1);
                      }
                    }}
                  />
                </form>
              )
              : (
                <li
                  className={classNames({ completed: todo.completed })}
                  key={todo.id}
                  onDoubleClick={() => {
                    setIsDoubleClickedId(todo.id);
                  }}
                >
                  <div className="view">
                    <input
                      type="checkbox"
                      className="toggle"
                      id="toggle-completed"
                      checked={todo.completed || undefined}
                      onClick={(e) => {
                        handleChecked(e, todo);
                      }}
                    />
                    <label htmlFor="toggleview">
                      {todo.title}
                    </label>
                    <button
                      type="button"
                      className="destroy"
                      data-cy="deleteTodo"
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    />
                  </div>
                  <input type="text" className="edit" />
                </li>
              )
          ))}
        </ul>
      </section>
      <Footer />

      {hasError
        && <Error errorMessage={errorMessage} removeError={removeError} />}
    </>
  );
});
