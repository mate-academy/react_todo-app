/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useState } from 'react';
import '../styles/todo-list.scss';
import { Todo, TodoFilterStatus, TodosContext } from './TodosProvider';
import classNames from 'classnames';

export const TodoList = () => {
  const { todos, todoFilterStatus, deleteTodo, updateTodo } =
    useContext(TodosContext);
  const [selectedTodoId, setSelectedTodoId] = useState<Todo['id'] | null>(null);
  const [todoTitleInput, setTodoTitleInput] = useState('');

  const visibleTodos = todos.filter(todo => {
    switch (todoFilterStatus) {
      case TodoFilterStatus.All:
        return true;
      case TodoFilterStatus.Active:
        return !todo.completed;
      case TodoFilterStatus.Completed:
        return todo.completed;
    }
  });

  function handleTitleUpdate(
    todoId: Todo['id'],
    event?: React.FormEvent<HTMLFormElement>,
  ) {
    event?.preventDefault();
    if (todoTitleInput.trim() === '') {
      deleteTodo(todoId);

      return;
    }

    updateTodo(todoId, {
      title: todoTitleInput.trim(),
    });
    setSelectedTodoId(null);
  }

  function handleTodoSelect(todo: Todo) {
    setSelectedTodoId(todo.id);
    setTodoTitleInput(todo.title);
  }

  function handleEscapeClick(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setSelectedTodoId(null);
    }
  }

  function handleUnfocusTodoTitle(todoId: Todo['id']) {
    setSelectedTodoId(null);
    handleTitleUpdate(todoId);
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => {
                updateTodo(todo.id, { completed: !todo.completed });
              }}
            />
          </label>

          {selectedTodoId !== todo.id && (
            <>
              <span
                onDoubleClick={() => handleTodoSelect(todo)}
                data-cy="TodoTitle"
                className="todo__title"
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </button>
            </>
          )}

          {selectedTodoId === todo.id && (
            <form onSubmit={event => handleTitleUpdate(todo.id, event)}>
              <input
                autoFocus
                onKeyUp={event => handleEscapeClick(event)}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                onChange={event => setTodoTitleInput(event.target.value)}
                value={todoTitleInput}
                onBlur={() => handleUnfocusTodoTitle(todo.id)}
              />
            </form>
          )}
        </div>
      ))}
    </section>
  );
};
