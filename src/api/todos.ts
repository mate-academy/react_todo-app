// api/todos.ts
import { Todo } from '../types/Todo';

export const STORAGE_KEY = 'todos';

function wait(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms));
}

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

function save(list: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function nextId(list: Todo[]) {
  const max = list.reduce((m, t) => (t.id > m ? t.id : m), 0);

  return max > 0 ? max + 1 : 1;
}

export async function getTodos(): Promise<Todo[]> {
  await wait(100);

  return load();
}

export async function addTodo(title: string): Promise<Todo> {
  await wait(100);
  const trimmed = title.trim();

  if (!trimmed) {
    throw new Error('Title should not be empty');
  }

  const list = load();
  const created: Todo = {
    id: nextId(list),
    userId: 0,
    title: trimmed,
    completed: false,
  };

  save([...list, created]);

  return created;
}

export async function updateTodo(
  id: number,
  data: Partial<Todo>,
): Promise<Todo> {
  await wait(100);
  const list = load();
  const i = list.findIndex(t => t.id === id);

  if (i === -1) {
    throw new Error('Todo not found');
  }

  const updated: Todo = { ...list[i], ...data };

  list[i] = updated;
  save(list);

  return updated;
}

export async function removeTodo(id: number): Promise<void> {
  await wait(100);
  save(load().filter(t => t.id !== id));
}
