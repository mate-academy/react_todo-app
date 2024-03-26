import { Status, OrderItems } from '../types/Type';

export function filterTodos(
  orderItems: OrderItems[],
  status: Status,
): OrderItems[] {
  // const visibleValues = [...orderItems];

  // switch (status) {
  //   case Status.Active:
  //     return visibleValues.filter(a => !a.completed);
  //   case Status.Completed:
  //     return visibleValues.filter(a => a.completed);
  //   default:
  //     return visibleValues;
  // }

  return orderItems.filter(element => {
    switch (status) {
      case Status.Active:
        return !element.completed;
      case Status.Completed:
        return element.completed;
      default:
        return true;
    }
  });
}
