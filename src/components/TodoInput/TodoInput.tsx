import { useEffect, useRef, useState } from 'react';

type Props = {
  addNewTodo: (input: string) => Promise<void>;
  setError: (error: string) => void;
};

export const TodoInput: React.FC<Props> = ({
  addNewTodo,
  setError,
}) => {
  const [input, setInput] = useState<string>('');
  const [wasTodoAdded, setWasTodoAdded] = useState<boolean>(false);
  const inputElement = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (!input && inputValue === ' ') {
      return;
    }

    setInput(inputValue);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const title = input.trim();

      if (title) {
        await addNewTodo(title);
        setInput('');
        setWasTodoAdded(true);
      } else {
        throw new Error();
      }
    } catch {
      setError('Unable to add a todo without a title!');
    }
  };

  useEffect(() => {
    if (wasTodoAdded) {
      inputElement.current?.focus();

      setWasTodoAdded(false);
    }
  }, [wasTodoAdded]);

  return (
    <form
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={input}
        onChange={handleInputChange}
        ref={inputElement}
      />
    </form>
  );
};
