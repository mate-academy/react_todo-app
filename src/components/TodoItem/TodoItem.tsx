import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import { IconDelete } from '../UI/IconDelete';
import { IconEdit } from '../UI/IconEdit';
import { Checkbox } from '../UI/Checkbox';
import styles from './TodoItem.module.scss';

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setFilter: React.Dispatch<React.SetStateAction<Filter>>,
  handleToggleTodo: (id: string) => void,
  handleDeleteTodo: (id: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  handleToggleTodo,
  handleDeleteTodo,
  setTodos,
  setFilter,
}) => {
  const { id, text, completed } = todo;
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [newText, setNewText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditTodo]);

  useEffect(() => {
    setTimeout(() => {
      setIsCompleted(completed);
    }, 1000);
  }, [completed]);

  const handleEditTodo = () => {
    setIsEditTodo(false);

    if (newText === text || !newText.trim()) {
      setNewText(text);

      return;
    }

    setFilter(Filter.All);

    setTodos(todos.map(task => {
      return task.id === id
        ? { ...task, text: newText }
        : { ...task };
    }));
  };

  const handleSubmitEditTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleEditTodo();
  };

  const handleInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      setNewText(text);
      setIsEditTodo(false);
    }
  };

  return (
    <Reorder.Item
      className={styles.todoItem}
      value={todo}
      key={id}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: -600, opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileDrag={{
        scale: 1.1,
        boxShadow: (
          'rgba(0, 0, 0, 0.3) 0 19px 38px, rgba(0, 0, 0, 0.22) 0 15px 12px'
        ),
      }}
    >
      <div className={styles.container}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={() => handleToggleTodo(id)}
          checked={completed}
        />

        <Checkbox completed={completed} isCompleted={isCompleted} />

        {isEditTodo ? (
          <form onSubmit={handleSubmitEditTodo}>
            <input
              type="text"
              className="todo__title-field"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={handleEditTodo}
              onKeyUp={handleInputKeyUp}
              ref={inputRef}
            />
          </form>
        ) : (
          <p className={styles.text}>
            {text}
          </p>
        )}
      </div>

      <div className={styles.buttonBox}>
        <AnimatePresence initial={false}>
          {!completed && (
            <motion.button
              type="button"
              initial={{ rotate: -45, x: 15, opacity: 0 }}
              animate={{ rotate: 0, x: 0, opacity: 1 }}
              exit={{ rotate: -45, x: 15, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsEditTodo(true)}
            >
              <IconEdit />
            </motion.button>
          ) }
        </AnimatePresence>

        <button
          type="button"
          onClick={() => handleDeleteTodo(id)}
        >
          <IconDelete />
        </button>
      </div>
    </Reorder.Item>
  );
};
