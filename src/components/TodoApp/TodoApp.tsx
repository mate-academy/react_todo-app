// eslint-disable-next-line object-curly-newline
import classNames from 'classnames';
import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Todo } from '../../types/Todo';
import { Header } from '../Header';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { filterTotos } from '../../helpers/filterTotos';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const completedTodosCount = useMemo(
    () => todos.filter((todo: Todo) => todo.completed).length,
    [todos],
  );
  const activeTodosCount = useMemo(
    () => todos.filter((todo: Todo) => !todo.completed).length,
    [todos],
  );
  const newTodoField = useRef<HTMLInputElement>(null);
  const allCompleted = completedTodosCount === todos.length;
  const { pathname: location } = useLocation();

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodoAllHandler = () => {
    setTodos(
      todos.map((todo: Todo) => (
        allCompleted
          ? { ...todo, completed: false }
          : { ...todo, completed: true })),
    );
  };

  const deleteTodoHandler = (id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  const toggleTodoHandler = (id: number) => {
    setTodos(
      todos.map((todo: Todo) => (
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : { ...todo })),
    );
  };

  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo: Todo) => !todo.completed));
  };

  const editingTodoHandler = (id: number, title: string) => {
    if (!title.trim()) {
      deleteTodoHandler(id);

      return;
    }

    setTodos(
      todos.map(
        (todo: Todo) => (todo.id === id ? { ...todo, title } : { ...todo }),
      ),
    );
  };

  const visibleTodos = filterTotos(todos, location);

  return (
    <div className="todoapp">
      <Header addTodo={handleAddTodo} ref={newTodoField} />
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className={classNames('toggle-all', { view: !todos.length })}
          data-cy="toggleAll"
          onClick={toggleTodoAllHandler}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          todos={visibleTodos}
          deleteTodo={deleteTodoHandler}
          toggleTodo={toggleTodoHandler}
          editingTodo={editingTodoHandler}
        />
      </section>

      {!!todos.length && (
        <TodosFilter
          completedTodosCount={completedTodosCount}
          activeTodosCount={activeTodosCount}
          deleteTodos={deleteCompletedTodosHandler}
        />
      )}
    </div>
  );
};
