/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/Todo/Header/Header';
import { TodoList } from './components/Todo/List/List';
import { TodoFooter } from './components/Todo/Footer/Footer';
import { FilterOption } from './types/FilterOptions';
import { getInitialFilterFromHash } from './utils/getUrlHash';
import { useTodos } from './context/todoContext';

const prepareTodos = (list: Todo[], filterBy: FilterOption) => {
  if (filterBy !== FilterOption.ALL) {
    return list.filter(todo => {
      switch (filterBy) {
        case FilterOption.ACTIVE: {
          return !todo.completed;
        }

        case FilterOption.COMPLETED: {
          return todo.completed;
        }

        default: {
          return true;
        }
      }
    });
  }

  return list;
};

export const App: React.FC = () => {
  // #region states
  const [filterBy, setFilterBy] = useState<FilterOption>(
    getInitialFilterFromHash(),
  );
  const todos = useTodos();
  // #endregion

  // #region handlers
  const handleFilterChange = (newType: FilterOption) => {
    setFilterBy(newType);
  };

  // #endregion

  const visibleTodos = useMemo(
    () => prepareTodos(todos, filterBy),
    [todos, filterBy],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader
        // todos={todos}
        // onAddTodo={handleAddTodo}
        // isLoading={temporaryTodo !== null}
        // onToggleAll={handleToggleAllTodos}
        />
        <TodoList
          todos={visibleTodos}
          // todoIdsInProcess={todoIdsInProcess}
          // temporaryTodo={temporaryTodo}
          // onTodoRemove={handleDeleteTodo}
          // onTodoUpdate={handleUpdateTodo}
          // onTodoRename={handleRenameTodo}
        />
        {/* {todos.length > 0 && ( */}
        <TodoFooter
          // todos={todos}
          filterBy={filterBy}
          onFilterChange={handleFilterChange}
          // // onDeleteCompleted={handleDeleteCompleted}
        />
        {/* )} */}
      </div>
    </div>
  );
};
