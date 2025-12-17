/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { SelectedTodoContext } from '../../contexts/SelectedTodoContext';
import { TodosContext } from '../../contexts/TodosContext';
import { RefsContext } from '../../contexts/RefsContext';
import { FocusContext } from '../../contexts/FocusContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { selectedTodo, setSelectedTodo } = useContext(SelectedTodoContext);
  const { todos, setTodos } = useContext(TodosContext);
  const { selectedTodoRef } = React.useContext(RefsContext);
  const { handleFocus } = React.useContext(FocusContext);

  const handleChoose = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setSelectedTodo(todo);
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedTodo) {
      const updatedTitle = selectedTodo.title.trim();

      if (updatedTitle === '') {
        // Delete the todo if the title is empty
        setTodos(todos.filter(t => t.id !== selectedTodo.id));
      } else if (updatedTitle !== todo.title) {
        // Update the todo title
        setTodos(
          todos.map(t =>
            t.id === selectedTodo.id ? { ...t, title: updatedTitle } : t,
          ),
        );
      }

      setSelectedTodo(null);
    }
  };

  const updateTodoStatus = (id: number) => {
    setTodos(
      todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
    handleFocus();
  };

  const handleTodoDelete = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
    handleFocus();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed === true,
      })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
          onClick={() => updateTodoStatus(todo.id)}
        />
      </label>
      {selectedTodo?.id === todo.id ? (
        <form
          onSubmit={event => handleChange(event)}
          onKeyDown={event => event.key === 'Escape' && setSelectedTodo(null)}
          onBlur={event => handleChange(event)}
        >
          <input
            ref={selectedTodoRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={selectedTodo.title}
            onChange={event =>
              setSelectedTodo({ ...selectedTodo, title: event.target.value })
            }
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={event => handleChoose(event)}
          >
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleTodoDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
