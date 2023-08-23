import {
  useState,
  useContext,
  useRef,
  useEffect,
  FormEvent,
} from 'react';
import { useClickAway } from 'react-use';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';

export const NewTodo = () => {
  const [value, setValue] = useState<string>('');
  const { todos, updateTodos } = useContext(TodosContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const reset = () => setValue('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const addNewTodo = () => {
    if (value.trim()) {
      const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;

      const newTodo: Todo = {
        id: newId,
        title: value,
        completed: false,
      };

      updateTodos([...todos, newTodo]);
    }

    reset();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addNewTodo();
  };

  useClickAway(formRef, addNewTodo);

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={value}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
};
