import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { TodosContext, filterTodos } from './TodosContext';

export const TodoItem: React.FC = () => {
  const { todos, setTodos, filter } = useContext(TodosContext);
  const { incompleteCount } = useContext(TodosContext);

  const [hoveredTodo, setHoveredTodo] = useState<number | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleDoubleClick = (todoId: number, todoTitle: string) => {
    setEditingTodoId(todoId);
    setNewTodoTitle(todoTitle);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleSaveChanges = (todoId: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, title: newTodoTitle } : todo,
    );

    setTodos(updatedTodos);
    setEditingTodoId(null);
  };

  const handleCancelEditing = () => {
    setEditingTodoId(null);
    setNewTodoTitle('');
  };

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    todoId: number,
  ) => {
    if (event.key === 'Enter' && newTodoTitle.trim() !== '') {
      handleSaveChanges(todoId);
    } else if (event.key === 'Escape') {
      handleCancelEditing();
    }
  };

  const handleRemoveTodo = (todoId: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(updatedTodos);
  };

  const handleComplitedTodo = (todoId: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleClearCompleted = () => {
    const justIncomplete = todos.filter(todo => !todo.completed);

    setTodos(justIncomplete);
  };

  return (
    <>
      <ul>
        {filterTodos(todos, filter).map(todo => (
          <li
            key={todo.id}
            className={classNames('panel-block for-test', {
              'has-background-success-light': todo.completed,
              editing: editingTodoId === todo.id,
            })}
            onMouseEnter={() => setHoveredTodo(todo.id)}
            onMouseLeave={() => setHoveredTodo(null)}
          >
            <a
              className={classNames('panel-icon', {
                'has-text-success': todo.completed,
              })}
            >
              <i
                className={classNames('fas', {
                  'fa-check-square': todo.completed,
                  'fa-pen-to-square': !todo.completed,
                })}
                onClick={() => handleComplitedTodo(todo.id)}
              ></i>
            </a>

            {editingTodoId === todo.id ? (
              <input
                className="input1 todo-input"
                type="text"
                value={newTodoTitle}
                onChange={handleInputChange}
                onKeyUp={event => handleKeyUp(event, todo.id)}
                autoFocus
              />
            ) : (
              <>
                <span
                  onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
                >
                  {todo.title}
                </span>
                {hoveredTodo === todo.id && (
                  <a className="remove-icon is-small is-right">
                    <i
                      className="fas fa-remove has-text-danger"
                      onClick={() => handleRemoveTodo(todo.id)}
                    ></i>
                  </a>
                )}
              </>
            )}
          </li>
        ))}
      </ul>

      {todos.length - incompleteCount > 0 && (
        <button
          className="button is-fullwidth is-primary is-light"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </>
  );
};
