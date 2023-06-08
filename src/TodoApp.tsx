/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getVisibleTodos } from './helpers/getVisibleTodos';

const todosFromServer = [
  {
    id: 74, completed: false, userId: 1, title: 'decorate the balcony',
  },
  {
    id: 77, completed: true, userId: 4, title: 'paint walls',
  },
  {
    id: 83, completed: false, userId: 5, title: 'book a hotel',
  },
  {
    id: 90, completed: true, userId: 5, title: 'buy plants',
  },
];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [filterBy, setFilterBy] = useState<Status>(Status.ALL);
  const isAllCompleted = todos.every(todo => todo.completed);

  const visibleTodos = getVisibleTodos(todos, filterBy);

  const addNewTodo = () => {
    const newTodo = {
      id: +new Date(),
      completed: false,
      userId: 0,
      title,
    };

    if (title) {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }

    setTitle('');
  };

  const updateTodo = (todoId: number, parameterToUpdate: Partial<Todo>) => {
    setTodos((prevTodos) => prevTodos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, ...parameterToUpdate };
      }

      return todo;
    }));
  };

  const toggleAllStatus = () => {
    if (isAllCompleted) {
      todos.forEach(todo => (
        updateTodo(todo.id, { completed: false })
      ));
    } else {
      // const activeTodos = todos.filter(todo => !todo.completed);

      todos.forEach(todo => (
        updateTodo(todo.id, { completed: true })
      ));
    }
  };

  const deleteTodo = (todoId: number) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
  };

  const deleteCompletedTodos = () => {
    const completedTodoIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    completedTodoIds.map(id => deleteTodo(id));
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <Header
        title={title}
        setTitle={setTitle}
        onSaveNewTodo={addNewTodo}
      />

      <section className="main">
        {todos.length > 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={toggleAllStatus}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodoList
          todos={visibleTodos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
      </section>

      {todos.length > 0 && (
        <Footer
          todos={visibleTodos}
          filterBy={filterBy}
          onChangeFilter={setFilterBy}
          onDeleteCompletedTodos={deleteCompletedTodos}
        />
      )}
    </div>
  );
};
