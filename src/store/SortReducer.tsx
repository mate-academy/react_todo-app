type State = string;

type Action = 'all' | 'completed' | 'active';

export const SortReducer = (state: State, action: Action): State => {
  switch (action) {
    case 'all':
      return 'all';
    case 'completed':
      return 'completed';
    case 'active':
      return 'active';
    default:
      return state;
  }
};
