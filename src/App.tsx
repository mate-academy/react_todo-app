import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { Header } from './components/Header';
import { FilterType } from './types/FIlterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filterOption, setFilterOption] = useState(FilterType.ALL);

  useEffect(() => {
    const todosFromLocalStorage = window.localStorage.getItem('todos');

    if (!todosFromLocalStorage) {
      return;
    }

    setTodos(JSON.parse(todosFromLocalStorage));

    switch (window.location.hash) {
      case '#/active':
        setFilterOption(FilterType.ACTIVE);
        break;

      case '#/completed':
        setFilterOption(FilterType.COMPLETED);
        break;

      default:
        setFilterOption(FilterType.ALL);
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodoTitle.trim()) {
      setNewTodoTitle('');

      return;
    }

    const newTodo = {
      id: +new Date(),
      title: newTodoTitle,
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);

    window.localStorage.setItem('todos', JSON.stringify(updatedTodos));

    setNewTodoTitle('');
  };

  const getFilteredTodos = (option: FilterType, todosToFilter: Todo[]) => {
    switch (option) {
      case FilterType.ACTIVE:
        return todosToFilter.filter(todo => todo.completed === false);

      case FilterType.COMPLETED:
        return todosToFilter.filter(todo => todo.completed === true);

      default:
        return todosToFilter;
    }
  };

  const visibleTodos = getFilteredTodos(filterOption, todos);
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const areAllCompleted = todos.every(todo => todo.completed);

  const handleToggleCompleted = (todoId: number) => {
    const updatedTodos = [...todos];
    const index = updatedTodos.findIndex(todo => todo.id === todoId);

    updatedTodos[index].completed = !updatedTodos[index].completed;

    window.localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTodos
      = [...todos].map(todo => ({
        ...todo,
        completed: e.target.checked,
      }));

    window.localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (todoId: number) => {
    const updatedTodos = [...todos].filter(todo => todo.id !== todoId);

    window.localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const handleClearCompletedTodos = () => {
    const updatedTodos = [...todos].filter(todo => !todo.completed);

    window.localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const handlePatchTodo = (todoId: number, title: string) => {
    const updatedTodos = [...todos].map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        title,
      };
    });

    setTodos(updatedTodos);
    window.localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="todoapp">
      <h1>todos</h1>

      <Header
        newTodoTitle={newTodoTitle}
        onTitleChange={setNewTodoTitle}
        onFormSubmit={handleFormSubmit}
      />

      {todos.length > 0 && (
        <TodoList
          todos={visibleTodos}
          areAllCompleted={areAllCompleted}
          onToggleComplete={handleToggleCompleted}
          onToggleAll={handleToggleAll}
          onDeleteTodo={handleDeleteTodo}
          onPatchTodo={handlePatchTodo}
        />
      )}

      {todos.length > 0 && (
        <TodosFilter
          activeTodosAmount={activeTodos.length}
          completedTodosAmount={completedTodos.length}
          onFilterTodos={setFilterOption}
          onClearCompletedTodos={handleClearCompletedTodos}
        />
      )}
    </div>
  );
};
