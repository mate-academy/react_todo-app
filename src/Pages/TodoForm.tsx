import classNames from 'classnames';
import React, {
  useContext,
  useMemo,
  useState,
} from 'react';
import { TodoContext } from '../hoc/TodoProvider';

export const TodoForm: React.FC = () => {
  const content = useContext(TodoContext);
  const todos = content?.todos;
  const setTodos = content?.setTodos;
  const [allCompleted, setAllCompleted] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const completedTodos = useMemo(() => {
    const count = todos
      && todos.filter(todo => todo.completed === true).length;

    if (count === todos?.length) {
      setAllCompleted(true);
    } else {
      setAllCompleted(false);
    }

    return count;
  }, [todos]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  const allDoneButton = () => {
    if (!allCompleted && setTodos && todos) {
      setTodos(todos.map(todo => {
        if (!todo.completed) {
          return { ...todo, completed: true };
        }

        setAllCompleted(false);

        return todo;
      }));
    }

    if (allCompleted && setTodos && todos) {
      setTodos(todos.map(todo => {
        if (todo.completed) {
          return { ...todo, completed: false };
        }

        setAllCompleted(true);

        return todo;
      }));
    }
  };

  const addTodo = () => {
    if (inputValue && todos && setTodos) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: inputValue,
          completed: false,
        },
      ]);

      setInputValue('');
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    addTodo();
  };

  const handleKeydown:
  React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTodo();
    }
  };

  return (
    <form
      className="field"
      style={{ width: '100%' }}
      onSubmit={handleSubmit}
    >
      <div className="control">
        <input
          type="text"
          value={inputValue}
          className="input is-primary pl-6"
          placeholder="What needs to be done?"
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />

        {(todos && todos.length > 0) && (
          <button
            type="button"
            className={classNames(
              'button icon ',
              {
                'has-text-grey-light': todos?.length !== completedTodos,
                'has-text-primary': todos?.length === completedTodos,
              },
            )}
            title="select all"
            style={{
              border: 'none',
              position: 'absolute',
              top: '8px',
              left: '5px',
            }}
            onClick={allDoneButton}
          >
            <i className="fas fa-check" />
          </button>
        )}

        {inputValue.length > 0 && (
          <button
            type="submit"
            className="button icon has-text-primary"
            title="add todo"
            style={{
              border: 'none',
              position: 'absolute',
              top: '8px',
              right: '5px',
            }}
          >
            <i className="fas fa-add" />
          </button>
        )}
      </div>
    </form>
  );
};
