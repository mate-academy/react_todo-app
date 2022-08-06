import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TodoContext } from '../../TodoContext';

import TodoList from '../TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

import Todo from '../../types/Todo';
import Status from '../../enums/Status';

function convertToHumanReadableCount(amount: number, singularWord: string) {
  if (amount === 1) {
    return `${amount} ${singularWord}`;
  }

  return `${amount} ${singularWord}s`;
}

const TodoApp: React.FC = () => {
  const { status } = useParams();

  const { todos, setTodos } = useContext(TodoContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  const createTodo = () => {
    const newTodo: Todo = {
      id: +new Date(),
      title: newTodoTitle,
      completed: false,
    };

    setTodos(prevValue => [
      ...prevValue,
      newTodo,
    ]);

    setNewTodoTitle('');
  };

  const selectTodos = () => {
    setTodos(prevValue => (
      prevValue.map(todo => (
        { ...todo, completed: true }
      ))
    ));
  };

  const deselectTodos = () => {
    setTodos(prevValue => (
      prevValue.map(todo => (
        { ...todo, completed: false }
      ))
    ));
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {

    }

    // setNewTodoTitle(''); // Create only one todo, using enter or blur
  };

  const handleCompletedTodosSelector = () => {
    setIsSelectAllChecked(prevState => {
      const newState = !prevState;

      if (newState === true) {
        selectTodos();
      } else {
        deselectTodos();
      }

      return newState;
    });
  };

  const prepareTodos = () => {
    switch (status) {
      case Status.Active: {
        return todos.filter(todo => !todo.completed);
      }

      case Status.Completed: {
        return todos.filter(todo => todo.completed);
      }

      default:
        return todos;
    }
  };

  const preparedTodos = prepareTodos();

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={event => event.preventDefault()}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={({ target }) => setNewTodoTitle(target.value)}
            onKeyDown={handleInputKeyDown}
            onBlur={createTodo}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          checked={isSelectAllChecked}
          className="toggle-all"
          onClick={handleCompletedTodosSelector}
          data-cy="toggleAll"
        />

        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList todos={preparedTodos} />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${convertToHumanReadableCount(todos.length, 'item')} left`}
        </span>

        <TodosFilter />

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};

export default TodoApp;
