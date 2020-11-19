import React, { useMemo, useState } from 'react';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { useLocalStorage } from './hooks/useLocalStorage';
import { FILTERS } from './constants/constants';

const App = () => {
  const [todoList, setTodoList] = useLocalStorage(
    'todoList', [],
  );
  const [todosFilter, setTodosFilter] = useState(FILTERS.all);
  const [isAllTodosMarked, setIsAllTodoMarked] = useState(false);

  const filterTodosByStatus = () => {
    switch (todosFilter) {
      case 'all':
        return todoList;

      case 'active':
        return todoList.filter(todo => !todo.completed);

      case 'completed':
        return todoList.filter(todo => todo.completed);

      default:
        return todoList;
    }
  };

  const filteredTodos = useMemo(
    () => filterTodosByStatus(),
    [todosFilter, todoList],
  );

  const activeTodos = useMemo(
    () => todoList.filter(todo => !todo.completed).length,
    [todoList],
  );

  const addNewTodo = (title) => {
    const newTodo = {
      id: +new Date(),
      completed: false,
      title,
    };

    setTodoList([...todoList, newTodo]);
  };

  const changeTodoTitle = (id, newTitle) => {
    const todoListWithEditedElement = todoList.map(
      (todo) => {
        if (todo.id !== id) {
          return { ...todo };
        }

        return {
          ...todo,
          title: newTitle,
        };
      },
    );

    setTodoList(todoListWithEditedElement);
  };

  const changeTodoStatus = (id, isTodoActive) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id !== id) {
        return { ...todo };
      }

      return {
        ...todo,
        completed: !isTodoActive,
      };
    });

    setTodoList(updatedTodoList);
  };

  const markAllTodos = () => {
    const markedTodoList = todoList.map(todo => ({
      ...todo,
      completed: isAllTodosMarked,
    }));

    setIsAllTodoMarked(!isAllTodosMarked);
    setTodoList(markedTodoList);
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodoList(todoList.filter(todo => !todo.completed));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTodoForm addNewTodo={addNewTodo} />
      </header>

      <section className="main">
        {!!todoList.length && (
          <>
            <input
              type="checkbox"
              checked={isAllTodosMarked}
              onChange={markAllTodos}
              id="toggle-all"
              className="toggle-all"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodoList
          items={filteredTodos}
          changeTodoStatus={changeTodoStatus}
          deleteTodo={deleteTodo}
          changeTodoTitle={changeTodoTitle}
        />
      </section>

      {!!todoList.length && (
        <footer className="footer">
          <span className="todo-count">
            {`${activeTodos} items left`}
          </span>

          <TodoFilters
            todosFilter={todosFilter}
            setTodosFilter={setTodosFilter}
            FILTERS={FILTERS}
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
