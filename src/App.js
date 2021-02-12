import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './components/Filter/Filter';

const filters = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

function App() {
  const [todos, setTodos] = useState([]);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [activeCount, setActiveCount] = useState(0);
  const [filter, setFilter] = useState(filters.all);

  const filteredByStatus = () => {
    switch (filter) {
      case filters.active:
        return todos.filter(todo => !todo.completed);
      case filters.completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = useMemo(() => filteredByStatus(), [filter, todos]);

  useEffect(() => {
    const saveTodos = localStorage.getItem('todos');

    if (saveTodos) {
      setTodos(JSON.parse(saveTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

    if (todos.length > 0) {
      setIsFooterVisible(true);
    } else {
      setIsFooterVisible(false);
    }

    setIsFooterVisible(todos.length > 0);
  }, [todos]);

  const addTodo = (newTodo) => {
    if (todos && todos
      .some(todo => (todo.title === newTodo.title))) {
      return;
    }

    if (newTodo.title) {
      setTodos([...todos, newTodo]);
    }

    setActiveCount(activeCount + 1);
  };

  const deleteTodo = (todoId) => {
    const newTodos = [...todos].filter(todo => todo.id !== todoId);

    setTodos(newTodos);
  };

  const changeCompleted = (todoId) => {
    const newTodoList = [...todos].map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(newTodoList);
  };

  const leftTodos = [...todos].filter(t => !t.completed);

  return (
    <section className="todoapp">
      <Header todos={todos} onAddNewTodo={addTodo} />

      <TodoList
        todos={filteredTodos}
        onDeleteTodo={deleteTodo}
        changeCompleted={changeCompleted}
      />

      {isFooterVisible && (
        <footer className="footer">
          <span className="todo-count">
            {leftTodos.length}
            {leftTodos.length > 1 || leftTodos.length === 0
              ? ' todos left'
              : ' todo left'}
          </span>

          <Filter
            filter={filter}
            setFilter={setFilter}
            filters={filters}
          />

          <button
            type="button"
            className="clear-completed"
            onClick={() => setTodos(leftTodos)}
          >
            Clear completed
          </button>
        </footer>
      )}

    </section>
  );
}

export default App;
