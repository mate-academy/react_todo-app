export type Action =
  | { type: 'ADD'; payload: string }
  | { type: 'REMOVE'; payload: { id: number } }
  | { type: 'TOGGLE'; payload: { id: number } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'BLUR'; payload: { title: string; id: number } }
  | { type: 'UNCHECK_TODOS' }
  | { type: 'CHECK_ALL_TODOS' }
  | { type: 'SHOW_COMPLETED' }
  | { type: 'SHOW_ACTIVE' }
  | { type: 'SHOW_ALL' };
