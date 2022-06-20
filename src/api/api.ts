const BASE_URL = 'https://mate.academy/students-api/';

export const userId = 3643;

export const request = (url: string, options?: any) => fetch(`${BASE_URL}${url}`, options)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error with loading data...');
    }

    return res.json();
  });

// Get todos
export const getTodos = (url: string) => request(url);

// Add new todo
export const addNewTodo = (url: string, title: string) => request(
  url,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      userId,
      completed: false,
    }),
  },
);

// Change todo status completed
export const changeTodoStatus = (url: string, isCompleted: boolean) => request(
  url,
  {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      { completed: isCompleted },
    ),
  },
);

// Change todo title
export const changeTodoTitle = (url: string, newTitle: string) => request(
  url,
  {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      { title: newTitle },
    ),
  },
);

// Delete todo
export const deleteTodo = (url: string) => request(
  url,
  {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  },
);
