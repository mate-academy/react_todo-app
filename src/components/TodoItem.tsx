import classNames from 'classnames';
import React, { useState } from 'react';
import { Todos } from '../App';

type Props = {
  // sortTodos: Todos[];
  // setSortTodos: (todos: Todos[]) => void;
  todos: Todos[];
  setTodos: (todos: Todos[]) => void;
  incompleteCount: number;
};

export const TodoItem: React.FC<Props> = ({
  // setSortTodos,
  // sortTodos,
  todos,
  setTodos,
  incompleteCount,
}) => {
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
    // setSortTodos(updatedTodos);
  };

  const handleComplitedTodo = (todoId: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
    // setSortTodos(updatedTodos);
  };

  const handleClearCompleted = () => {
    const justIncomplete = todos.filter(todo => !todo.completed);

    setTodos(justIncomplete);
    // setSortTodos(justIncomplete);
  };

  return (
    <>
      <ul>
        {/* {sortTodos.map(todo => ( */}
        {todos.map(todo => (
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
