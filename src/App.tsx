/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { RefsContext } from './contexts/RefsContext';
import { TodosContext } from './contexts/TodosContext';
import { SelectedTodosContext } from './contexts/SelectedTodosContext';
import { TodosFiltersContext } from './contexts/TodosFilters';
import { TodosFilters } from './types/TodosFilters';

export const App: React.FC = () => {
  const { newTodoRef, selectedTodoRef } = React.useContext(RefsContext);
  const { todos } = React.useContext(TodosContext);
  const { todosFilter } = React.useContext(TodosFiltersContext);
  const { setSelectedTodos } = React.useContext(SelectedTodosContext);

  useEffect(() => {
    if (selectedTodoRef && selectedTodoRef.current) {
      selectedTodoRef.current.focus();
    } else if (newTodoRef && newTodoRef.current) {
      newTodoRef.current.focus();
    }
  }, [selectedTodoRef, newTodoRef]);

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
