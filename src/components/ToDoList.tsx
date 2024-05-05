import classNames from 'classnames';
import React, { useContext, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import '../styles/todo.scss';
import '../styles/todoapp.scss';
import { CreatedContext } from './ToDoContext';

export const ToDoList: React.FC = () => {
  const { todos, setTodos, filterButton } = useContext(CreatedContext);
  const [edittedToDoTitle, setEdittedToDoTitle] = useState<string>('');
  const [saveEdittedId, setSaveEdittedId] = useState<number | null>(null);

  const changeTodoStatus = (todo: Todo) => {
    const newTodoStatus = { ...todo, completed: !todo.completed };

    const changedTodos = todos.map(currentTodo =>
      currentTodo.id === todo.id ? newTodoStatus : currentTodo,
    );

    setTodos(changedTodos);
  };

  const deleteTodo = (idNumber: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== idNumber);

    setTodos(updatedTodos);
  };

  const editTodo = (idNumber: number, edittedTitle: string) => {
    const updateTodos = todos.map(todo => {
      if (todo.id === idNumber) {
        return { ...todo, title: edittedTitle };
      }

      return todo;
    });

    setTodos(updateTodos);
  };

  const saveEdittedTitle = (idNumber: number) => {
    const trimmedTitle = edittedToDoTitle.trim();

    if (!trimmedTitle) {
      deleteTodo(idNumber);
    } else {
      editTodo(idNumber, trimmedTitle);
    }

    setSaveEdittedId(null);
  };

  const handleRemoveButton = (removedId: number) => {
    const removeTodo = todos.filter(todo => todo.id !== removedId);

    setTodos([...removeTodo]);
  };

  const handleDoubleClick = (newId: number, newTitle: string) => {
    setEdittedToDoTitle(newTitle);
    setSaveEdittedId(newId);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    idNumber: number,
  ) => {
    if (event.key === 'Enter') {
      saveEdittedTitle(idNumber);
    } else if (event.key === 'Escape') {
      setSaveEdittedId(null);
    }
  };

  const filteredTodos = useMemo(() => {
    switch (filterButton) {
      case 'All':
        return todos;
      case 'Completed':
        return todos.filter(todo => todo.completed);
      case 'Active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filterButton]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 &&
        filteredTodos.map(todo => (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => changeTodoStatus(todo)}
              />
            </label>
            {saveEdittedId !== null && saveEdittedId === todo.id ? (
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={edittedToDoTitle}
                onChange={event => setEdittedToDoTitle(event.target.value)}
                onBlur={() => saveEdittedTitle(todo.id)}
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
    </section>
  );
};
