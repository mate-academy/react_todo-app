/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-filename-extension */
import classNames from 'classnames';
import React, { useState } from 'react';

let todos = [
  {
    id: 1,
    title: 'Buy a meat',
    completed: true,
  },
  {
    id: 2,
    title: 'Go to a doctor',
    completed: false,
  },
  {
    id: 3,
    title: 'Go to swiming',
    completed: false,
  },
];

const App = () => {
  const [toDo, setToDo] = useState(todos);
  const [textDone, setTextDone] = useState('');
  const [edit, setEdit] = useState(0);
  const [filter, setFilter] = useState('');
  const [editText, setEditText] = useState('');

  todos = toDo;

  return (
    <section
      className="todoapp"
      onClick={(anEvent) => {
        const isEdit = anEvent.currentTarget.classList.contains('edit');

        if (isEdit || !edit) {
          return;
        }

        todos.filter(el => el.id === edit)[0].title = editText;

        setEdit(0);
      }}
    >
      <header className="header">
        <h1>todo</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setToDo(oldDate => [...oldDate, {
              id: +new Date(),
              title: textDone,
              completed: false,
            }]);
            setTextDone('');
          }}
        >
          <input
            required
            value={textDone}
            onChange={(e) => {
              setTextDone(e.target.value);
            }}
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      {toDo.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              readOnly
              checked={toDo.every(todo => todo.completed)}
              onClick={() => {
                setToDo(toDo.map(items => ({
                  ...items,
                  completed: (!toDo.every(todo => todo.completed)),
                })));
              }}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">
              {toDo.filter(task => ((typeof filter === 'boolean')
                ? task.completed === filter
                : true)).map((todo) => {
                const todosIndex = toDo.findIndex(el => el.id === todo.id);

                return (
                  <li
                    key={todo.id}
                    className={classNames(
                      { completed: todo.completed },
                      { editing: (edit === todo.id) },
                    )}
                    onDoubleClick={() => {
                      const rename = toDo
                        .filter(el => el.id === todo.id)[0].title;

                      setEdit(todo.id);
                      setEditText(rename);
                    }}
                  >
                    <div className="view">
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={toDo[todosIndex].completed}
                        readOnly
                        onClick={() => {
                          setToDo(toDo.map((items) => {
                            if (items.id === todo.id) {
                              return {
                                ...items,
                                completed: !toDo[todosIndex].completed,
                              };
                            }

                            return { ...items };
                          }));
                        }}
                      />
                      <label>{todo.title}</label>
                      <button
                        type="button"
                        className="destroy"
                        onClick={() => {
                          setToDo(toDo.filter(el => el.id !== todo.id));
                        }}
                      />
                    </div>
                    <input
                      type="text"
                      className="edit"
                      ref={input => input && input.focus()}
                      value={editText}
                      onChange={theEvent => setEditText(theEvent.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          todos.filter(el => el.id === todo.id)[0]
                            .title = editText;

                          setEdit(0);
                        }
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">
              {toDo.filter(todo => !todo.completed).length}
              {` items left`}
            </span>

            <ul className="filters">
              <button
                type="button"
                onClick={() => setFilter('')}
              >
                <a
                  href="#/"
                  className={classNames({ selected: filter === '' })}
                >
                  All
                </a>
              </button>

              <button
                type="button"
                onClick={() => setFilter(false)}
              >
                <a
                  href="#/active"
                  className={classNames({ selected: filter === false })}
                >
                  Active
                </a>
              </button>

              <button
                onClick={() => setFilter(true)}
                type="button"
              >
                <a
                  href="#/completed"
                  className={classNames({ selected: filter === true })}
                >
                  Completed
                </a>
              </button>
            </ul>

            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                setToDo(toDo.filter(task => !task.completed));
                setFilter('');
              }}
            >
              Clear completed
            </button>
          </footer>
        </>
      )}
    </section>
  );
};

export default App;
