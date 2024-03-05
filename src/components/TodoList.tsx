import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTodoContext } from '../context/GlobalContext';
import TodoItem from './TodoItem';
import { Filter } from '../types/Filter';

const TodoList = memo(() => {
  const { todos } = useTodoContext();
  const location = useLocation();
  const activeFilter = location.pathname.slice(1);

  const filteredTodos = useMemo(() => {
    switch (activeFilter) {
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [activeFilter, todos]);

  return (
    <ul className="todo-list" data-cy="todosList">
      <AnimatePresence>
        {filteredTodos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </AnimatePresence>
    </ul>
  );
});

export default TodoList;
