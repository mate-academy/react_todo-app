import { useContext, useMemo, useState } from 'react';
import { TodoList } from '../TodoList';
import { TodosContext } from '../../contexts/TodosProvider';
import { TodoAction } from '../../types/TodoAction';
import { Todo } from '../../types/Todo';
import { FilterOptions } from '../../types/FilterOptions';

function filterTodos(todos: Todo[], filterOpitons: FilterOptions) {
  switch (filterOpitons) {
    case FilterOptions.Active:
      return todos.filter(({ completed }) => !completed);

    case FilterOptions.Completed:
      return todos.filter(({ completed }) => completed);

    default:
      return [...todos];
  }
}

export const TodoApp = () => {
  const { filterOptions, todos, dispatch } = useContext(TodosContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const filteredTodos = useMemo(() => filterTodos(todos, filterOptions),
    [todos, filterOptions]);

  const isAllCompleted = todos.every(({ completed }) => completed);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = newTodoTitle.trim();

    if (newTodoTitle && normalizedTitle) {
      dispatch({
        action: TodoAction.Add,
        todo: {
          id: +new Date(),
          title: normalizedTitle,
          completed: false,
        },
      });
      setNewTodoTitle('');
    }
  };

  const handleToggleAllChanged = () => {
    // eslint-disable-next-line no-restricted-syntax
    todos.forEach(todo => {
      dispatch({
        action: TodoAction.Update,
        todo: {
          ...todo,
          completed: !isAllCompleted,
        },
      });
    });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTodoTitle}
            onChange={(event) => setNewTodoTitle(event.target.value)}
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <section className="main">
        {
          todos.length
          && (
            <>
              <input
                checked={isAllCompleted}
                onChange={() => handleToggleAllChanged()}
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              <TodoList todos={filteredTodos} />
            </>
          )
        }

      </section>
    </div>
  );
};
