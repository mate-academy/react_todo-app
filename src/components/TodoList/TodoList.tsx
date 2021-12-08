import { TodoItem } from '../TodoItem';

import { ITodo } from '../../lib/types/ITodo';

import './TodoList.scss';

type Props = {
  todos: ITodo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map(({ id, title, completed }) => (
        <TodoItem
          key={id}
          id={id}
          title={title}
          completed={completed}
        />
      ))}
    </ul>
  );
};

export { TodoList };
