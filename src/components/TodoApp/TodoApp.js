import React, { useState, useEffect } from 'react';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { NewTodo } from '../NewTodo';
import { TodosToggler } from '../TodosToggler';
import { TodoCount } from '../TodoCount';

export const TodoApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [toggleAll, setToggleAll] = useState(false);
  const [filterValue, setFilterValue] = useState('All');

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  useEffect(() => {
    setToggleAll(todos.every(todo => todo.completed));
  }, [todos]);

  useEffect(() => {
    if (localStorage.getItem('todos')) {
      setTodos([...JSON.parse(localStorage.getItem('todos'))]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleTodoAddition = (title) => {
    if (title) {
      setTodos([...todos, {
        id: +new Date(),
        title,
        completed: false,
      }]);
    }

    setInputValue('');
  };

  const handleToggleTodosStatus = () => {
    setToggleAll(!toggleAll);

    setTodos(todos.map(todo => ({
      ...todo,
      completed: !toggleAll,
    })));
  };

  const handleTodoChange = (id, editedTitle) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: editedTitle,
        };
      }

      return { ...todo };
    }));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTodo
          inputValue={inputValue}
          setInputValue={setInputValue}
          onTodoAddition={handleTodoAddition}
        />
      </header>

      {todos.length > 0 && (
        <section className="main">
          <TodosToggler
            toggleAll={toggleAll}
            onToggleTodosStatus={handleToggleTodosStatus}
          />

          <TodoList
            filterValue={filterValue}
            setToggleAll={setToggleAll}
            toggleAll={toggleAll}
            setTodos={setTodos}
            todos={todos}
            onTodoChange={handleTodoChange}
          />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <TodoCount activeTodos={activeTodos} />

          <TodosFilter
            filterValue={filterValue}
            setFilter={setFilterValue}
          />

          {completedTodos.length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                setTodos(todos.filter(todo => !todo.completed));
              }}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
};
