import { FilterOption } from './types';

export type HandleFilterChange = (filter: FilterOption) => void;
export type HandleTodoAdd = (title: string) => boolean;
export type HandleTodoRemove = (id: number) => void;
export type HandleCompletedChange = (id: number, completed: boolean) => void;
export type HandleTitleChange = (id: number, completed: string) => void;
