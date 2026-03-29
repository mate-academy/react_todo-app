/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useMemo, useState } from 'react';
import { FilterContext, TodosContext } from '../../types/todoContext';
import { Filter } from '../../types/Filter';
import classNames from 'classnames';
import { Todo } from '../../types/todo';

type Props = {
  onAction: () => void;
};

export const TodoList: React.FC<Props> = ({ onAction }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const { filter } = useContext(FilterContext);
  const [editingTodoId, setEditingTodoId] = useState(0);
  const [title, setTitle] = useState('');

  const startEditing = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setTitle(todo.title);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeStatus = (todoId: number) => {
    setTodos(prev => {
      return prev.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });
    });
  };

  const deleteTodo = (todoId: number) => {
    setTodos(prev => {
      return prev.filter(todo => {
        return todo.id !== todoId;
      });
    });
    onAction();
  };

  const updateTodo = (oldTodo: Todo) => {
    event?.preventDefault();

    if (editingTodoId === 0) {
      return;
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle === oldTodo.title) {
      setEditingTodoId(0);

      return;
    }

    if (trimmedTitle.length > 0) {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === oldTodo.id ? { ...todo, title: trimmedTitle } : todo,
        ),
      );
    } else {
      deleteTodo(oldTodo.id);
    }

    setEditingTodoId(0);
    setTitle('');
  };

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => {
          return todo.completed === false;
        });
      case Filter.Completed:
        return todos.filter(todo => {
          return todo.completed === true;
        });
      default:
        return todos;
    }

    return todos;
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        return (
          <div
            data-cy="Todo"
            className={classNames('todo', {
              completed: todo.completed,
            })}
            key={todo.id}
            onDoubleClick={() => {
              startEditing(todo);
            }}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onClick={() => changeStatus(todo.id)}
              />
            </label>

            {editingTodoId !== todo.id ? (
              <>
                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  ×
                </button>
              </>
            ) : (
              <form
                onSubmit={() => {
                  updateTodo(todo);
                }}
              >
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={title}
                  onChange={handleTitle}
                  onKeyUp={event => {
                    if (event.key === 'Escape') {
                      setEditingTodoId(0);
                      setTitle('');
                    }
                  }}
                  onBlur={() => {
                    updateTodo(todo);
                  }}
                  autoFocus
                />
              </form>
            )}
          </div>
        );
      })}
    </section>
  );
};
