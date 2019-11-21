import React, { useState } from 'react';
import { useRoutes, A } from "hookrouter";

const App = () => {
  const [listTodo, setlistTodo] = useState([]);
  const [todo, setTodo] = useState({title: "", id: 0, check: false, input: false});
  const [count, setCount] =  useState({id: 0, complited: 0});
  const [active, setActive] = useState("all");
  const [changeValue, setChangeValue] = useState("");

  const allComplited = () => {
    let todoAllComplited;
    if(listTodo.some(todo => todo.check === false)) {
      todoAllComplited = [...listTodo.map(todo => {
        return {...todo,
        check: true}
      }
      )];
    } else {
      todoAllComplited = [...listTodo.map(todo => {
          return { ...todo,
          check: false };
        })
      ];
    }
    setlistTodo(todoAllComplited);
  }

  const counted = () => {
    const complited = [...listTodo.filter(todo => todo.check === false)].length;
    setCount({id: count.id, complited: complited})
  }

  const createTodo = (event) => {
    const value = event.target.value.trim();
    setTodo({title: value, id: count.id, check: false, input: false});
  };

  const addTodo = (event) => {
    if(todo.title !== "") {
      listTodo.push(todo);
      setTodo({titel: "", id: 0, check: false, input: false})
      count.id++;
    }
    event.preventDefault()
    counted();
  };

  const check = (id) => {
    const todoCheck = [...listTodo.map(todo => {
      if (todo.id === id) {
        todo.check = !todo.check;
      }
      return todo;
    })]
    setlistTodo(todoCheck);
    counted();
  };

  const deleted = (id) => {
    const todoDeleted = [...listTodo]
    listTodo.map((todo, index )=> {
      if (todo.id === id) {
        todoDeleted.splice(index, 1);
      }
      return todo;
    })
    setlistTodo(todoDeleted);
    counted();
  }

  const deleteAll = () => {
    setlistTodo([]);
    counted();
  }

  const setItput = (id) => {
    const todoList = [...listTodo.map(todo => {
      if (todo.id === id) {
        todo.input = !todo.input;
      }
      return todo;
    })]

    setlistTodo(todoList);
    const todo = listTodo.find((todo) => todo.id === id)
    setChangeValue(todo.title);
  }

  const setItput1 = (id) => {
    const todoList = [...listTodo.map(todo => {
      if (todo.id === id) {
        todo.input = !todo.input;
        todo.title = changeValue;
      }
      return todo;
    })]

    setlistTodo(todoList);
  }

  const changeTitle = (event) => {
    setChangeValue(event.target.value);
  }

  const defaultValue = (id) => {
    return changeValue;
  }

  const ShowList = () => {
    setActive("all");
    return listTodo.map(todo =>{
      return (
        <li
          onDoubleClick={() => setItput(todo.id)}
          className={`${todo.check ? "completed" : ""} ${
            todo.input ? "editing" : ""
          }`}
        >
          <div className="view">
            <input
              onChange={() => check(todo.id)}
              checked={todo.check}
              type="checkbox"
              className="toggle"
            />
            <label htmlFor={todo.id}>{todo.title}</label>
            <button
              onClick={() => deleted(todo.id)}
              type="button"
              className="destroy"
            />
          </div>
          <input
            onChange={(event) => changeTitle(event)}
            autoFocus
            value={changeValue}
            type="text"
            onBlur={() => setItput1(todo.id)}
            className={"edit"}
            hidden={!todo.input}
          ></input>
        </li>
      );
    })
  };

  const ShowListActive = () => {
    setActive("active")
    return listTodo.map(todo =>{
      return (
        <li
          onDoubleClick={() => setItput(todo.id)}
          className={`${todo.check ? "completed" : ""} ${
            todo.input ? "editing" : ""
          }`}
        >
          <div className="view" id={todo.id}>
            <input
              value={defaultValue(todo.id)}
              onChange={() => check(todo.id)}
              checked={todo.check}
              type="checkbox"
              className="toggle"
            />
            <label htmlFor={todo.id}>{todo.title}</label>
            <button
              onClick={() => deleted(todo.id)}
              type="button"
              className="destroy"
            />
          </div>
          <input
            onChange={(event) => changeTitle(event)}
            autoFocus={true}
            value={defaultValue()}
            type="text"
            onBlur={() => setItput(todo.id)}
            className={"edit"}
            hidden={!todo.input}
          ></input>
        </li>
      );
    })
  };

  const ShowListComplited = () => {
    setActive("complited");
    return listTodo.map(todo =>{
      return (
        <li
          onDoubleClick={() => setItput(todo.id)}
          className={`${todo.check ? "completed" : ""} ${
            todo.input ? "editing" : ""
          }`}
        >
          <div className="view" id={todo.id}>
            <input value={defaultValue(todo.id)} onChange={() => check(todo.id)} checked={todo.check} type="checkbox" className="toggle" />
              <label htmlFor={todo.id}>{todo.title}</label>
            <button onClick={() => deleted(todo.id)} type="button" className="destroy" />
          </div>
          <input
            onChange={(event) => changeTitle(todo.id, event)}
            autoFocus={true}
            value={defaultValue(todo.id)}
            type="text"
            onBlur={() => setItput(todo.id)}
            className={"edit"}
            hidden={!todo.input}
          ></input>
        </li>
      )
    })
  };

  const routers = {
    "/": () =>  <ShowList />,
    "/active": () => <ShowListActive />,
    "/completed": () => <ShowListComplited />,
  };

  const routeResult = useRoutes(routers);
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={event => addTodo(event)}>
          <input
            value={todo.titel}
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={event => createTodo(event)}
            type="text"
          />
        </form>
      </header>

      <section className="main" style={{ display: "block" }}>
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label onClick={() => allComplited()} htmlFor="toggle-all">
          Mark all as complete
        </label>
        <ul className="todo-list">{routeResult || <ShowList />}</ul>
      </section>

      <footer className="footer" style={{ display: "block" }}>
        <span className="todo-count">
          {count.complited === 1
            ? `${count.complited} item left`
            : `${count.complited} items left`}
        </span>

        <ul className="filters">
          <li>
            <A href="/" className={`${active === "all" ? "selected" : ""}`}>
              All
            </A>
          </li>

          <li>
            <A
              href="/active"
              className={`${active === "active" ? "selected" : ""}`}
            >
              Active
            </A>
          </li>

          <li>
            <A
              href="/completed"
              className={`${active === "complited" ? "selected" : ""}`}
            >
              Completed
            </A>
          </li>
        </ul>

        <button
          onClick={() => deleteAll()}
          type="button"
          className="clear-completed"
          style={{ display: "block" }}
        >
          Clear completed
        </button>
      </footer>
    </section>
  );
}


export default App;
