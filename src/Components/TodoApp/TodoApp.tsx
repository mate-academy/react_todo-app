import React, { useContext, useState } from 'react';
import { TodosContext } from '../../Context/TodosContext';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoApp: React.FC = () => {
  const {
    todos,
    addTodo,
    clearedDone,
    todoComplete,
  } = useContext(TodosContext);
  const [text, setText] = useState<string>('');

  const howLeft = todos.filter(todo => todo.completed === false).length;

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (text.trim()) {
      addTodo(text);
    }

    setText('');
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          key={0}
          action="../../api/todos"
          method="POST"
          onSubmit={handleAdd}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </form>
      </header>

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={() => todoComplete()}
              checked={howLeft === 0}
            />

            <label htmlFor="toggle-all">
              Mark all as complete
            </label>

            <TodoList />
          </section>

          <footer className="footer">
            <div className="todo-count" data-cy="todosCounter">
              {`${howLeft} items left`}
            </div>

            <TodosFilter />

            <button
              type="button"
              className="clear-completed"
              onClick={() => clearedDone()}
            >
              Clear completed
            </button>
          </footer>
        </>
      )}
    </div>
  );
};
