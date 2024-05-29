import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from './context/TodoContext';
import classNames from 'classnames';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [formText, setFormText] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [activeTask, setActiveTask] = useState<boolean | null>(null);
  const newTodoFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoFieldRef.current) {
      newTodoFieldRef.current.focus();
    }
  }, []);

  const removeItem = (id: number) => {
    setTodos(prev => {
      const filteredTodos = prev.filter(todo => todo.id !== id);

      if (newTodoFieldRef.current) {
        newTodoFieldRef.current.focus();
      }

      return filteredTodos;
    });
  };

  const checkItem = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const editItem = (id: number) => {
    const trimmedText = editText.trim();

    if (trimmedText) {
      const updatedTodos = todos.map(todoItem =>
        todoItem.id === id ? { ...todoItem, title: trimmedText } : todoItem,
      );

      setTodos(updatedTodos);
    } else {
      removeItem(id);
    }

    setEditingId(null);
  };

  const handleNewTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formText.trim()) {
      return;
    }

    setTodos(prev => [
      ...prev,
      { id: +new Date(), title: formText.trim(), completed: false },
    ]);
    setFormText('');
  };

  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    setTimeout(() => {
      if (newTodoFieldRef.current) {
        newTodoFieldRef.current.focus();
      }
    }, 0);
  };

  const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormText(e.target.value);
  };

  const clickTodo = () => {
    setTodos(
      todos.map(todoItem => ({
        ...todoItem,
        completed: !todos.every(todo => todo.completed),
      })),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: !todos.some(x => !x.completed),
              })}
              data-cy="ToggleAllButton"
              onClick={clickTodo}
            />
          )}

          <form onSubmit={handleNewTodoSubmit}>
            <input
              ref={newTodoFieldRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={formText}
              onChange={handleNewTodoChange}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todos
            .filter(
              task => activeTask === null || task.completed === !activeTask,
            )
            .map(task => (
              <div
                key={task.id}
                data-cy="Todo"
                className={classNames('todo', { completed: task.completed })}
                onDoubleClick={() => {
                  setEditText(task.title);
                  setEditingId(task.id);
                }}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={task.completed}
                    onChange={() => {}}
                    onClick={() => checkItem(task.id)}
                  />
                </label>
                {editingId !== null && task.id === editingId ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      editItem(task.id);
                    }}
                    ref={formRef}
                    onKeyUp={e => e.key === 'Escape' && setEditingId(null)}
                  >
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onBlur={() => editItem(task.id)}
                      autoFocus
                    />
                  </form>
                ) : (
                  <>
                    <span data-cy="TodoTitle" className="todo__title">
                      {task.title}
                    </span>
                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                      onClick={() => removeItem(task.id)}
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            ))}
        </section>

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: activeTask === null,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setActiveTask(null)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: activeTask === true,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setActiveTask(true)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: activeTask === false,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setActiveTask(false)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleClearCompleted}
              disabled={todos.filter(todo => todo.completed).length === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
