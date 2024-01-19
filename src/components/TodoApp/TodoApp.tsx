import { useContext, useState } from 'react';
import { Header } from '../Header/Header';
import { TodoList } from '../TodoList/TodoLIst';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { DispatchContext, StateContext } from '../TodosContext/TodosContext';
import { ActionTypes, Todo } from '../../types/types';

export const TodoApp = () => {
  const [allCompleted, setAllCompleted] = useState(false);

  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const isEachTodosCompleted = todos.every((todo: Todo) => todo.completed);

  const completedTodos = todos.filter(
    (todo: Todo) => todo.completed,
  );

  const differenceTodos = todos.length - completedTodos.length;

  const handleRemoveAll = () => {
    dispatch({ type: ActionTypes.RemoveCompletedTodo });
  };

  function getAllCompleted() {
    dispatch({ type: ActionTypes.CompleteAllTodo });
    setAllCompleted(!allCompleted);
  }

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <section
          className="main"
        >
          <input
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            type="checkbox"
            checked={isEachTodosCompleted}
            defaultChecked={allCompleted}
            onClick={getAllCompleted}
          />

          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList />
        </section>
      )}

      {todos.length > 0 && (
        <footer
          className="footer"
        >
          <span className="todo-count" data-cy="todosCounter">
            {`${differenceTodos} items left`}
          </span>

          <TodosFilter />

          <button
            type="button"
            className="clear-completed"
            onClick={handleRemoveAll}
          >
            {completedTodos.length > 0 && (
              'Clear completed'
            )}
          </button>
        </footer>
      )}
    </div>
  );
};
