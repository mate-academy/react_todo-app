import React, { useContext } from 'react';
import { TodosContext } from '../../store/TodoProvider';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { TodoList } from '../TodoList/TodoList';
import { TodoForm } from '../TodoForm/TodoForm';
import { ActionType, FilterType } from '../../types/Todo';

export const TodoApp: React.FC = () => {
  const { state, dispatch } = useContext(TodosContext);

  const addTodoItem = (title: string) => {
    dispatch({ type: ActionType.ADD, payload: title });
  };

  const toggleAllTodoItems = () => {
    dispatch({ type: ActionType.TOGGLE_ALL });
  };

  const removeCompletedTodoItems = () => {
    dispatch({ type: ActionType.REMOVE_COMPLETED });
  };

  const filteredTodos = () => {
    switch (state.filterBy) {
      case FilterType.ACTIVE:
        return state.todos.filter(item => !item.completed);
      case FilterType.COMPLETED:
        return state.todos.filter(item => item.completed);
      default:
        return state.todos;
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoForm onSubmit={addTodoItem} />
      </header>

      {state.todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onChange={toggleAllTodoItems}
              checked={state.todos.every(item => item.completed)}
              data-cy="toggleAll"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={filteredTodos()} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${state.todos.filter(item => !item.completed).length}  items left`}
            </span>

            <TodosFilter />

            {state.todos.some(item => item.completed) && (
              <button
                type="button"
                className="clear-completed"
                onClick={removeCompletedTodoItems}
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
