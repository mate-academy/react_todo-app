/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TodosFilter } from '../TodosFilter';
import { TodoList } from '../TodoList';

import '../../styles/todo-list.css';
import '../../styles/index.css';

import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';

const initTodos = () => {
  const savedTodo = localStorage.getItem('todos');
  let initialValue = [];

  if (savedTodo !== null) {
    initialValue = JSON.parse(savedTodo);
  }

  return initialValue;
};

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo []>(initTodos());

  const [newTodoTitle, setNewTodoTitle] = useState('');

  let { statusFilter } = useParams();

  if (statusFilter === undefined) {
    statusFilter = FilterStatus.All;
  }

  const getActiveTodosMessage = () => {
    const counter = todos.filter(todo => todo.completed === false).length;

    return counter !== 1
      ? `${counter} items left`
      : `${counter} item left`;
  };

  const handleEditTodo = (newTodo: Todo) => {
    const copyTodos = todos.map((item) => ({ ...item }));

    const indexOfTodoToReplace = copyTodos.findIndex(
      todo => todo.id === newTodo.id,
    );

    copyTodos[indexOfTodoToReplace] = newTodo;

    setTodos(copyTodos);
  };

  const handleMarkCompleteOneTodo = (todoId: number) => {
    const copyTodos = todos.map((item) => ({ ...item }));

    const indexOfTodo = copyTodos.findIndex(
      todo => todo.id === todoId,
    );

    copyTodos[indexOfTodo].completed = !copyTodos[indexOfTodo].completed;

    setTodos(copyTodos);
  };

  const isAnythingActive = todos.some(todo => todo.completed === false);
  const isAnythingCompleted = todos.some(todo => todo.completed === true);

  const markCompleatnessAllItem = () => {
    let copyTodos: Todo [] = [];

    if (isAnythingActive) {
      copyTodos = todos.map((item) => ({ ...item, completed: true }));
    } else {
      copyTodos = todos.map((item) => ({ ...item, completed: false }));
    }

    if (copyTodos.length > 0) {
      setTodos(copyTodos);
    }
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoTitle.trim().length > 0) {
      setTodos(prev => [...prev, {
        id: +new Date(),
        title: newTodoTitle.trim(),
        completed: false,
      }]);
    }

    setNewTodoTitle('');
  };

  const clearHandler = () => {
    const copyTodos = todos.map((item) => ({ ...item }));

    const activeTodos = copyTodos.filter((todo) => todo.completed === false);

    setTodos(activeTodos);
  };

  const handleTodoDelete = (todoId: number) => {
    const copyTodos = todos.map((item) => ({ ...item }));

    const indexOfTodo = copyTodos.findIndex(
      todo => todo.id === todoId,
    );

    copyTodos.splice(indexOfTodo, 1);

    setTodos(copyTodos);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={submitForm}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={(event) => setNewTodoTitle(event.target.value)}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              checked={!todos.some(todo => todo.completed === false)}
              className="toggle-all"
              data-cy="toggleAll"
            />
            <label
              htmlFor="toggle-all"
              onClick={markCompleatnessAllItem}
            >
              Mark all as complete
            </label>

            <TodoList
              todos={todos}
              onEditTodo={handleEditTodo}
              onMarkCompleteOneTodo={handleMarkCompleteOneTodo}
              onTodoDelete={handleTodoDelete}
              statusFilter={statusFilter}
            />

          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {getActiveTodosMessage()}
            </span>

            <TodosFilter />

            {isAnythingCompleted && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearHandler}
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
