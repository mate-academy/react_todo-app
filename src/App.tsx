import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { Header } from './components/Header';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filterOption, setFilterOption] = useState(FilterType.ALL);

  useEffect(() => {
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

  const saveTodos = (value: Todo[]) => {
    setTodos(value);
    localStorage.setItem('todos', JSON.stringify(value));
  };

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

    saveTodos([...todos, newTodo]);
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

    saveTodos(updatedTodos);
  };

  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTodos
      = [...todos].map(todo => ({
        ...todo,
        completed: e.target.checked,
      }));

    saveTodos(updatedTodos);
  };

  const handleDeleteTodo = (todoId: number) => {
    const updatedTodos = [...todos].filter(todo => todo.id !== todoId);

    saveTodos(updatedTodos);
  };

  const handleClearCompletedTodos = () => {
    const updatedTodos = [...todos].filter(todo => !todo.completed);

    saveTodos(updatedTodos);
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

    saveTodos(updatedTodos);
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
        <>
          <TodoList
            todos={visibleTodos}
            areAllCompleted={areAllCompleted}
            onToggleComplete={handleToggleCompleted}
            onToggleAll={handleToggleAll}
            onDeleteTodo={handleDeleteTodo}
            onPatchTodo={handlePatchTodo}
          />

          <TodosFilter
            activeTodosAmount={activeTodos.length}
            completedTodosAmount={completedTodos.length}
            onFilterTodos={setFilterOption}
            onClearCompletedTodos={handleClearCompletedTodos}
          />
        </>
      )}
    </div>
  );
};
