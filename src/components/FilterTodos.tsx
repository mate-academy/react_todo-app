import { useMemo } from 'react';
import { Status, OrderItems } from '../types/Type';

export function FilterTodos(
  orderItems: OrderItems[],
  status: Status,
): OrderItems[] {
  const preparedTodos = useMemo(() => {
    switch (status) {
      case Status.Active:
        return orderItems.filter(todo => !todo.completed);
      case Status.Completed:
        return orderItems.filter(todo => todo.completed);
      default:
        return orderItems;
    }
  }, [status, orderItems]);

  return preparedTodos;
  // const visibleValues = [...orderItems];

  // switch (status) {
  //   case Status.Active:
  //     return visibleValues.filter(a => !a.completed);
  //   case Status.Completed:
  //     return visibleValues.filter(a => a.completed);
  //   default:
  //     return visibleValues;
  // }

  // return orderItems.filter(element => {
  //   switch (status) {
  //     case Status.Active:
  //       return !element.completed;
  //     case Status.Completed:
  //       return element.completed;
  //     default:
  //       return element;
  //   }
  // });
}
