import classNames from 'classnames';
import React, {
  useContext,
  useMemo,
  useState,
} from 'react';
import { TodoContext } from '../hoc/TodoProvider';
import { createTodo } from '../api/api';
import './TodoForm.scss';

export const TodoForm: React.FC = () => {
  const { todos, setTodos, user } = useContext(TodoContext);
  const [allCompleted, setAllCompleted] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const completedTodos = useMemo(() => {
    const count = todos.filter(todo => todo.completed === true).length;

    if (count === todos.length) {
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
    if (!allCompleted && todos) {
      setTodos(todos.map(todo => {
        if (!todo.completed) {
          return { ...todo, completed: true };
        }

        setAllCompleted(false);

        return todo;
      }));
    }

    if (allCompleted && todos) {
      setTodos(todos.map(todo => {
        if (todo.completed) {
          return { ...todo, completed: false };
        }

        setAllCompleted(true);

        return todo;
      }));
    }
  };

  const addTodo = (userId: number, title: string) => {
    if (user && title) {
      createTodo(userId, title);

      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
        userId,
      };

      setTodos((prevState: Todo[]) => ([
        ...prevState,
        newTodo,
      ]));
    }

    setInputValue('');
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (user) {
      addTodo(user?.id, inputValue);
    }
  };

  const handleKeydown:
  React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (user) {
        addTodo(user?.id, inputValue);
      }
    }
  };

  return (
    <form
      className="field field__form"
      onSubmit={handleSubmit}
    >
      <div className="control">
        <input
          type="text"
          value={inputValue}
          className="input is-primary pl-6 is-relative"
          placeholder="What needs to be done?"
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />

        {(todos && todos.length > 0) && (
          <button
            type="button"
            className={classNames(
              'button icon btnAll',
              {
                'has-text-grey-light': todos?.length !== completedTodos,
                'has-text-primary': todos?.length === completedTodos,
              },
            )}
            title="select all"
            onClick={allDoneButton}
          >
            <i className="fas fa-check" />
          </button>
        )}

        {inputValue.length > 0 && (
          <button
            type="submit"
            className="button icon has-text-primary btnAdd"
            title="add todo"
          >
            <i className="fas fa-add" />
          </button>
        )}
      </div>
    </form>
  );
};
