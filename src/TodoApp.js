import React from 'react';
import MainComponent from './MainComponent';
import Footer from './Footer';
import propTypes from './propTypes';

const TodoApp = (
  {
    todoList,
    handleCheckAll,
    checkedAll,
    addTodo,
    query,
    handleChange,
    filteredTodoList,
    deleteTodo,
    handleTodoCheck,
    selected,
    filterArray,
    deleteChecked,
    filter,
  }
) => (
  <section className="todoapp">
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={addTodo}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
    <>
      {
        todoList
        && filteredTodoList
          ? (
            <MainComponent
              todoList={todoList}
              checkedAll={checkedAll}
              handleCheckAll={handleCheckAll}
              filteredTodoList={filteredTodoList}
              deleteTodo={deleteTodo}
              handleTodoCheck={handleTodoCheck}
            />
          )
          : []
      }
    </>
    {
      todoList
      && selected
      && filterArray
        ? (
          <Footer
            todoList={todoList}
            filteredTodoList={filteredTodoList}
            selected={selected}
            filterArray={filterArray}
            deleteChecked={deleteChecked}
            filter={filter}
          />
        )
        : []
    }
  </section>
);

TodoApp.propTypes = propTypes.state;

export default TodoApp;
