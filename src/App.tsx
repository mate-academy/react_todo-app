import React, { useContext, useState } from 'react';
import { TodoForm } from './Components/TodoForm/TodoForm';
import { Footer } from './Components/Footer/Footer';
import { Filter } from './types/Filter';
import { TodoList } from './Components/TodoList/TodoList';
import { StateContext } from './GlobalProvider/GlobalProvider';
import { getFilteredTodos } from './Components/FilteredTodos/FilteredTodos';

export const App: React.FC = () => {
  const todos = useContext(StateContext);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const filteredTodos = getFilteredTodos(todos, filter);
  //   setLoadingByIds(prev => [...prev, updatedTodo.id]);

  //   if (updatedTodo.title.trim() === '') {
  //     return deleteTodo(updatedTodo.id);
  //   }

  //   return todoServices
  //     .updateTodo(updatedTodo.id, { title: updatedTodo.title })
  //     .then(newTodo => {
  //       setTodos(current =>
  //         current.map(todo => (todo.id === newTodo.id ? newTodo : todo)),
  //       );
  //     })
  //     .catch(error => {
  //       setErrorMessage(ErrorType.UPDATE);
  //       throw error;
  //     })
  //     .finally(() => {
  //       setLoadingByIds(prev => prev.filter(id => id !== updatedTodo.id));
  //     });
  // };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />

        <TodoList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}

        {todos.length > 0 && <Footer filter={filter} setFilter={setFilter} />}
      </div>
    </div>
  );
};
