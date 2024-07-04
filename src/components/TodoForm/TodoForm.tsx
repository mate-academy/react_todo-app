import { ChangeEvent, useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';
import { useDispatch, useGlobalState } from '../../GlobalStateProvider';
import { Type } from '../../types/Action';

export const TodoForm: React.FC = () => {
  const { title, todos } = useGlobalState();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTodo = (newTodo: Todo) => {
    dispatch({ type: Type.AddTodo, payload: newTodo });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      dispatch({ type: Type.setTitle, payload: '' });

      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    addTodo(newTodo);
    dispatch({ type: Type.setTitle, payload: '' });
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    dispatch({ type: Type.setTitle, payload: event.target.value });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleQueryChange}
        ref={inputRef}
      />
    </form>
  );
};
