import { Reorder, AnimatePresence } from 'framer-motion';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { Filter } from '../../types/Filter';
import styles from './TodoList.module.scss';

type Props = {
  visibleTodos: Todo[],
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setFilter: React.Dispatch<React.SetStateAction<Filter>>,
  handleToggleTodo: (id: string) => void,
  handleDeleteTodo: (id: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  visibleTodos,
  setFilter,
  setTodos,
  handleToggleTodo,
  handleDeleteTodo,
  setVisibleTodos,
}) => {
  const handleReorder = (newOrder: Todo[]) => {
    setVisibleTodos(newOrder);
    setTodos(newOrder);
  };

  return (
    <Reorder.Group
      axis="y"
      values={todos}
      onReorder={handleReorder}
      className={styles.todoList}
    >
      <AnimatePresence>
        {visibleTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todos={todos}
            setFilter={setFilter}
            setTodos={setTodos}
            handleToggleTodo={handleToggleTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
