/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TaskContext } from './contexts/TaskContext';
import classNames from 'classnames';

interface ActiveField {
  id: number;
  editText: string;
}

export const App: React.FC = () => {
  const [formText, setFormText] = useState('');
  const [editedText, setEditedText] = useState<ActiveField | null>(null);
  const [activeTask, setActiveTask] = useState<boolean | null>(null);
  const [toggle, setToggle] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const mainInput = useRef<HTMLInputElement>(null);

  const { tasks, setTasks } = useContext(TaskContext);

  useEffect(() => {
    if (formRef.current) {
      const form = formRef.current as HTMLFormElement;

      form.querySelector('input')?.focus();
    }
  }, [editedText]);

  useEffect(() => {
    const taskItems = [...tasks];

    for (const item of taskItems) {
      item.completed = toggle;
    }

    setTasks(taskItems);
  }, [toggle]);

  const editFormText = (newValue: string) => {
    setFormText(newValue);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setTasks(prev => [
      ...prev,
      { id: +new Date(), title: formText.trim(), completed: false },
    ]);

    setFormText('');
  };

  const removeItem = (id: number) => {
    setTasks(prev => prev.filter(x => x.id !== id));
  };

  const checkItem = (id: number) => {
    const index = tasks.findIndex(x => x.id === id);
    const task = tasks.filter(x => x.id === id)[0];

    task.completed = !task.completed;

    setTasks(prev => [
      ...prev.slice(0, index),
      task,
      ...prev.slice(index + 1, tasks.length),
    ]);
  };

  const editItem = (id: number) => {
    const index = tasks.findIndex(x => x.id === id);
    const task = tasks.filter(x => x.id === id)[0];

    if (editedText?.editText.trim() === '') {
      removeItem(id);

      return;
    }

    task.title = editedText?.editText.trim() || '';

    setTasks(prev => [
      ...prev.slice(0, index),
      task,
      ...prev.slice(index + 1, tasks.length),
    ]);
    setEditedText(null);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {tasks.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: !tasks.some(x => !x.completed),
              })}
              data-cy="ToggleAllButton"
              onClick={() => setToggle(t => !t)}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={submitForm}>
            <input
              data-cy="NewTodoField"
              autoFocus
              type="text"
              ref={mainInput}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={formText}
              onChange={e => editFormText(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {tasks
            .filter(x => activeTask === null || x.completed !== activeTask)
            .map(task => {
              return (
                <div
                  key={task.id}
                  data-cy="Todo"
                  className={classNames('todo', { completed: task.completed })}
                  onDoubleClick={() => {
                    setEditedText({ id: task.id, editText: task.title });
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

                  {editedText !== null && editedText.id === task.id ? (
                    <>
                      <form
                        onSubmit={() => editItem(task.id)}
                        ref={formRef}
                        onKeyUp={e => e.key === 'Escape' && setEditedText(null)}
                      >
                        <input
                          data-cy="TodoTitleField"
                          type="text"
                          className="todo__title-field"
                          placeholder="Empty todo will be deleted"
                          value={editedText.editText || ''}
                          onChange={e =>
                            setEditedText({
                              ...editedText,
                              editText: e.target.value,
                            })
                          }
                          onBlur={() => editItem(task.id)}
                        />
                      </form>
                    </>
                  ) : (
                    <>
                      <span data-cy="TodoTitle" className="todo__title">
                        {task.title}
                      </span>

                      <button
                        type="button"
                        className="todo__remove"
                        data-cy="TodoDelete"
                        onClick={() => {
                          removeItem(task.id);
                          mainInput.current?.focus();
                        }}
                      >
                        ×
                      </button>
                    </>
                  )}
                </div>
              );
            })}
        </section>

        {/* Hide the footer if there are no todos */}
        {tasks.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {tasks.filter(x => !x.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
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
              disabled={!tasks.some(x => x.completed)}
              onClick={() => {
                setTasks(prev => [...prev.filter(x => !x.completed)]);
                mainInput.current?.focus();
              }}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
