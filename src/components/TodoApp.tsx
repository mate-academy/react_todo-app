import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';
import { NewTodo } from './NewTodo';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    const loadTodos = localStorage.getItem('todos');

    if (loadTodos) {
      setTodos(JSON.parse(loadTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddToto = useCallback((todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  }, []);

  const handleRemoveTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const handleRemoveCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  const handleToggleCompleted = useCallback((id: number) => {
    const todoToToggle = todos.find(todo => todo.id === id);

    if (todoToToggle) {
      const updatedTodo = {
        ...todoToToggle,
        completed: !todoToToggle.completed,
      };

      setTodos(prevTodos => prevTodos
        .map(todo => (todo.id === id ? updatedTodo : todo)));
    }
  }, [todos]);

  const handleToggleAllTodos = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    if (activeTodos.length) {
      setTodos(prevTodos => prevTodos.map(todo => (todo.completed
        ? todo
        : { ...todo, completed: true })));
    } else {
      setTodos(prevTodos => prevTodos
        .map(todo => ({ ...todo, completed: !todo.completed })));
    }
  };

  const handleEditTodo = useCallback((id: number, newTitle: string) => {
    const todoToEdit = todos.find(todo => todo.id === id);

    if (todoToEdit) {
      const editedTodo = { ...todoToEdit, title: newTitle.trim() };

      setTodos(prevTodos => prevTodos
        .map(todo => (todo.id === id ? editedTodo : todo)));
    }
  }, [todos]);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    switch (filter) {
      case FilterType.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      case FilterType.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case FilterType.All:
      default:
        break;
    }

    return filteredTodos;
  }, [filter, todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo
          onAddTodo={handleAddToto}
        />
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={handleToggleAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              onToggleCompleted={handleToggleCompleted}
              todos={visibleTodos}
              onRemoveTodo={handleRemoveTodo}
              onEditTodo={handleEditTodo}
            />
          </section>
          <TodosFilter
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            onRemoveCompleted={handleRemoveCompleted}
          />
        </>
      )}
    </div>
  );
};
