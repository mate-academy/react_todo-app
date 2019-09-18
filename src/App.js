import React, { Component } from 'react';
import ListOfTodos from './components/ListOfTodos/ListOfTodos';
import Footer from './components/Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfTodos: [],
      filteredTodos: [],
      valueOfMainInput: '',
      activeFilter: 'all',
      counter: 0,
    };
  }

  handleChangeMainInput = (value) => {
    this.setState({
      valueOfMainInput: value.replace(/^\s/, ''),
    });
  }

  handleSubmit = (keyCode) => {
    if (keyCode === 13) {
      this.setState(({ listOfTodos, valueOfMainInput, counter }) => ({
        counter: counter + 1,
        listOfTodos: [
          { title: valueOfMainInput, isChecked: false, id: counter },
          ...listOfTodos,
        ],
        filteredTodos: [
          { title: valueOfMainInput, isChecked: false, id: counter },
          ...listOfTodos,
        ],
        valueOfMainInput: '',
      }));
    }
  }

  toggleTodoState = (id) => {
    this.setState(({ listOfTodos, filteredTodos, activeFilter }) => ({
      listOfTodos: listOfTodos.map(
        todo => (todo.id === id
          ? { title: todo.title, isChecked: !todo.isChecked, id: todo.id }
          : todo)
      ),
      filteredTodos: filteredTodos.map(
        todo => (todo.id === id
          ? { title: todo.title, isChecked: !todo.isChecked, id: todo.id }
          : todo)
      ).filter(todo => (
        (activeFilter === 'active' && todo.isChecked === false)
        || (activeFilter === 'completed' && todo.isChecked)
      )),
    }));
  }

  removeTodo = (id) => {
    this.setState(({ listOfTodos }) => ({
      listOfTodos: listOfTodos.map(
        todo => (todo.id !== id ? todo : undefined)
      ).filter(todo => todo !== undefined),
      filteredTodos: listOfTodos.map(
        todo => (todo.id !== id ? todo : undefined)
      ).filter(todo => todo !== undefined),
    }));
  }

  toggleAllTodos = () => {
    this.setState(({ listOfTodos }) => ({
      listOfTodos: listOfTodos.map(({ title }) => ({
        title,
        isChecked: !listOfTodos.every(({ isChecked }) => isChecked),
      })),
      filteredTodos: listOfTodos.map(({ title }) => ({
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
    this.setState(({ listOfTodos, filteredTodos }) => ({
      listOfTodos: listOfTodos.map(
        todo => (!todo.isChecked ? todo : undefined)
      ).filter(todo => todo !== undefined),
      filteredTodos: filteredTodos.map(
        todo => (!todo.isChecked ? todo : undefined)
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
        counter,
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
            counter={counter}
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
