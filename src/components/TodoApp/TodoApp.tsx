import classNames from 'classnames';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
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

  const toggleTodoAllHandler = useCallback(() => {
    const newTodos = todos.map((todo: Todo) => (
      isAllCompleted
        ? { ...todo, completed: false }
        : { ...todo, completed: true }));

    setTodos(newTodos);
  }, [todos]);

  const deleteTodoHandler = useCallback((id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  }, [todos]);

  const toggleTodoHandler = useCallback((id: number) => {
    const newTodos = todos.map((todo: Todo) => (
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : { ...todo }));

    setTodos(newTodos);
  }, [todos]);

  const deleteCompletedTodosHandler = useCallback(() => {
    const newTodos = todos.filter((todo: Todo) => !todo.completed);

    setTodos(newTodos);
  }, [todos]);

  const editingTodoHandler = useCallback((id: number, title: string) => {
    if (!title.trim()) {
      deleteTodoHandler(id);

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
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className={classNames('toggle-all',
              { view: !todos.length })}
            data-cy="toggleAll"
            onChange={toggleTodoAllHandler}
            checked={isAllCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={visibleTodos}
            deleteTodo={deleteTodoHandler}
            toggleTodo={toggleTodoHandler}
            editingTodo={editingTodoHandler}
          />
        </section>
      )}

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
