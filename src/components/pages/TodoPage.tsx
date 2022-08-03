import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import TodoList from '../TodoList';
import TodosFilter from '../TodosFilter';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const TodoPage = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [value, setValue] = useState('');
  const location = useLocation();
  const filterBy = location.pathname;

  const updateCompleteTodoHandler = (id: number, completed: boolean) => {
    setTodos((prevState: Todo[]) => {
      return prevState.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  };

  const updateTitleTodoHandler = (id: number, title: string) => {
    setTodos(prevState => {
      return prevState.map(todo => {
        if (todo.id === id) {
          return { ...todo, title };
        }

        return todo;
      });
    });
  };

  const deleteTodoById = (id: number) => {
    setTodos(prevState => {
      return prevState.filter(todo => {
        return todo.id !== id;
      });
    });
  };

  const visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case '/active': {
        return !todo.completed;
      }

      case '/': {
        return true;
      }

      case '/completed': {
        return todo.completed;
      }

      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(e) => {
          e.preventDefault();
          const newTodo = {
            id: +new Date(),
            title: value,
            completed: false,
          };

          if (value.length > 0) {
            setTodos(prevState => [newTodo, ...prevState]);
            setValue('');
          }
        }}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          checked={todos.every(t => t.completed)}
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={() => {
            if (todos.every(t => t.completed)) {
              setTodos(prevState => {
                return prevState.map(t => {
                  const completed = t.completed ? false : !t.completed;

                  return { ...t, completed };
                });
              });
            } else {
              setTodos(prevState => {
                return prevState.map(t => {
                  const completed = t.completed ? true : !t.completed;

                  return { ...t, completed };
                });
              });
            }
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={visibleTodos}
          onChangeComplete={updateCompleteTodoHandler}
          onClickDelete={deleteTodoById}
          onPressEnter={updateTitleTodoHandler}
        />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {todos.filter(t => !t.completed).length}
            {' '}
            items left
          </span>

          <TodosFilter />

          {todos.filter(t => t.completed).length >= 1 && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                setTodos(prevState => {
                  return prevState.filter(item => !item.completed);
                });
              }}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};

export default TodoPage;
