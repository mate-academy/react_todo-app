import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

function App() {
  // eslint-disable-next-line no-undef
  const [initialTodoList, setInitialTodoList] = useLocalStorage('todos', []);
  // eslint-disable-next-line no-undef
  const [todoList, setTodoList] = useLocalStorage('todos', []);
  const [setLeftTodo] = useState(0);
  const [filterClass] = useState('all');
  const [markAll, setMarkAll] = useState(false);

  const addNewTodo = (title) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    const activeTodosCount = initialTodoList.filter(
      initialTodo => initialTodo.completed === false,
    ).length + 1;

    if (filterClass !== 'completed') {
      setTodoList([...todoList, newTodo]);
    }

    setInitialTodoList([...initialTodoList, newTodo]);
    setLeftTodo(activeTodosCount);
  };

  const handleChecked = (id, isCompleted) => {
    const changedInitialTodos = initialTodoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: isCompleted,
        };
      }

      return { ...todo };
    });

    const leftActiveTodos = changedInitialTodos.filter(
      todo => todo.completed === false,
    ).length;

    setInitialTodoList(changedInitialTodos);
    setLeftTodo(leftActiveTodos);

    if (filterClass === 'all') {
      setTodoList(changedInitialTodos);
    } else {
      const filter = filterClass === 'completed';
      const filteredList = changedInitialTodos.filter(
        todo => todo.completed === filter,
      );

      setTodoList(filteredList);
    }

    const markedAll = changedInitialTodos.every(
      todo => todo.completed === true,
    );

    setMarkAll(markedAll);
  };

  const markAllAsComplete = () => {
    const updatedMarkAll = !markAll;

    const markedAllTodos = initialTodoList.map((todo) => {
      const markedTodo = {
        ...todo,
        completed: updatedMarkAll,
      };

      return { ...markedTodo };
    });

    setInitialTodoList(markedAllTodos);
    setMarkAll(updatedMarkAll);

    if (filterClass === 'all') {
      setTodoList(markedAllTodos);
    } else {
      const filter = filterClass === 'completed';
      const filteredList = markedAllTodos.filter(
        todo => todo.completed === filter,
      );

      setTodoList(filteredList);
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Form addNewTodo={addNewTodo} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={markAll}
          onChange={markAllAsComplete}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todoList={todoList}
          handleChecked={handleChecked}
        />
      </section>

      <footer className="footer">
        <span className="todo-count">
          3 items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
