import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { TodosContext } from '../../TodosContext';
import { TodoList } from '../TodoList/TodoList';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export const TodoApp: React.FC = () => {
  const {
    todos, setTodos, setNumberOfNotCompleted, filter,
  }
  = useContext(TodosContext);

  const [title, setTitle] = useState('');

  const [toggleAll, setToggleAll] = useState(false);

  let filteredTodos: Todo[] = todos;

  switch (filter) {
    case Status.All: {
      filteredTodos = todos;

      break;
    }

    case Status.Active: {
      filteredTodos = todos.filter(todo => todo.completed === false);

      break;
    }

    case Status.Completed: {
      filteredTodos = todos.filter(todo => todo.completed === true);

      break;
    }

    default: {
      break;
    }
  }

  const addNewTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  }, [todos, setTodos]);

  const completeTodo = (selectedTodo: Todo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === selectedTodo.id) {
        return {
          ...selectedTodo,
          completed: !selectedTodo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const updateTodo = useCallback((updatedTodo: Todo, newTiltle: string) => {
    if (newTiltle.length === 0) {
      deleteTodo(updatedTodo.id);

      return;
    }

    const newTodos = [...todos];

    const index = newTodos.findIndex(todo => todo.id === updatedTodo.id);

    newTodos.splice(index, 1,
      {
        ...updatedTodo,
        title: newTiltle,
      });

    setTodos(newTodos);
  }, [todos, setTodos, deleteTodo]);

  const checkToggle = (currentTodos: Todo[]) => {
    const areAllTheSame = currentTodos.every(todo => todo.completed === true);

    setToggleAll(!toggleAll);

    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !areAllTheSame ? true : !todo.completed,
    }));

    setTodos(updatedTodos);
  };

  useEffect(() => {
    const areAllTheSame = todos.every(todo => todo.completed === true);

    if (areAllTheSame) {
      setToggleAll(true);
    }

    if (!areAllTheSame) {
      setToggleAll(false);
    }

    setNumberOfNotCompleted((todos.filter(todo => !todo.completed)).length);
  }, [todos, setNumberOfNotCompleted]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      return;
    }

    addNewTodo({
      title,
      id: +new Date(),
      completed: false,
    });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>
      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={toggleAll}
              onChange={() => checkToggle(todos)}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              items={filteredTodos}
              onDelete={deleteTodo}
              onComplete={completeTodo}
              updateTodo={updateTodo}
            />
          </section>
        </>
      )}
    </div>
  );
};
