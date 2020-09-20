import React from 'react';

// eslint-disable-next-line arrow-body-style
export const TodosFilter = () => {
  // const [filterForTodos, setFilterForTodos] = useState('All');
  // const [filteredTodos, setFilteredTodos] = useState();

  // useEffect(() => {
  //   setFilteredTodos(prevTodos => (
  //     filterForTodos === 'All'
  //       ? prevTodos
  //       : prevTodos.filter(todo => (
  //         filterForTodos === 'Comleted'
  //           ? todo.completed
  //           : !todo.completed
  //       ))
  //   ));
  // }, [filterForTodos]);

  // const selectTodosFilter = (event) => {
  //   event.preventDefault();
  //   console.log(event.target.value);
  //   setFilterForTodos(event.target.value);
  // };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className="selected"
          // onClick={event => selectTodosFilter(event)}
          // value="All"
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          // onClick={event => selectTodosFilter(event)}
          // value="Active"
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          // onClick={event => selectTodosFilter(event)}
          // value="Completed"
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
