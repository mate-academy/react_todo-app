import {
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';

import classNames from 'classnames';
import { TodosContext } from './TodosContext';
import { deleteTodos } from '../servises/deleteTodos';

type Props = {
  isEdit?: boolean
  onEdit?: (arg: boolean) => void
  currentId?: number
  currentTitle?: string
};

export const TodoInput: React.FC<Props> = ({
  isEdit = false,
  onEdit = () => {},
  currentId = null,
  currentTitle = null,
}) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const EditTitle = () => {
    if (isEdit && title.trim().length > 0) {
      const newTodos = [...todos].map(todo => {
        return todo.id === currentId ? { ...todo, title } : todo;
      });

      setTodos(newTodos);
    } else if (currentId) {
      deleteTodos(currentId, todos, setTodos);
    }

    if (!isEdit && title.trim().length > 0) {
      setTodos([...todos, {
        id: +new Date(),
        title,
        completed: false,
      }]);
    }

    setTitle('');
    onEdit(false);
  };

  const todoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoInput.current && isEdit) {
      todoInput.current.focus();
    }
  }, [isEdit]);

  const handleFocus = () => {
    if (currentTitle) {
      setTitle(currentTitle);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      EditTitle();
    }

    if (event.key === 'Escape' && todoInput.current) {
      todoInput.current.blur();
    }
  };

  return (
    <input
      ref={todoInput}
      value={title}
      type="text"
      // className="new-todo"
      className={classNames('new-todo', { edit: isEdit })}
      data-cy="createTodo"
      placeholder="What needs to be done?"
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      onFocus={handleFocus}
      onKeyUp={handleKeyUp}
      onBlur={EditTitle}
    />
  );
};
// className={classNames('new-todo', { edit: isEdit })}
