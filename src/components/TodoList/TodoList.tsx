import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  filteredTodo: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodo }) => {
  const { todos, setTodos } = useContext(TodosContext);

  function toggleTodo(id: number) {
    setTodos(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function removeTodo(id: number) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const updateTodo = (id: number, title: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, title } : todo)));
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodo.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ))}
    </section>
  );
};
