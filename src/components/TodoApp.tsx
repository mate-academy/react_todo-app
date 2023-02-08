import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../utils/useLocalStorage';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const toggleCompletedStatus = (
    todoIds: number[],
    data: Pick<Todo, 'completed'>,
  ) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todoIds.includes(todo.id)) {
        return {
          ...todo,
          completed: data.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleAllCompleted = (array: Todo[]) => {
    return !(array.some(todo => !todo.completed) || array.length === 0);
  };

  const toggleAllCompletedStatus = () => {
    const todoIds = handleAllCompleted(todos)
      ? todos.map((todo: Todo) => todo.id)
      : todos
        .filter((todo: Todo) => !todo.completed)
        .map((todo: Todo) => todo.id);

    toggleCompletedStatus(todoIds, { completed: !handleAllCompleted(todos) });
  };

  const removeTodo = (todoIds: number[]) => {
    const filteredTodos = todos.filter(
      (todo: Todo) => !todoIds.includes(todo.id),
    );

    setTodos(filteredTodos);
  };

  const onTodoDelete = (todoIds: number[]) => {
    removeTodo(todoIds);
  };

  const handleTitleChange = (todoId: number, title: string) => {
    const updatedArray = todos.map((todo: Todo) => {
      if (todo.id === todoId) {
        return ({
          ...todo,
          title,
        });
      }

      return todo;
    });

    setTodos(updatedArray);
  };

  return (
    <div className="todoapp">
      <Header addTodo={addTodo} />

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={toggleAllCompletedStatus}
          checked={handleAllCompleted(todos)}
        />
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>

        {!!todos.length && (
          <TodoList
            todos={todos}
            toggleCompletedStatus={toggleCompletedStatus}
            onTodoDelete={onTodoDelete}
            handleTitleChange={handleTitleChange}
          />
        )}
      </section>

      {!!todos.length && (
        <Footer
          todos={todos}
          onTodoDelete={onTodoDelete}
        />
      )}
    </div>
  );
};
