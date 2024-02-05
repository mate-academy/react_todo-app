import { useContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../store/TodosContext';

type Props = {
  items: Todo[],
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const [allIsCompleted, setAllIsCompleted] = useState(false);
  const { setTodos } = useContext(TodosContext);

  useEffect(() => {
    let isAllCompleted = true;

    items.forEach(item => {
      if (!item.completed) {
        isAllCompleted = false;
      }
    });

    setAllIsCompleted(isAllCompleted);
  }, [items]);

  const toggleAllCompleted = () => {
    setTodos(prev => prev.map(todo => {
      const newTodo = todo;

      newTodo.completed = !allIsCompleted;
      setAllIsCompleted(!allIsCompleted);

      return newTodo;
    }));
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={allIsCompleted}
        onChange={toggleAllCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {items.map(todo => {
          return (
            <TodoItem todo={todo} key={todo.id} />
          );
        })}
      </ul>
    </section>
  );
};
