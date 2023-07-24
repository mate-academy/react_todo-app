/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../types/todo';
import { TodoUpdateContext, TodosContext } from '../store/TodosContext';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  onTodoSelect: (todo: Todo | null) => void;
  newValue: string;
  onValueEdit: (newValue: string) => void;
  onSaveNewTitle: () => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  onTodoSelect,
  newValue,
  onValueEdit,
  onSaveNewTitle,
}) => {
  const { deleteTodo, updateTodo } = useContext(TodoUpdateContext);
  const todos = useContext(TodosContext);

  const onTodoToggle = (todoId: number) => {
    const foundTodo = todos.find(
      currentTodo => currentTodo.id === todoId,
    );

    if (foundTodo) {
      updateTodo({
        ...foundTodo,
        completed: !foundTodo.completed,
      });
    }
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: selectedTodo?.id === todo.id,
      })}
    >
      {selectedTodo?.id === todo.id ? (
        <input
          type="text"
          className="edit"
          value={newValue}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={event => onValueEdit(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              onSaveNewTitle();
            }
          }}
          onKeyUp={event => {
            if (event.key === 'Escape') {
              onTodoSelect(null);
            }
          }}
          onBlur={onSaveNewTitle}
        />
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={() => onTodoToggle(todo.id)}
          />

          <label
            onDoubleClick={() => {
              onTodoSelect(todo);
              onValueEdit(todo.title);
            }}
          >
            {todo.title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      )}
    </li>
  );
};
