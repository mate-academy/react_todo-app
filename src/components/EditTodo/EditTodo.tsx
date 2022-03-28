import { useRef, useLayoutEffect } from 'react';

import { useInput } from '../../lib/hooks/useInput';
import { useTodoContext } from '../../lib/shared/TodoContext';
import { ITodo } from '../../lib/types/ITodo';
import { Action } from '../../lib/enums/Action';
import { Mode } from '../../lib/enums/Mode';

import './EditTodo.scss';

type Props = {
  id: ITodo['id'];
  title: ITodo['title'];
  toggleMode: (mode: Mode) => void;
};

const EditTodo: React.FC<Props> = ({ id, title, toggleMode }) => {
  const { dispatchTodos } = useTodoContext();
  const [newTitle, , setHasError, handleNewTitleChange] = useInput(title);

  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const changeTodo = () => {
    toggleMode(Mode.VIEW);

    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      setHasError(true);
    } else {
      dispatchTodos({ type: Action.CHANGE_TODO, payload: { id, newTitle: trimmedTitle } });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeTodo();
    } else if (event.key === 'Escape') {
      toggleMode(Mode.VIEW);
    }
  };

  return (
    <input
      type="text"
      ref={inputRef}
      value={newTitle}
      className="EditTodo"
      onChange={handleNewTitleChange}
      onKeyDown={handleKeyDown}
      onBlur={changeTodo}
    />
  );
};

export { EditTodo };
