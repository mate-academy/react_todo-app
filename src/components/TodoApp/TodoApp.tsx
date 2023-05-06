import classNames from 'classnames';
import {
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Todo } from '../../types/Todo';
import { Header } from '../Header';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { filterTotos } from '../../helpers/filterTotos';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const completedTodosCount = useMemo(() => (
    todos.filter((todo: Todo) => todo.completed).length
  ), [todos]);

  const activeTodosCount = useMemo(() => (
    todos.filter((todo: Todo) => !todo.completed).length
  ), [todos]);

  const newTodoField = useRef<HTMLInputElement>(null);
  const isAllCompleted = completedTodosCount === todos.length;
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

  const handleToggleTodoAll = useCallback(() => {
    const newTodos = todos.map((todo: Todo) => (
      isAllCompleted
        ? { ...todo, completed: false }
        : { ...todo, completed: true }));

    setTodos(newTodos);
  }, [todos]);

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  }, [todos]);

  const handleToggleTodo = useCallback((id: number) => {
    const newTodos = todos.map((todo: Todo) => (
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : { ...todo }));

    setTodos(newTodos);
  }, [todos]);

  const handleDeleteCompletedTodos = useCallback(() => {
    const newTodos = todos.filter((todo: Todo) => !todo.completed);

    setTodos(newTodos);
  }, [todos]);

  const handleEditingTodo = useCallback((id: number, title: string) => {
    if (!title.trim()) {
      handleDeleteTodo(id);

      return;
    }

    const newTodos = todos.map((todo: Todo) => (
      todo.id === id ? { ...todo, title } : { ...todo }));

    setTodos(newTodos);
  }, [todos]);

  const visibleTodos = filterTotos(todos, location);

  return (
    <div className="todoapp">
      <Header addTodo={handleAddTodo} ref={newTodoField} />
      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className={classNames('toggle-all',
                { view: !todos.length })}
              data-cy="toggleAll"
              onChange={handleToggleTodoAll}
              checked={isAllCompleted}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList
              todos={visibleTodos}
              deleteTodo={handleDeleteTodo}
              toggleTodo={handleToggleTodo}
              editingTodo={handleEditingTodo}
            />
          </section>

          <TodosFilter
            completedTodosCount={completedTodosCount}
            activeTodosCount={activeTodosCount}
            deleteTodos={handleDeleteCompletedTodos}
          />
        </>
      )}
    </div>
  );
};
