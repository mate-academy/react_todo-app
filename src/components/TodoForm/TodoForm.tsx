import React, { useContext, useEffect, useState } from "react";
import { TodosContext } from "../../context/TodosContext";


export const TodoForm = () => {
    const [query, setQuery] = useState('');
    const {todos, addTodo} = useContext(TodosContext);

    const {inputRef} = useContext(TodosContext);

    useEffect(() => {
        inputRef.current?.focus();
    }, [todos.length]);

    const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!query.trim()) return;
        addTodo(query.trim());
        setQuery('');
    };
    
    return (
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={changeQuery}
              ref={inputRef}
            />
          </form>
    )
}