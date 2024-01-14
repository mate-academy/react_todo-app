import React, { useState, useMemo } from 'react';
import { TodoHeader, TodoFilter, TodoList } from './components';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { useTodoContext } from './store/TodoContext';
import { TodoStatus } from './types';

export const App: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filterByStatus, setFilterByStatus] = useState(TodoStatus.All);

  const {
    todoItems,
    setTodoItems,
  } = useTodoContext();

  const visibleTodos = useMemo(() => getFilteredTodos(
    filterByStatus, todoItems,
  ), [filterByStatus, todoItems]);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodoItems(prevTodos => [...prevTodos, newTodo]);
    setNewTodoTitle('');
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoHeader
          addTodo={addTodo}
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
        />
      </header>

      {!!visibleTodos.length && (
        <TodoList
          todos={visibleTodos}
        />
      )}

      {!!todoItems.length && (
        <TodoFilter
          selectStatus={setFilterByStatus}
          status={filterByStatus}
        />
      )}
    </div>
  );
};
