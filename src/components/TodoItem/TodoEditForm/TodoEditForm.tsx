import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodoListContext } from '../../../context/TodoListContext';

type Props = {
  todoId: number,
  todoTitle: string,
  exitEditionMode: () => void,
};

export const TodoEditForm: React.FC<Props> = React.memo(({
  todoId,
  todoTitle,
  exitEditionMode,
}) => {
  const [title, setTitle] = useState(todoTitle);
  const {
    handleTodoRename,
    handleRemoveButtonClick,
  } = useContext(TodoListContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      setTitle(inputValue);
    }, [],
  );

  const sumbitEdition = () => {
    const normalizedTitle = title.trim();

    switch (normalizedTitle) {
      case '':
        handleRemoveButtonClick(todoId);

        return;
      case todoTitle:
        break;
      default:
        handleTodoRename(todoId, normalizedTitle);
        break;
    }

    exitEditionMode();
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      sumbitEdition();
    }, [sumbitEdition],
  );

  const handleKeyUp = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      exitEditionMode();
    }
  }, [exitEditionMode]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        ref={inputRef}
        onKeyUp={handleKeyUp}
        onBlur={sumbitEdition}
        onChange={handleInputChange}
      />
    </form>
  );
});
