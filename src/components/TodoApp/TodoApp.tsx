/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodoFilter/TodoFilter';
import { Todo } from '../../types';

export const TodoApp: React.FC = React.memo(() => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('items') || '[]'),
  );
  const [completeNumber, setCompleteNumber] = useState(0);
  const [uncompleteNumber, setUncompleteNumber] = useState(0);
  const [toggledTodos, setToggledTodos] = useState(todos);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todos));

    setCompleteNumber(todos.filter((todo: Todo) => todo.completed).length);
    setUncompleteNumber(todos.filter((todo: Todo) => !todo.completed).length);

    setToggledTodos(todos);
  }, [todos]);

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
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

  const removeTodo = (todoId: number) => {
    const filteredTodos = todos.filter((item: { id: number; }) => item.id !== todoId);

    setTodos(filteredTodos);
  };

  const clearCompleted = () => {
    const filteredTodos = todos.filter((item: { completed: boolean; }) => !item.completed);

    setTodos(filteredTodos);
  };

  const changeStatus = (todoId: number) => {
    setTodos(
      todos.map((item: Todo) => {
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

  const changeStatusToAll = () => {
    if (todos.find((todo: Todo) => todo.completed !== true)) {
      const newArr = todos.map((todo: Todo) => (
        {
          ...todo,
          completed: true,
        }
      ));

      return setTodos(newArr);
    }

    return setTodos(
      todos.map((item: Todo) => {
        return {
          ...item,
          completed: !item.completed,
        };
      }),
    );
  };

  const editTitle = (newTitle: string, todoId: number) => {
    setTodos(
      todos.map((item: Todo) => {
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

  const toggleFilter = (filter: string) => {
    switch (filter) {
      case 'all':
        return setToggledTodos(todos);
      case 'active':
        return setToggledTodos([...todos].filter(
          (todo: Todo) => !todo.completed,
        ));
      case 'completed':
        return setToggledTodos([...todos].filter(
          (todo: Todo) => todo.completed,
        ));
      default:
        return 1;
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

      {todos.length > 0 && (
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
      )}
    </>
  );
});
