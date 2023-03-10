import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  todoNewTitle: string;
  setTodoNewTitle: Dispatch<SetStateAction<string>>;
  editingHandler: (id: number, newData: string, oldData: string) => void;
  cancelEditingHandler: () => void;
};

export const EditingForm: React.FC<Props> = (props) => {
  const {
    todo,
    todoNewTitle,
    setTodoNewTitle,
    editingHandler,
    cancelEditingHandler,
  } = props;

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      editingHandler(todo.id, todoNewTitle, todo.title);
    }

    if (e.key === 'Escape') {
      cancelEditingHandler();
    }
  };

  const editingTitle = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingTitle.current) {
      editingTitle.current.focus();
    }
  }, []);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        className="todo__title-field"
        value={todoNewTitle}
        ref={editingTitle}
        onChange={e => setTodoNewTitle(e.target.value)}
        onKeyDown={e => handleKeypress(e.nativeEvent)}
        onBlur={() => editingHandler(todo.id, todoNewTitle, todo.title)}
      />
    </form>
  );
};
