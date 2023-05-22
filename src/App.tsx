import React, { useMemo, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodosList } from './components/TodosList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';
import { FilterType } from './utils/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [query, setQuery] = useState('');
  const [currTodoTitle, setCurrTodoTitle] = useState('');
  const [currTodoId, setCurrTodoId] = useState<number>(0);
  const [filterBy, setFilterBy] = useState(FilterType.All);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case FilterType.Active:
          return !todo.completed;

        case FilterType.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filterBy]);

  const isAllTodosCompleted = useMemo(() => (
    filteredTodos.length > 0 && filteredTodos.every((todo) => todo.completed)
  ), [filteredTodos]);

  const count = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [filteredTodos]);

  const isSomeTodoCompleted = useMemo(() => (
    todos.some(todo => todo.completed)
  ), [filteredTodos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();

    const newTodo = {
      title,
      id: +new Date(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setQuery('');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggle = (id: number, completed: boolean) => {
    setTodos(currTodos => {
      return currTodos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          completed: !completed,
        };
      });
    });
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const handleToggleAll = () => {
    setTodos(currTodos => (
      currTodos.map(todo => ({
        ...todo,
        completed: !isAllTodosCompleted,
      }))
    ));
  };

  const handleClear = () => {
    setTodos(currTodos => (
      currTodos.filter(todo => !todo.completed)
    ));
  };

  const handleRename = (id: number, title: string) => {
    setCurrTodoId(id);
    setCurrTodoTitle(title);
  };

  const handleBlur = () => {
    setTodos(currTodos => (
      currTodos.map(todo => {
        if (todo.id !== currTodoId) {
          return todo;
        }

        if (!currTodoTitle.length) {
          handleDelete(todo.id);
        }

        return {
          ...todo,
          title: currTodoTitle,
        };
      })
    ));

    setCurrTodoId(0);
    setCurrTodoTitle('');
  };

  const handleCancelEditing = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setCurrTodoId(0);
    }
  };

  return (
    <div className="todoapp">
      <Header
        handleSubmit={handleSubmit}
        handleQueryChange={handleQueryChange}
        query={query}
      />

      <section className="main">
        {!!todos.length && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={isAllTodosCompleted}
              onChange={handleToggleAll}
              data-cy="toggleAll"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodosList
          todos={filteredTodos}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
          handleRename={handleRename}
          handleBlur={handleBlur}
          setCurrTodoTitle={setCurrTodoTitle}
          handleCancelEditing={handleCancelEditing}
          currTodoId={currTodoId}
          currTodoTitle={currTodoTitle}
        />
      </section>

      {!!todos.length && (
        <Footer
          count={count}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          handleClear={handleClear}
          isSomeTodoCompleted={isSomeTodoCompleted}
        />
      )}
    </div>
  );
};
