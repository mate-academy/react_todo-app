import React, { useContext, useMemo, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { FilterParams } from '../../types/FilterParams';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

export const TodoItem = () => {
  const { todos, setTodos, filterButton } = useContext(TodosContext);

  const [editedTodoTitle, setEditedTodoTitle] = useState<string>('');
  const [saveEditedId, setSaveEditedId] = useState<number | null>(null);

  const handleChangeStatus = (todo: Todo) => {
    const newTodoStatus = { ...todo, completed: !todo.completed };

    const changedTodo = todos.map(currentTodo =>
      currentTodo.id === todo.id ? newTodoStatus : currentTodo,
    );

    setTodos(changedTodo);
  };

  const deleteTodo = (todoID: number) => {
    const updateTodos = todos.filter(todo => todo.id !== todoID);

    setTodos(updateTodos);
  };

  const editTodo = (idNumber: number, editedTitle: string) => {
    const updateTodos = todos.map(todo => {
      if (todo.id === idNumber) {
        return { ...todo, title: editedTitle };
      }

      return todo;
    });

    setTodos(updateTodos);
  };

  const saveEditedTitle = (idNumber: number) => {
    const trimTitle = editedTodoTitle.trim();

    if (!trimTitle) {
      deleteTodo(idNumber);
    } else {
      editTodo(idNumber, trimTitle);
    }

    setSaveEditedId(null);
  };

  const handleRemoveButton = (removeId: number) => {
    const removeTodo = todos.filter(todo => todo.id !== removeId);

    setTodos([...removeTodo]);
  };

  const handleDoubleClick = (newId: number, newTitle: string) => {
    setSaveEditedId(newId);
    setEditedTodoTitle(newTitle);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    idNumber: number,
  ) => {
    if (event.key === 'Enter') {
      saveEditedTitle(idNumber);
    } else if (event.key === 'Escape') {
      setSaveEditedId(null);
    }
  };

  const filterTodos = useMemo(() => {
    switch (filterButton) {
      case FilterParams.ALL:
        return todos;

      case FilterParams.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FilterParams.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, filterButton]);

  return (
    <>
      {filterTodos.map(todo => (
        <div
          data-cy="Todo"
          key={todo.id}
          className={classNames('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onClick={() => handleChangeStatus(todo)}
            />
          </label>

          {saveEditedId !== null && saveEditedId === todo.id ? (
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editedTodoTitle}
              onChange={event => setEditedTodoTitle(event.target.value)}
              onBlur={() => saveEditedTitle(todo.id)}
              onKeyUp={event => handleKeyPress(event, todo.id)}
            />
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleRemoveButton(todo.id)}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </>
  );
};
