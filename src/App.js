import React from 'react';
import TodoList from './TodoList';
import Footer from './Footer';

const todoLocalStorage = JSON.parse(localStorage.getItem('todoList')) || [];

class App extends React.PureComponent {
  state = {
    todoList: [],
    newTodoId: todoLocalStorage.length,
    completed: false,
    title: '',
    selectedView: 'All',
  }

  componentDidMount() {
    this.setState({ todoList: [...todoLocalStorage] });
  }

  componentDidUpdate() {
    localStorage.setItem('todoList', JSON.stringify([...this.state.todoList]));
  }

  clearCompleted = () => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => !todo.completed),
    }));
  }

  makeCompletedAll = () => {
    if (this.state.todoList.every(todo => todo.completed)) {
      this.setState(state => ({
        todoList: state.todoList.map(todo => (
          {
            ...todo,
            completed: false,
          }
        )),
      }));
    } else {
      this.setState(state => ({
        todoList: state.todoList.map(todo => (
          {
            ...todo,
            completed: true,
          }
        )),
      }));
    }
  }

  makeCompleted = (id) => {
    this.setState(state => ({
      todoList: state.todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  detectUncompletedItems = () => (
    this.state.todoList.filter(el => !el.completed).length
  )

  deleteItem = (id) => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => todo.id !== id),
    }));
  }

  addTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  resetState = () => {
    this.setState(state => ({
      title: '',
      newTodoId: state.newTodoId + 1,
    }));
  }

  addNewTodo = (event) => {
    event.preventDefault();
    if (this.state.title.length > 0) {
      this.setState(state => ({
        todoList: [
          ...state.todoList,
          {
            title: state.title,
            id: state.newTodoId + 1,
            completed: state.completed,
          },
        ],
      }));
    }

    this.resetState();
  }

  selectActiveView = () => {
    switch (this.state.selectedView) {
      case 'Active':
        return this.state.todoList.filter(el => !el.completed);
      case 'Completed':
        return this.state.todoList.filter(el => el.completed);
      default:
        return this.state.todoList;
    }
  }

  setViewMode = (event) => {
    switch (event.target.id) {
      case 'active':
        this.setState({ selectedView: 'Active' });
        break;
      case 'completed':
        this.setState({ selectedView: 'Completed' });
        break;
      default:
        this.setState({ selectedView: 'All' });
    }
  }

  render() {
    const { todoList, title, selectedView } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.addNewTodo}>
            <input
              value={title}
              onChange={this.addTitle}
              className="new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        <section className="main">
          <input
            checked={todoList.length > 0 && this.detectUncompletedItems() === 0}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.makeCompletedAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={this.selectActiveView()}
            completed={this.makeCompleted}
            deleteItem={this.deleteItem}
          />
          {todoList.length > 0 && (
            <Footer
              uncompleted={this.detectUncompletedItems}
              setViewMode={this.setViewMode}
              selectedView={selectedView}
              clearCompleted={this.clearCompleted}
              todoList={this.state.todoList}
            />
          )}
        </section>
      </section>
    );
  }
}

export default App;
