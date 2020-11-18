import React, { useEffect, useState } from 'react';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { useLocalStorage } from './hooks/useLocalStorage';

const App = () => {
  const [originalTodoList, setOriginalTodolist] = useLocalStorage(
    'originalTodos', [],
  );
  const [todoList, setTodoList] = useLocalStorage('todos', []);
  const [activeTodos, setActiveTodos] = useLocalStorage('activeTodos', 0);
  const [isAllTodosMarked, setIsAllTodoMarked] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    filterTodosByStatus(activeFilter);
  }, [originalTodoList, activeFilter]);

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
  };

  const updateTodos = (newTodos) => {
    const newActiveTodosCount = newTodos.filter(
      todo => !todo.completed,
    ).length;

    setActiveTodos(newActiveTodosCount);
    setOriginalTodolist(newTodos);
  };

  const filterTodosByStatus = (filter) => {
    setActiveFilter(filter);

    switch (filter) {
      case 'completed':
        setTodoList(originalTodoList.filter(
          todo => todo.completed,
        ));
        break;

      case 'active':
        setTodoList(originalTodoList.filter(
          todo => !todo.completed,
        ));
        break;

      default:
        setTodoList(originalTodoList);
    }
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

    setIsAllTodoMarked(markAllValue);
    updateTodos(markedTodoList);
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

  const changeTodoTitle = (id, newTitle) => {
    const todoListWithEditedElement = originalTodoList.map(
      (todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          title: newTitle,
        };
      },
    );

    updateTodos(todoListWithEditedElement);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTodoForm addNewTodo={addNewTodo} />
      </header>

      <section className="main">
        {!!originalTodoList.length && (
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
          items={todoList}
          changeTodoStatus={changeTodoStatus}
          deleteTodo={deleteTodo}
          changeTodoTitle={changeTodoTitle}
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

          {(originalTodoList.some(todo => todo.completed)) && (
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
