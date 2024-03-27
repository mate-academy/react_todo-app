import { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';
import { Todo } from '../type/Todo';
import cn from 'classnames';

type Props = {
  item: Todo;
};
export const TodoItem: React.FC<Props> = ({ item }) => {
  const [editValue, setEditValue] = useState(item.title);
  const {
    makeTodoCompleted,
    deleteTodo,
    setSelectedPost,
    selectedPost,
    updateTodo,
  } = useContext(TodosContext);

  const handleCompleted = () => {
    makeTodoCompleted(item.id, !item.completed);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateTodo(editValue, item);
      setSelectedPost(null);
    }

    if (e.key === 'Escape') {
      setSelectedPost(null);
    }
  };

  return (
    <li
      className={cn({
        completed: item.completed,
        editing: selectedPost?.id === item.id,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleCompleted}
          checked={item.completed}
        />
        <label onDoubleClick={() => setSelectedPost(item)}>{item.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(item.id)}
        />
      </div>
      <input
        type="text"
        value={editValue}
        onChange={e => setEditValue(e.target.value)}
        className="edit"
        onKeyUp={onKeyUp}
        onBlur={() => {
          updateTodo(editValue, item);
          setSelectedPost(null);
        }}
      />
    </li>
  );
};
