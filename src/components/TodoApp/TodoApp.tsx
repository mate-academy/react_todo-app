/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';

export const TodoApp: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('items') || '[]'),
  );
  const [completeNumber, setCompleteNumber] = useState(0);
  const [uncompleteNumber, setUncompleteNumber] = useState(0);
  const [toggledTodos, setToggledTodos] = useState(todos);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todos));

    setCompleteNumber(todos.filter((todo: { completed: boolean; }) => todo.completed).length);
    setUncompleteNumber(todos.filter((todo: { completed: boolean; }) => !todo.completed).length);

    setToggledTodos(todos);
  }, [todos]);

  const addNewTodo = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const todo = {
      id: +new Date(),
      title: newTodoTitle,
      completed: false,
    };

    if (newTodoTitle) {
      setTodos([...todos, todo]);
      setNewTodoTitle('');
    }
  };

  const removeTodo = (todoId: number): void => {
    const filteredTodos = todos.filter((item: { id: number; }) => item.id !== todoId);

    setTodos(filteredTodos);
  };

  const clearCompleted = (): void => {
    const filteredTodos = todos.filter((item: { completed: boolean; }) => !item.completed);

    setTodos(filteredTodos);
  };

  const changeStatus = (todoId: number): void => {
    setTodos(
      todos.map((item: { id: number; completed: boolean; }) => {
        if (item.id === todoId) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      }),
    );
  };

  const changeStatusToAll = (): void => {
    if (todos.find((todo: { completed: boolean; }) => todo.completed !== true)) {
      const newArr = todos.map((todo: { completed: boolean; }) => (
        {
          ...todo,
          completed: true,
        }
      ));

      return setTodos(newArr);
    }

    return setTodos(
      todos.map((item: { completed: boolean; }) => {
        return {
          ...item,
          completed: !item.completed,
        };
      }),
    );
  };

  const editTitle = (newTitle: string, todoId: number): void => {
    setTodos(
      todos.map((item: { id: number; title: string }) => {
        if (item.id === todoId) {
          return {
            ...item,
            title: newTitle,
          };
        }

        return item;
      }),
    );
  };

  // eslint-disable-next-line consistent-return
  const toggleFilter = (filter: string): void => {
    switch (filter) {
      case 'all':
        return setToggledTodos(todos);
      case 'active':
        return setToggledTodos([...todos].filter(
          (todo: { completed: boolean; }) => !todo.completed,
        ));
      case 'completed':
        return setToggledTodos([...todos].filter(
          (todo: { completed: boolean; }) => todo.completed,
        ));
      default:
        break;
    }
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={addNewTodo}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={event => setNewTodoTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          checked={completeNumber === todos.length}
          id="toggle-all"
          className="toggle-all"
          onChange={changeStatusToAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          items={toggledTodos}
          removeTodo={removeTodo}
          changeStatus={changeStatus}
          editTitle={editTitle}
        />
      </section>

      <footer className="footer">
        <span className="todo-count">
          {`${uncompleteNumber} ${uncompleteNumber === 1 ? 'item' : 'items'} left`}
        </span>

        <TodosFilter toggleFilter={toggleFilter} />

        {completeNumber > 0 && (
          <button type="button" className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    </>
  );
};
