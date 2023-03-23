/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList/TodoList';
import { ToggleAll } from './components/ToggleAll/ToggleAll';
import { useLocalStorage } from './customHooks/useLocalStorage';
import { Todo } from './types/Todo';
import { filterByStatus } from './utils/helper';

const todosFromServer: Todo[] = [
  { id: 1, title: 'HTML', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'CSS', completed: true },
];

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [query, setQuery] = useState('');
  const { filter = '' } = useParams();

  useEffect(() => {
    setTodos(todosFromServer);
  }, []);

  const handleToggleAll = (isTodosCompleted: boolean) => {
    setTodos(todos.map(todo => {
      return {
        ...todo,
        completed: !isTodosCompleted,
      };
    }));
  };

  const handleTodoUpdate = (todo: Todo, newValue: object) => {
    const copyOfTodos = [...todos];
    const updatedTodoIndex = todos.findIndex(({ id }) => id === todo.id);

    copyOfTodos.splice(updatedTodoIndex, 1, {
      ...todo,
      ...newValue,
    });

    setTodos(copyOfTodos);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleTodoAdd = (todo: Todo) => {
    setTodos([...todos, todo]);
    setQuery('');
  };

  const handleTodoDelete = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(({ completed }) => !completed));
  };

  const completedTodos = todos
    .filter(({ completed }) => completed).length;
  const isTodosEmpty = !todos.length;
  const isTodosCompleted = completedTodos === todos.length;
  const notCompletedTodos = todos.length - completedTodos;
  const visibleArray = filterByStatus(filter, todos);

  return (
    <div className="todoapp">
      <Header
        inputValue={query}
        onInputChange={handleQueryChange}
        onFormSubmit={handleTodoAdd}
      />

      <section className="main">
        {!isTodosEmpty && (
          <ToggleAll
            isActive={isTodosCompleted}
            onToggle={handleToggleAll}
          />
        )}

        <TodoList
          todos={visibleArray}
          onTodoDelete={handleTodoDelete}
          onTodoUpdate={handleTodoUpdate}
        />
      </section>

      {!isTodosEmpty && (
        <Footer
          notCompletedTodos={notCompletedTodos}
          completedTodos={completedTodos}
          onClearCompleted={handleClearCompleted}
        />
      )}
    </div>
  );
};
