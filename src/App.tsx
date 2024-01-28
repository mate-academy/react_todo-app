import React, { useContext, useState } from 'react';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { TodoContext } from './components/TodosProvider/TodosProvider';
import { Filter } from './types/Filter';
import { Footer } from './components/Footer/Footer';

function prepareTodos(todos: Todo[], filter: Filter): Todo[] {
  let todosCopy = [...todos];

  if (filter === Filter.Active) {
    todosCopy = todosCopy.filter(todo => todo.completed === false);
  }

  if (filter === Filter.Completed) {
    todosCopy = todosCopy.filter(todo => todo.completed === true);
  }

  return todosCopy;
}

export const App: React.FC = () => {
  const todos = useContext(TodoContext);
  const [filterType, setFilterType] = useState(Filter.All);

  const showContent = todos.length > 0;

  const preparedTodos = prepareTodos(todos, filterType);

  const changeFilter = (newFilter: Filter) => {
    setFilterType(newFilter);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodoForm />
      </header>

      {showContent && (
        <>
          <TodoList items={preparedTodos} />

          <Footer changeFilter={changeFilter} currentFilter={filterType} />
        </>
      )}
    </div>
  );
};
