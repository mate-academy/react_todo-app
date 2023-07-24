import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const { setTodo } = useContext(TodoContext);

  const deleteTodo = (deleteId: number) => {
    const filteredTodos = items.filter(todo => todo.id !== deleteId);

    setTodo(filteredTodos);
  };

  const toggleTodo = (toggleId: number) => {
    const cTodos = [...items];
    const toggleTodoIndex = cTodos.findIndex(todo => todo.id === toggleId);

    cTodos[toggleTodoIndex].completed = !cTodos[toggleTodoIndex].completed;
    setTodo(cTodos);
  };

  const changeTodoTitle = (todoTitle: string, todoId: number) => {
    const cTodos = [...items];
    const changeTodoIndex = cTodos.findIndex(todo => todo.id === todoId);

    if (!todoTitle) {
      cTodos.splice(changeTodoIndex, 1);
      setTodo(cTodos);

      return;
    }

    cTodos[changeTodoIndex].title = todoTitle;
    setTodo(cTodos);
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
