// type Props = {};

import TodoFooter from '../footer/TodoFooter';
import TodoHeader from '../header/TodoHeader';
import TodoList from '../todoList/TodoList';

const TodoContent = () => {
  return (
    <div className="todoapp__content">
      <TodoHeader />
      <TodoList />
      <TodoFooter />
    </div>
  );
};

export default TodoContent;
