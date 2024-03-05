export type Actions = AddAction | RemoveAction | UpdateAction | ToggleAction;

type AddAction = {
  type: 'add';
  payload: {
    name: string;
  };
};

type RemoveAction = {
  type: 'remove';
  payload: {
    id: number;
  };
};

type ToggleAction = {
  type: 'toggle';
  payload: {
    id: number;
    completed: boolean;
  };
};

type UpdateAction = {
  type: 'update';
  payload: {
    id: number;
    newName: string;
  };
};
