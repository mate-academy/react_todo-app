import { useEffect, useState } from 'react';

import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { getLocalStorageItem, setLocalStorageItem } from './localStorage';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [filter, onFilterChange] = useState('all');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setTodoList(getLocalStorageItem('todos') || []);
  }, []);

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue.length > 1) {
      const time = +new Date();
      const newTodo = {
        id: time,
        title: inputValue,
        completed: false,
      };

      setTodoList(prevState => {
        setLocalStorageItem('todos', [...prevState, newTodo]);

        return [...prevState, newTodo];
      });
      setInputValue('');
    }
  };

  const handleCompletedChange = (todo) => {
    setTodoList(prevState => {
      const nextState = prevState.map(item => {
        if (item.id === todo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return item;
      });

      setLocalStorageItem('todos', nextState);

      return nextState;
    });
  };

  const handleRemove = (todo) => {
    setTodoList(prevState => {
      const nextState = prevState.filter(item => item.id !== todo.id);

      setLocalStorageItem('todos', nextState);

      return nextState;
    });
  };

  const handleTodoEdit = (todo, editTitle) => {
    setTodoList(prevState => {
      const nextState = prevState.map(item => {
        if (item.id === todo.id) {
          return {
            ...todo,
            title: editTitle,
          };
        }

        return item;
      });

      setLocalStorageItem('todos', nextState);

      return nextState;
    });
  };

  const toggleAll = () => {
    setTodoList(prevState => {
      const nextState = prevState.map(item => {
        return {
          ...item,
          completed: !item.completed,
        };
      });

      setLocalStorageItem('todos', nextState);

      return nextState;
    });
  };

  const completedTodos = todoList.filter(item => !item.completed);

  const visibleTodos = filter === 'all'
    ? todoList
    : todoList.filter(item => {
      if (filter === 'active') {
        return !item.completed;
      }

      return item.completed;
    });

  const completedRemove = () => {
    setTodoList(prevState => {
      const nextState = prevState.filter(item => !item.completed);

      setLocalStorageItem('todos', nextState);

      return nextState;
    });
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <TodoList
        todos={visibleTodos}
        toggleAll={toggleAll}
        handleRemove={handleRemove}
        handleTodoEdit={handleTodoEdit}
        handleCompletedChange={handleCompletedChange}
      />

      <footer className="footer">
        {completedTodos.length > 0 && (
          <span className="todo-count">
            {completedTodos.length}
            items left
          </span>
        )}

        <TodosFilter
          onFilterChange={onFilterChange}
        />

        <button
          type="button"
          onClick={completedRemove}
          className="clear-completed"
        >
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
