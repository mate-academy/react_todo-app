import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { TodoList } from '../TodoList/TodoList';
// import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { useLocalStorage } from '../useLocalStorage/useLocalStorage';

export const TodoTable: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<Status>(Status.All);

  const countNotCompleted = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const allCompleted = todos.every(todo => todo.completed);

  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  const handleAddTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    // setTodos(prevTodos => [...prevTodos, newTodo]);
    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (query !== '') {
      handleAddTodo(query);
    }

    setQuery('');
  };

  const handleDeleteTodo = (todoId: number) => {
    // setTodos(todos => todos.filter(todo => todo.id !== todoId));
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleCheckbox = (id: number, value: boolean) => {
    // setTodos(curTodos => curTodos.map(curTodo => {
    //   if(curTodo.id !== id) {
    //     return curTodo;
    //   }

    //   return {
    //     ...curTodo,
    //     completed: !value,
    //   }
    // }))

    setTodos(todos.map(curTodo => {
      if (curTodo.id !== id) {
        return curTodo;
      }

      return {
        ...curTodo,
        completed: !value,
      };
    }));
  };

  const handleChangeTitle = (id: number, newTitle: string) => {
    // setTodos(curTodos => curTodos.map(curTodo => {
    //   if(curTodo.id !== id) {
    //     return curTodo;
    //   }

    //   return {
    //     ...curTodo,
    //     title: newTitle,
    //   }
    // }));

    setTodos(todos.map(curTodo => {
      if (curTodo.id !== id) {
        return curTodo;
      }

      return {
        ...curTodo,
        title: newTitle,
      };
    }));
  };

  const handleToogleAll = () => {
    if (activeTodos.length === 0) {
      completedTodos.forEach(todo => handleCheckbox(todo.id, todo.completed));
    } else {
      activeTodos.forEach(todo => handleCheckbox(todo.id, todo.completed));
    }
  };

  const handleClearCompleted = () => {
    completedTodos.forEach(todo => handleDeleteTodo(todo.id));
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={handleInputChange}
          />
        </form>
      </header>

      <section className="main">
        {todos.length > 0
      && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className={classNames('toggle-all', { 'is-active': allCompleted })}
            data-cy="toggleAll"
            checked={allCompleted}
            onChange={handleToogleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

        <TodoList
          todos={filteredTodos}
          deleteTodo={handleDeleteTodo}
          changeCheckbox={handleCheckbox}
          changeTitle={handleChangeTitle}
        />
      </section>

      {todos.length > 0
    && (
      <Footer
        countNotCompleted={countNotCompleted}
        hasCompleted={hasCompleted}
        filterType={filterType}
        setFilterType={setFilterType}
        handleClearCompleted={handleClearCompleted}
      />
    )}
    </>
  );
};
