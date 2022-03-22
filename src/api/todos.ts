import { Todo, TodoPropsToUpdate } from '../types/todo';

const todosAPI = 'https://mate.academy/students-api/todos';

export const getTodos = async (): Promise<Todo[]> => {
  const todos = await fetch(`${todosAPI}?userId=2450`);

  return todos.json();
};

export const postTodo = async (todo: Todo): Promise<Todo> => {
  const { title, userId, completed } = todo;
  const addedTodo = await fetch(todosAPI, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title,
      userId,
      completed,
    }),
  })
    .catch((error) => {
      window.location.replace(`${process.env.PUBLIC_URL}/hello404`);

      return error;
    });

  return addedTodo.json();
};

export const deleteTodo = async (todoId: number) => {
  return fetch(`${todosAPI}/${todoId}`, { method: 'DELETE' })
    .catch(() => window.location.replace(`${process.env.PUBLIC_URL}/hello404`));
};

export const updateTodo = async (todoId: number, propsToUpdate: TodoPropsToUpdate) => {
  return fetch(`${todosAPI}/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(propsToUpdate),
  })
    .catch(() => window.location.replace(`${process.env.PUBLIC_URL}/hello404`));
};
