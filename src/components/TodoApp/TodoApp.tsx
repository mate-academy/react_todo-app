import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter';
import { useLocalStorage } from '../customHooks';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [newTodo, setNewTodo] = useState('');
  const [
    placeholderTitle,
    setPlaceholderTitle,
  ] = useState('What needs to be done?');
  const { pathname } = useLocation();

  const isCompletedTodos = todos.some(todo => todo.completed);

  const filterTodos = (filteringProperty: string) => {
    return (
      todos.filter(todo => {
        switch (filteringProperty) {
          case '/active':
            return !todo.completed;
          case '/completed':
            return todo.completed;
          case '/':
          default:
            return todo;
        }
      })
    );
  };

  const filteredTodos: Todo[] = useMemo(
    () => filterTodos(pathname),
    [todos, pathname],
  );

  const activeTodosCount = (
    todos.length - todos.filter(
      item => item.completed,
    ).length);

  const addTodo = async (newTodoTitle: string) => {
    const newTodoPost: Todo = {
      id: +new Date(),
      title: newTodoTitle,
      completed: false,
    };

    setTodos([...todos, newTodoPost]);
  };

  const validateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodo.trim().length) {
      setNewTodo('');
      setPlaceholderTitle('The field CanNOT be EMPTY');
    }

    if (newTodo.trim().length) {
      addTodo(newTodo);
      setPlaceholderTitle('What needs to be done?');
      setNewTodo('');
    }
  };

  const isActive = todos.every(todo => todo.completed);

  const onSwitch = (isAllChecked: boolean) => {
    const todosIdArray = (
      isAllChecked ? (
        todos.map(item => item.id)
      ) : (
        todos.filter(el => !el.completed)
          .map(item => item.id)
      )
    );

    const newTodos = (
      todos.map((todo) => (
        todosIdArray.includes(todo.id) ? (
          { ...todo, completed: !todo.completed }
        ) : (
          todo
        )
      ))
    );

    setTodos(newTodos);
  };

  const removeCompletedTodos = () => (
    setTodos(todos.filter((todo) => !todo.completed))
  );

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={validateTodo}>
          <label>
            <input
              type="text"
              className="new-todo"
              data-cy="createTodo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder={placeholderTitle}
            />
          </label>
        </form>
      </header>

      {!!todos.length && (
        <section className="main">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => onSwitch(isActive)}
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            items={filteredTodos}
            setTodos={setTodos}
            todos={todos}
          />
        </section>
      )}

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodosCount} items left`}
          </span>

          <TodosFilter />

          {isCompletedTodos && (
            <button
              type="button"
              className={
                classNames('clear-completed', { hidden: !isCompletedTodos })
              }
              onClick={removeCompletedTodos}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
