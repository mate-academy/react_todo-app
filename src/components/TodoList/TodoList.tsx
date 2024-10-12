import { useContext } from 'react';
import { TodosContext } from '../TodoAppContext/TodoAppContext';
import { TodoStatus } from '../../types/TodoStatus';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

function getVisibleTodos(todos: Todo[], status: TodoStatus) {
  const copyTodos = [...todos];

  if (status === TodoStatus.Active) {
    return copyTodos.filter(todo => !todo.completed);
  }

  if (status === TodoStatus.Completed) {
    return copyTodos.filter(todo => todo.completed);
  }

  return copyTodos;
}

export const TodoList: React.FC = () => {
  const { todos, filterStatus } = useContext(TodosContext);

  const visibleTodos = getVisibleTodos(todos, filterStatus);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.length !== 0 &&
        visibleTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </section>
  );
};
