import { useContext } from "react"
import { FilterTodo } from "../../types/Filter"
import { TodosContext } from "../../context/TodosContext"


export const TodoFilter = () => {
  const filters: {label: string, value: FilterTodo, dataCy: string}[] = [
    {label: 'All', value: FilterTodo.All, dataCy: 'FilterLinkAll'},
    {label: 'Active', value: FilterTodo.Active, dataCy: 'FilterLinkActive'},
    {label: 'Completed', value: FilterTodo.Completed, dataCy: 'FilterLinkCompleted'}
  ];
  const {filterTodo, setFilterTodo} = useContext(TodosContext);

    return (
        <nav className="filter" data-cy="Filter">
          {filters.map((filteredValue) => (
            <a
              key={filteredValue.value}
              href="#/"
              className={`filter__link ${filterTodo === filteredValue.value ? 'selected' : ''}`}
              data-cy={filteredValue.dataCy}
              onClick={(event) => {
                event.preventDefault();
                setFilterTodo(filteredValue.value)
              }}
            >
              {filteredValue.label}
            </a>
          ))}
        </nav>
    )
}