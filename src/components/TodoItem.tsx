import classNames from 'classnames';
import { useState, useContext } from 'react';
import { ToDo } from '../types/todo';
import { DispatchContex, TodosContext } from './TodosContext';

type Props = {
  item: ToDo,
};

export const TodoItem: React.FC<Props> = ({
  item: {
    id,
    title,
    completed = false,
  },
}) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useContext(DispatchContex);
  const { todos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState(title);

  const handleChecked = () => {
    const todosCompleted = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: true,
        };
      }

      return todo;
    });

    const todosNonCompleted = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: false,
        };
      }

      return todo;
    });

    if (!completed) {
      dispatch({ type: 'completed', payload: todosCompleted });
    } else {
      dispatch({ type: 'nonCompleted', payload: todosNonCompleted });
    }
  };

  const removeToDo = () => {
    const todosRemove = todos.filter(todo => todo.id !== id);

    dispatch({ type: 'remove', payload: todosRemove });
  };

  const editTitle = (event: React.FormEvent) => {
    event.preventDefault();
    let editTodos = todos;

    if (newTitle.length > 0) {
      editTodos = todos
        .map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              title: newTitle,
            };
          }

          return todo;
        });
    } else {
      editTodos = todos.filter(todo => todo.id !== id);
    }

    dispatch({ type: 'edit', payload: editTodos });
    setEditing(false);
  };

  return (
    <>
      <li className={classNames({
        completed,
        editing,
      })}
      >
        {editing
          ? (
            <form onSubmit={editTitle} method="POST">
              <input
                type="text"
                className="edit"
                value={newTitle}
                onChange={event => setNewTitle(event.target.value)}
                onBlur={editTitle}
                onKeyUp={
                  event => (event.key === 'Escape') && setNewTitle(title)
                }
              />
            </form>
          ) : (
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id={`${id}`}
                checked={completed}
                onChange={handleChecked}
              />
              <label
                onDoubleClick={() => {
                  return setEditing(true);
                }}
              >
                {title}
              </label>
              <button
                aria-label="deleteTodo"
                type="button"
                className="destroy"
                data-cy="deleteTodo"
                onClick={removeToDo}
              />
            </div>
          )}
      </li>
    </>
  );
};
