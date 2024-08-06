import React, { useContext, useRef, useState } from 'react';
import { TodosContext } from './TodosContext';
import { Todo } from '../Types/Todo';
import cn from 'classnames';
import { Filter } from '../Types/Filter';

interface Props {
  input: React.RefObject<HTMLInputElement>;
  filter: Filter;
}

export const TodoList: React.FC<Props> = ({ input, filter }) => {
  const [todoBeingEdited, setTodoBeingEdited] = useState<null | number>(null);
  const [newTitle, setNewTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);
  const editField = useRef<HTMLInputElement>(null);

  let displayedTodos = [...todos];

  switch (filter) {
    case Filter.completed:
      displayedTodos = displayedTodos.filter(todo => todo.completed);
      break;

    case Filter.active:
      displayedTodos = displayedTodos.filter(todo => !todo.completed);
      break;
  }

  const handleCheck = (todoToCheck: Todo, todoIndex: number) => {
    setTodos([
      ...todos.slice(0, todoIndex),
      { ...todoToCheck, completed: !todoToCheck.completed },
      ...todos.slice(todoIndex + 1),
    ]);

    input.current?.focus();
  };

  const handleDelete = (todoToRemove: Todo) => {
    setTodos(todos.filter(item => item.id !== todoToRemove.id));
    input.current?.focus();
  };

  const handleDoubleClick = (todo: Todo) => {
    setTodoBeingEdited(todo.id);
    setNewTitle(todo.title);

    setTimeout(() => {
      editField.current?.focus();
    }, 0);
  };

  const handleEditSubmit = (
    e: React.FocusEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>,
    editedTodo: Todo,
    editedTodoIndex: number,
  ) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      setTodos(todos.filter(item => item.id !== editedTodo.id));

      return;
    }

    setTodos([
      ...todos.slice(0, editedTodoIndex),
      { ...editedTodo, title: newTitle.trim() },
      ...todos.slice(editedTodoIndex + 1),
    ]);

    setTodoBeingEdited(null);
    setNewTitle('');
  };

  const handleEscPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTodoBeingEdited(null);
      setNewTitle('');
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {displayedTodos.map((todo, todoIndex) => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
          key={todo.id}
          onDoubleClick={() => handleDoubleClick(todo)}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleCheck(todo, todoIndex)}
            />
          </label>

          {todo.id === todoBeingEdited ? (
            <form onSubmit={e => handleEditSubmit(e, todo, todoIndex)}>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                onBlur={e => handleEditSubmit(e, todo, todoIndex)}
                onKeyUp={e => handleEscPress(e)}
                ref={editField}
              />
            </form>
          ) : (
            <>
              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDelete(todo)}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};
