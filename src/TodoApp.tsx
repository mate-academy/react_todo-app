/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Todo } from './Types/Todo';
import { TodoInput } from './components/TodoInput/TodoInput';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './Types/FilterEnum';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo | undefined>();
  const [filter, setFilter] = useState(Filter.All);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [isEmpty, setIsEmpty] = useState(false);
  const { filtered } = useParams();

  useEffect(() => {
    const filterValue = filtered === 'active'
      ? Filter.Active
      : filtered === 'completed'
        ? Filter.Completed
        : Filter.All;

    setFilter(filterValue);
  }, [filtered]);

  useEffect(() => {
    if (newTodo) {
      setTodos([
        ...todos,
        newTodo,
      ]);
    }
  }, [newTodo]);

  useEffect(() => {
    switch (filter) {
      case Filter.Active: {
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      }

      case Filter.Completed: {
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      }

      default: {
        setFilteredTodos(todos);
        break;
      }
    }
  }, [filter, todos]);

  useEffect(() => {
    if (!todos.length) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [todos]);

  useEffect(() => {
    const todosFromStorage = localStorage.getItem('todos');

    if (todosFromStorage) {
      setTodos(JSON.parse(todosFromStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleComplete = (id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id: number, editingValue: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title: editingValue,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteEveryCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleToggleAll = () => {
    const isEveryCompleted = todos.every(todo => todo.completed);

    if (isEveryCompleted) {
      setTodos(todos.map(todo => {
        return {
          ...todo,
          completed: false,
        };
      }));
    } else {
      setTodos(todos.map(todo => {
        if (!todo.completed) {
          return {
            ...todo,
            completed: true,
          };
        }

        return todo;
      }));
    }
  };

  const countNotCompleted = todos.filter(todo => !todo.completed).length;
  const countCompleted = todos.filter(todo => todo.completed).length;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoInput setNewTodo={setNewTodo} />
      </header>

      {!isEmpty && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={filteredTodos}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </section>

          <TodoFooter
            filter={filter}
            setFilter={setFilter}
            handleDeleteEveryCompleted={handleDeleteEveryCompleted}
            countNotCompleted={countNotCompleted}
            countCompleted={countCompleted}
          />
        </>
      )}
    </div>
  );
};
