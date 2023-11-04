import cn from 'classnames';
import React, { useContext, useState } from 'react';
// import { DispatchVisibleItemsContext, TodosContext }
import { DispatchVisibleItemsContext }
  from '../GlobalStateProvider';
import './style.css';
import { Status } from '../../types/Status';
// import { TodoItemType } from '../../types/TodoItemType';

export const TodosFilter: React.FC = () => {
  // const setVisible = useContext(DispatchVisibleItemsContext);
  const setVisibleStatus = useContext(DispatchVisibleItemsContext);
  // const allTodos = useContext(TodosContext);

  const [allSelected, setAllSelected] = useState(true);
  const [activeSelected, setActiveSelected] = useState(false);
  const [completedSelected, setCompletedSelected] = useState(false);

  const handleSelection = (status: Status) => {
    // let visible: TodoItemType[];

    switch (status) {
      case Status.All:
        // visible = [...allTodos];
        // setVisible(visible);
        setVisibleStatus(Status.All);
        setAllSelected(true);
        setActiveSelected(false);
        setCompletedSelected(false);
        break;

      case Status.Active:
        // visible = allTodos.filter(todo => !todo.completed);
        // setVisible(visible);
        setVisibleStatus(Status.Active);
        setAllSelected(false);
        setActiveSelected(true);
        setCompletedSelected(false);
        break;

      case Status.Completed:
        // visible = allTodos.filter(todo => todo.completed);
        // setVisible(visible);
        setVisibleStatus(Status.Completed);
        setAllSelected(false);
        setActiveSelected(false);
        setCompletedSelected(true);
        break;

      default:
        break;
    }
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({ selected: allSelected })}
          onClick={() => handleSelection(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: activeSelected })}
          onClick={() => handleSelection(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: completedSelected })}
          onClick={() => handleSelection(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
