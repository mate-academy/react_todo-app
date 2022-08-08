import React, { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import TodoList from '../TodoList';
import TodosFilter from '../TodosFilter/TodosFilter';
import { TodoContext } from '../../TodoContext';

import Todo from '../../types/Todo';
import Status from '../../enums/Status';
import { ActionType } from '../../reducer';

function convertToHumanReadableCount(amount: number, singularWord: string) {
  if (amount === 1) {
    return `${amount} ${singularWord}`;
  }

  return `${amount} ${singularWord}s`;
}

const TodoApp: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const { todos } = state;

  const { status } = useParams();

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const completedTodosAmount = useMemo(() => {
    return todos.reduce((sum, curr) => (
      curr.completed ? sum + 1 : sum
    ), 0);
  }, [state]);

  const createTodo = () => {
    if (newTodoTitle === '') {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: newTodoTitle,
      completed: false,
    };

    dispatch({ type: ActionType.Add, payload: newTodo });

    setNewTodoTitle('');
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTodo();
    }
  };

  const handleCompletedTodosSelector = () => {
    if (completedTodosAmount === todos.length) {
      dispatch({
        type: ActionType.UpdateAll,
        payload: { completed: false },
      });
    } else {
      dispatch({
        type: ActionType.UpdateAll,
        payload: { completed: true },
      });
    }
  };

  const handleClearButton = () => {
    dispatch({ type: ActionType.RemoveAll, payload: { completed: true } });
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

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              checked={completedTodosAmount === todos.length}
              className="toggle-all"
              onChange={handleCompletedTodosSelector}
              data-cy="toggleAll"
            />

            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={preparedTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${convertToHumanReadableCount(
                todos.length - completedTodosAmount,
                'item',
              )} left`}
            </span>

            <TodosFilter />

            {completedTodosAmount > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClearButton}
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

export default TodoApp;
