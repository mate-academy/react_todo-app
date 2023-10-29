import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from './types/Todo';
import { postTodos } from './api/todos';
import { TodosContext } from './TodoContext';
import { ErrorStatus } from './types/Error';

type Props = {
  todos: Todo[],
  setTodos(todosArray: Todo[]): void,
};

export const Header: React.FC<Props> = ({
  todos,
  setTodos,
}) => {
  const {
    setTempTodo,
    setError,
  } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const focusedInput = useRef<HTMLInputElement>(null);
  const addTodo = async (todo: Omit<Todo, 'id'>) => {
    setError(ErrorStatus.none);
    setIsInputDisabled(true);

    try {
      const response = await postTodos(todo);

      setTodos([
        ...todos,
        response,
      ]);
    } catch {
      setError(ErrorStatus.add);
    }

    setTempTodo(null);
    setIsInputDisabled(false);
  };

  const handleAdding = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (todoTitle) {
      const newTodo = {
        completed: false,
        userId: 9968,
        title: todoTitle,
      };

      addTodo(newTodo);

      setTempTodo({
        id: 0,
        ...newTodo,
      });

      setTodoTitle('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  useEffect(() => {
    if (focusedInput.current) {
      focusedInput.current.focus();
    }
  }, [todos.length]);

  return (

    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleAdding}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder={isInputDisabled ? 'Adding...' : 'What needs to be done?'}
          ref={focusedInput}
          value={todoTitle}
          disabled={isInputDisabled}
          onChange={handleChange}
        />
      </form>
    </header>

  );
};
