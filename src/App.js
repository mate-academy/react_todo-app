import React, { Component } from 'react';
import ListOfTodos from './components/ListOfTodos/ListOfTodos';
import TodosFilter from './components/TodosFilter/TodosFilter';

class App extends Component {
  state = {
    listOfTodos: JSON.parse(localStorage.getItem('listOfTodos')) || [],
    counter: JSON.parse(localStorage.getItem('listOfTodos')) || 0,
    valueOfMainInput: '',
    activeFilter: 'all',
    valueOfEditingInput: '',
  }

  componentDidUpdate(prevProps, prevState) {
    const listOfTodos = JSON.stringify(this.state.listOfTodos);
    const counter = JSON.stringify(this.state.counter);

    if (JSON.stringify(prevState.listOfTodos) !== listOfTodos) {
      localStorage.setItem('listOfTodos', listOfTodos);
    }

    if (JSON.stringify(prevState.counter) !== counter) {
      localStorage.setItem('counter', counter);
    }
  }

  handleChangeMainInput = (value) => {
    this.setState({
      valueOfMainInput: value.replace(/^\s+/, ''),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.valueOfMainInput) {
      this.setState(({ listOfTodos, valueOfMainInput, counter }) => ({
        counter: counter + 1,
        listOfTodos: [
          {
            title: valueOfMainInput,
            isChecked: false,
            isEditing: false,
            id: counter,
          },
          ...listOfTodos,
        ],
        valueOfMainInput: '',
      }));
    }
  }

  toggleTodoState = (id) => {
    this.setState(({ listOfTodos }) => ({
      listOfTodos: listOfTodos.map(
        todo => (todo.id === id
          ? {
            title: todo.title,
            isChecked: !todo.isChecked,
            isEditing: todo.isEditing,
            id: todo.id,
          }
          : todo)
      ),
    }));
  }

  removeTodo = (id) => {
    this.setState(({ listOfTodos }) => ({
      listOfTodos: listOfTodos.map(
        todo => (todo.id !== id ? todo : undefined)
      ).filter(todo => todo !== undefined),
    }));
  }

  toggleAllTodos = () => {
    this.setState(({ listOfTodos }) => ({
      listOfTodos: listOfTodos.map(({ title, id, isEditing }) => ({
        title,
        isChecked: !listOfTodos.every(({ isChecked }) => isChecked),
        isEditing,
        id,
      })),
    }));
  }

  changeActiveFilter = (filter) => {
    this.setState({
      activeFilter: filter,
    });
  }

  removeCheckedTodos = () => {
    this.setState(({ listOfTodos }) => ({
      listOfTodos: listOfTodos.map(
        todo => (!todo.isChecked ? todo : undefined)
      ).filter(todo => todo),
    }));
  }

  toggleToEditingMode = (id, value) => {
    this.setState(({ listOfTodos }) => ({
      listOfTodos: listOfTodos.map(
        todo => (todo.id === id
          ? {
            title: todo.title,
            isChecked: todo.isChecked,
            isEditing: !todo.isEditing,
            id: todo.id,
          }
          : todo
        )
      ),
      valueOfEditingInput: value,
    }));
  }

  handleEditing = (value) => {
    this.setState({
      valueOfEditingInput: value.replace(/^\s+/, ''),
    });
  }

  handleEditedSubmit = (id) => {
    this.setState(({ listOfTodos, valueOfEditingInput }) => ({
      listOfTodos: listOfTodos.map(
        todo => (todo.id === id
          ? {
            title: valueOfEditingInput,
            isChecked: todo.isChecked,
            isEditing: !todo.isEditing,
            id: todo.id,
          }
          : todo)
      ),
      valueOfEditingInput: '',
    }));
  };

  render() {
    const {
      listOfTodos,
      valueOfMainInput,
      activeFilter,
      valueOfEditingInput,
    } = this.state;

    const filteredTodos = activeFilter === 'active'
      ? listOfTodos.filter(todo => !todo.isChecked)
      : listOfTodos.filter(todo => todo.isChecked);

    return (
      <section className="todoapp">
        <header className="header">
          <h1 className="title">todos</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              maxLength={100}
              value={valueOfMainInput}
              onChange={event => this.handleChangeMainInput(event.target.value)}
            />
          </form>
        </header>

        <section className="main">
          {listOfTodos.length > 0 && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                checked={listOfTodos.every(todo => todo.isChecked)}
                onClick={this.toggleAllTodos}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          )}
          <ListOfTodos
            listOfTodos={activeFilter === 'all' ? listOfTodos : filteredTodos}
            toggleTodoState={this.toggleTodoState}
            removeTodo={this.removeTodo}
            toggleToEditingMode={this.toggleToEditingMode}
            handleEditing={this.handleEditing}
            valueOfEditingInput={valueOfEditingInput}
            handleEditedSubmit={this.handleEditedSubmit}
          />
        </section>

        <TodosFilter
          listOfTodos={listOfTodos}
          activeFilter={activeFilter}
          changeActiveFilter={this.changeActiveFilter}
          removeCheckedTodos={this.removeCheckedTodos}
        />
      </section>
    );
  }
}

export default App;
