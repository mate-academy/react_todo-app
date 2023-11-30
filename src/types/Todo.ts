import { todos } from '../api/todos';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const actions = [
  {
    type: 'add',
    // payload: { id: 7, title: 'learn DOTA 2', complited: true },
  },
];

interface Action {
  type: string;
}
// type Action = { type: 'add'; payload: Todo }
// // eslint-disable-next-line @typescript-eslint/indent
//             | { type: 'delete' };

function reducer(todoss: [], action: Action) {
  switch (action.type) {
    case 'add':
      return 3 + 4;
      // [
      //   ...todoss,
      //   // action.payload,
      // ];
    case 'delete':
      return todoss;
    default:
      return todoss;
  }
}

console.log(actions.reduce(reducer, todos));
