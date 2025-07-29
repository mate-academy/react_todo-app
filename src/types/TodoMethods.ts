import { Todo } from './Todo';

export type TodoRemoveHandler = (id: number) => Promise<void>;
export type TodoCreateHandler = (title: string) => Promise<void>;
export type TodoRemoveCompletedHandler = () => void;
export type TodoToggleAll = () => void;
export type TodoUpdate = (todo: Todo, newData: Partial<Todo>) => Promise<void>;
export type TodoRename = (todo: Todo, newTitle: Todo['title']) => Promise<void>;
