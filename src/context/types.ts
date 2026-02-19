export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export enum FilterEnum {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type Filter = FilterEnum.All | FilterEnum.Active | FilterEnum.Completed;

export type State = {
  todos: Todo[];
  filter: Filter;
  editingId: number | null;
};
