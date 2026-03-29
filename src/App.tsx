/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodosContext } from './contexts/TodosContext';
import { SelectedTodosContext } from './contexts/SelectedTodosContext';
import { TodosFiltersContext } from './contexts/TodosFiltersContext';
import { TodosFilters } from './types/TodosFilters';
import { SelectedTodoContext } from './contexts/SelectedTodoContext';
import { FocusContext } from './contexts/FocusContext';

export const App: React.FC = () => {
  const { handleFocus } = React.useContext(FocusContext);
  const { todos } = React.useContext(TodosContext);
  const { todosFilter } = React.useContext(TodosFiltersContext);
  const { setSelectedTodos } = React.useContext(SelectedTodosContext);
  const { selectedTodo } = React.useContext(SelectedTodoContext);

  useEffect(() => {
    setTimeout(() => {
      handleFocus();
    }, 0);
  }, [selectedTodo]);

  useEffect(() => {
    switch (todosFilter) {
      case TodosFilters.Active:
        setSelectedTodos(todos.filter(todo => !todo.completed));
        break;
      case TodosFilters.Completed:
        setSelectedTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setSelectedTodos(todos);
    }

    handleFocus();
  }, [todosFilter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList />

        {todos.length > 0 && <TodoFooter />}
      </div>
    </div>
  );
};
