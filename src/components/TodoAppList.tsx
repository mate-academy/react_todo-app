import { useContext } from 'react';
import { TodoAppCard } from './TodoAppCard';
import { TodosContext } from '../services/Store';

export const TodoAppList: React.FC = () => {
  const { setTodos, todos, filteredTodos } = useContext(TodosContext);

  const allTodosSelected = todos.every(todo => todo.completed);

  const selectedCard = (cardId: number) => {
    const copiedTodos = [...todos];

    copiedTodos.map((todo) => {
      const todoElement = todo;

      if (todo.id === cardId) {
        todoElement.completed = !todo.completed;
      }

      return todoElement;
    });

    setTodos(copiedTodos);
  };

  const updateTodoTitile = (id: number, title: string) => {
    const copiedTodos = [...todos];

    if (!title.length) {
      const indexOfTodo = copiedTodos.findIndex(todo => todo.id === id);

      copiedTodos.splice(indexOfTodo, 1);
    }

    copiedTodos.map((todo) => {
      const todoElement = todo;

      if (todo.id === id) {
        todoElement.title = title;
      }

      return todoElement;
    });

    setTodos(copiedTodos);
  };

  const removeCard = (cardId: number) => {
    const withoutRemoved = [...todos].filter((todo) => {
      return todo.id !== cardId;
    });

    setTodos(withoutRemoved);
  };

  const allTodosSelectedHandler = () => {
    const copiedTodos = [...todos];

    copiedTodos.map((todo) => {
      const todoElement = todo;

      if (allTodosSelected) {
        todoElement.completed = false;
      } else {
        todoElement.completed = true;
      }

      return todoElement;
    });

    setTodos(copiedTodos);
  };

  return (
    <section className="main">
      <input
        onChange={allTodosSelectedHandler}
        checked={allTodosSelected}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label
        htmlFor="toggle-all"
        title={allTodosSelected
          ? 'Mark all as no completed'
          : 'Mark all as completed'}
      >
        Mark all as complete
      </label>
      <ul className="todo-list" data-cy="todoList">
        {
          filteredTodos.map(todo => (
            <TodoAppCard
              key={todo.id}
              todo={todo}
              onChecked={selectedCard}
              onRemove={removeCard}
              onModofiedTitile={updateTodoTitile}
            />
          ))
        }
      </ul>
    </section>
  );
};
