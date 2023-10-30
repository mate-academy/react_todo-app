export type Item = {
  id: number,
  title: string,
  completed: boolean,
};

export enum ActionType {
  ADD = 'add',
  REMOVE = 'remove',
  TOGGLE = 'toggle',
  UPDATE = 'update',
  REMOVE_COMPLETED = 'removeCompleted',
  TOGGLE_ALL = 'toggleAll',
  FILTER = 'filter',
}

export enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export type Action =
  | { type: ActionType.ADD, payload: string }
  | { type: ActionType.REMOVE, payload: number }
  | { type: ActionType.TOGGLE, payload: number }
  | { type: ActionType.UPDATE, payload: Item }
  | { type: ActionType.FILTER, payload: FilterType }
  | { type: ActionType.REMOVE_COMPLETED }
  | { type: ActionType.TOGGLE_ALL };
