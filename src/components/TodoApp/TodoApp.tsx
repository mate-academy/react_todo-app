import React, { useContext, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';

export const TodoApp: React.FC<{}> = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTodos([...todos, {
      id: `todo-${new Date()}`,
      title: newTodoTitle,
      completed: false,
    }]);

    setNewTodoTitle('');
  };

  const notCompleted = useMemo(() => {
    return todos.filter((todo: Todo) => !todo.completed).length;
  }, [todos]);
  const completed = todos.length - notCompleted;

  const handleToggle = () => {
    setTodos(todos.map((todo: Todo) => ({
      ...todo,
      completed: !todo.completed,
    })));
  };

  const handleClear = () => {
    if (todos.length - notCompleted) {
      setTodos(todos.filter((currentTodo: Todo) => !currentTodo.completed));
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleToggle}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${notCompleted} items left`}
            </span>

            <TodosFilter />

            {!!completed && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => handleClear()}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
