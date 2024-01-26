import React, {
  useState,
  Dispatch,
  useContext,
  useEffect,
} from 'react';
import { TodosContext } from '../../store/TodoContext';
import { TodoFilter } from '../TodoFilter.tsx/TodoFilter';
import { TodoList } from '../TodoList/TodoList';
import { State, Action, Filter } from '../../types/Context';
import { Todo } from '../../types/Todo';

const getVisibleTodos = (filter: Filter, todos: Todo[]) => {
  if (filter === 'ACTIVE') {
    return todos.filter(todo => !todo.completed);
  }

  if (filter === 'COMPLETED') {
    return todos.filter(todo => todo.completed);
  }

  return todos;
};

export const TodoApp: React.FC = () => {
  const [state, dispatch]
  = useContext(TodosContext) as [State, Dispatch<Action>];
  const { todos, filter } = state;
  const [todoText, setTodoText] = useState('');
  const areAllTodosChecked = todos.every(todo => todo.completed);
  const someTodosCompleted = todos.some(todo => todo.completed);

  const activeCount = todos.filter(todo => !todo.completed).length;
  const itemsLeftText = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

  useEffect(() => {
    if (state.onSave) {
      state.onSave(todos);
    }
  }, [state, todos]);

  const visibleTodos = getVisibleTodos(filter, todos);

  const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const addTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newText = todoText.trim();
    const textIsValid = todoText.trim().length > 0;

    if (textIsValid) {
      setTodoText('');
      dispatch({ type: 'ADD_TASK', payload: newText });
    }
  };

  const toggleAllTodosHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch({ type: 'TOGGLE_ALL', payload: event.target.checked });
  };

  const clearCompletedTodosHandler = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={addTodoHandler} onBlur={addTodoHandler}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoText}
            onChange={changeTextHandler}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={areAllTodosChecked}
              onChange={toggleAllTodosHandler}

            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={visibleTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {itemsLeftText}
            </span>

            <TodoFilter />

            {someTodosCompleted && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearCompletedTodosHandler}
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
