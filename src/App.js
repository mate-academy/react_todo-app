import React, { Component } from 'react';
import ListOfTodos from './components/ListItem/ListOfTodos';
import Footer from './components/Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfTodos: [],
      filteredTodos: [],
      valueOfMainInput: '',
      activeFilter: 'all',
    };
  }

  handleChangeMainInput = (value) => {
    this.setState({
      valueOfMainInput: value,
    });
  }

  handleSubmit = (keyCode) => {
    if (keyCode === 13) {
      this.setState(({ listOfTodos, valueOfMainInput }) => ({
        listOfTodos: [
          { title: valueOfMainInput, isChecked: false },
          ...listOfTodos,
        ],
        valueOfMainInput: '',
      }));
    }
  }

  toggleTodoState = (i) => {
    this.setState(({ listOfTodos }) => ({
      listOfTodos: listOfTodos.map(
        (todo, index) => (index === i
          ? { title: todo.title, isChecked: !todo.isChecked }
          : todo)
      ),
    }));
  }

  removeTodo = (i) => {
    this.setState(({ listOfTodos }) => ({
      listOfTodos: listOfTodos.map(
        (todo, index) => (index !== i ? todo : undefined)
      ).filter(todo => todo !== undefined),
    }));
  }

  toggleAllTodos = () => {
    this.setState(({ listOfTodos }) => ({
      listOfTodos: listOfTodos.map(({ title }) => ({
        title,
        isChecked: !listOfTodos.every(({ isChecked }) => isChecked),
      })),
    }));
  }

  changeActiveFilter = (filter) => {
    this.setState(({ listOfTodos }) => ({
      activeFilter: filter,
      filteredTodos: listOfTodos.filter(todo => (
        (filter === 'active' && todo.isChecked === false)
        || (filter === 'completed' && todo.isChecked)
      )),
    }));
  }

  removeCheckedTodos = () => {
    this.setState(({ listOfTodos }) => ({
      listOfTodos: listOfTodos.map(
        (todo, index) => (!todo.isChecked ? todo : undefined)
      ).filter(todo => todo !== undefined),
    }));
  }

  render() {
    const {
      handleChangeMainInput,
      handleSubmit,
      toggleTodoState,
      removeTodo,
      toggleAllTodos,
      changeActiveFilter,
      removeCheckedTodos,
      state: {
        listOfTodos,
        valueOfMainInput,
        activeFilter,
        filteredTodos,
      },
    } = this;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            maxLength={100}
            value={valueOfMainInput}
            onChange={event => handleChangeMainInput(event.target.value)}
            onKeyDown={e => handleSubmit(e.keyCode)}
          />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={toggleAllTodos}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ListOfTodos
            listOfTodos={activeFilter === 'all' ? listOfTodos : filteredTodos}
            toggleTodoState={toggleTodoState}
            removeTodo={removeTodo}
          />
        </section>

        <Footer
          listOfTodos={listOfTodos}
          activeFilter={activeFilter}
          changeActiveFilter={changeActiveFilter}
          removeCheckedTodos={removeCheckedTodos}
        />
      </section>
    );
  }
}

export default App;
