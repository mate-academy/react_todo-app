import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const { setTodos } = useContext(TodoContext);

  const deleteTodo = (deleteId: number) => {
    const filteredTodos = items.filter(todo => todo.id !== deleteId);

    setTodos(filteredTodos);
  };

  const toggleTodo = (toggleId: number) => {
    const copyTodos = [...items];
    const toggleTodoIndex = copyTodos.findIndex(todo => todo.id === toggleId);

    copyTodos[toggleTodoIndex].completed
      = !copyTodos[toggleTodoIndex].completed;
    setTodos(copyTodos);
  };

  const changeTodoTitle = (todoTitle: string, todoId: number) => {
    // const copyTodos = [...items];

    if (!todoTitle) {
      const newItems = [...items].filter(item => item.id !== todoId);

      setTodos(newItems);

      return;
    }

    const newItems = [...items].map(todo => {
      if (todo.id === todoId) {
        // eslint-disable-next-line no-param-reassign
        todo.title = todoTitle;
      }

      return todo;
    });

    setTodos(newItems);
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toDelete={deleteTodo}
          toToggle={toggleTodo}
          toChangeTitle={changeTodoTitle}
        />
      ))}
    </ul>
  );
};
