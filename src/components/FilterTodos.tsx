import { Status, OrderItems } from '../types/Type';

export function filterTodos(todos: OrderItems[], status: Status): OrderItems[] {
  let visibleValues = [...todos];

  if (status !== Status.ALL) {
    switch (status) {
      case Status.ACTIVE:
        visibleValues = visibleValues.filter(a => !a.completed);
        break;
      case Status.COMLETED:
        visibleValues = visibleValues.filter(a => a.completed);
        break;
      default:
        break;
    }
  }

  return visibleValues;
}
