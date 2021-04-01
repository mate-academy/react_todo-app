import React, { useState, useEffect, useContext } from 'react';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { TodosContext } from '../TodosContext';

export const TodoApp = () => {
  const [todo, setTodo] = useState('');
  const [todosLeft, setTodosLeft] = useState(0);
  const { todos, setTodos } = useContext(TodosContext);

  const handleTodoChange = ({ target }) => {
    setTodo(target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!todo.trim()) {
      return setTodo('');
    }

    setTodos(prevTodos => (
      [{
        id: +new Date(),
        title: todo.trim(),
        completed: false,
      }, ...prevTodos]
    ));

    return setTodo('');
  };

  const clearCompleted = () => {
    setTodos(() => (
      todos.filter(todoEl => !todoEl.completed)
    ));
  };

  useEffect(() => {
    const activeTodosLeft = todos.filter(todoEl => !todoEl.completed).length;

    setTodosLeft(activeTodosLeft);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            value={todo}
            onChange={handleTodoChange}
            name="todoItem"
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
        {!!todos.length
          && (
            <>
              <TodoList />
              <footer className="footer">
                <span className="todo-count">
                  {todosLeft === 1
                    ? `${todosLeft} item left`
                    : `${todosLeft} items left`}
                </span>

                <TodosFilter />

                <button
                  type="button"
                  className="clear-completed"
                  hidden={!todos.some(todoEl => todoEl.completed)}
                  onClick={clearCompleted}
                >
                  Clear completed
                </button>

              </footer>
            </>
          )
        }
      </header>

    </section>

  );
};
