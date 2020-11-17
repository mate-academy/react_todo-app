import React, { useState } from 'react';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';

const App = () => {
  const [originalTodoList, setOriginalTodolist] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [activeTodos, setActiveTodos] = useState(0);
  const [isAllTodosMarked, setIsAllTodoMarked] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const addNewTodo = (title) => {
    const newTodo = {
      id: +new Date(),
      completed: false,
      title,
    };

    const currentActiveTodos = originalTodoList.filter(
      todo => !todo.completed,
    ).length + 1;

    setActiveTodos(currentActiveTodos);
    setOriginalTodolist([...originalTodoList, newTodo]);
    if (activeFilter !== 'completed') {
      setTodoList([...todoList, newTodo]);
    }
  };

  const updateTodos = (newTodos) => {
    const newActiveTodosCount = newTodos.filter(
      todo => !todo.completed,
    ).length;

    setActiveTodos(newActiveTodosCount);
    setOriginalTodolist(newTodos);
    setTodoList(newTodos);
  };

  const changeTodoStatus = (id, isTodoActive) => {
    const updatedTodoList = originalTodoList.map((todo) => {
      if (todo.id !== id) {
        return {
          ...todo,
        };
      }

      return {
        ...todo,
        completed: !isTodoActive,
      };
    });

    updateTodos(updatedTodoList);
  };

  const markAllTodos = () => {
    const markAllValue = !isAllTodosMarked;

    const markedTodoList = originalTodoList.map(todo => ({
      ...todo,
      completed: markAllValue,
    }));

    updateTodos(markedTodoList);
    setIsAllTodoMarked(markAllValue);
  };

  const deleteTodo = (id) => {
    const todoListWithoutDeletedTodo = originalTodoList.filter(
      todo => todo.id !== id,
    );

    updateTodos(todoListWithoutDeletedTodo);
  };

  const clearCompleted = () => {
    const onlyActiveTodos = originalTodoList.filter(
      todo => !todo.completed,
    );

    updateTodos(onlyActiveTodos);
  };

  const filterTodosByStatus = (filter) => {
    setActiveFilter(filter);

    switch (filter) {
      case 'all':
        setTodoList([...originalTodoList]);
        break;

      case 'completed':
        setTodoList([...originalTodoList].filter(
          todo => todo.completed,
        ));
        break;

      case 'active':
        setTodoList([...originalTodoList].filter(
          todo => !todo.completed,
        ));
        break;

      default:
        setTodoList([...originalTodoList]);
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTodoForm addNewTodo={addNewTodo} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          checked={isAllTodosMarked}
          onChange={markAllTodos}
          id="toggle-all"
          className="toggle-all"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          items={todoList}
          changeTodoStatus={changeTodoStatus}
          deleteTodo={deleteTodo}
        />
      </section>

      {!!originalTodoList.length && (
        <footer className="footer">
          <span className="todo-count">
            {`${activeTodos} items left`}
          </span>

          <TodoFilters
            filterTodosByStatus={filterTodosByStatus}
            activeFilter={activeFilter}
          />

          {(todoList.some(todo => todo.completed)) && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => clearCompleted()}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
};

export default App;
