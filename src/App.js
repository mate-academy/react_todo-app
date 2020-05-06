import React, { PureComponent } from 'react';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const todosFromServer = JSON.parse(localStorage.getItem('todos')) || [];
const pattern = /^[A-Za-z0-9\s]+$/giu;

class App extends PureComponent {
  state = {
    todoList: [...todosFromServer],
    editingTodoId: 0,
    activeFilter: 'all',
    selectedAll: false,
  }

  componentDidMount() {
    this.checkSelectedAll();
  }

  componentDidUpdate() {
    const { todoList } = this.state;

    localStorage.setItem('todos', JSON.stringify([...todoList]));
    this.checkSelectedAll();
  }

  addNewTodo = (title) => {
    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          id: +new Date(),
          title,
          completed: false,
        },
      ],
      selectedAll: false,
    }));
  }

  toggleTodoStatus = (id) => {
    this.setState(state => ({
      todoList: state.todoList.map(todo => (
        (todo.id === id)
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo
      )),
      selectedAll: false,
    }), this.checkSelectedAll());

    this.checkSelectedAll();
  };

  toggleTodoAllStatus = ({ target }) => {
    this.setState(state => ({
      ...state,
      todoList: [...state.todoList].map(todo => ({
        ...todo,
        completed: !state.selectedAll,
      })),
      selectedAll: !state.selectedAll,
    }));
  }

  checkSelectedAll = () => {
    const { todoList } = this.state;
    const activeTodos = todoList.filter(todo => todo.completed).length

    this.setState(state => ({ selectedAll: activeTodos === todoList.length }))
  }

  setEditingId =(id) => {
    this.setState(state => ({
      ...state,
      editingTodoId: id || 0,
    }));
  }

  setTodoValue = (id, field, value) => {
    this.setState(state => ({
      ...state,
      todoList: [...state.todoList].map(todo => (
        todo.id === id
          ? {
            ...todo,
            [field]: value,
          }
          : todo
      )),
      editingTodoId: 0,
    }));
  }

  deleteTodo = (id) => {
    this.setState(state => ({
      todoList: [...state.todoList].filter(todo => todo.id !== id),
    }));
  }

  setFilter = (e) => {
    e.preventDefault();

    const { id } = e.target;

    this.setState({ activeFilter: id });
  }

  getFilteredTodos = () => {
    const { todoList, activeFilter: filter } = this.state;

    if (filter === 'completed') {
      return todoList.filter(todo => todo.completed);
    }

    if (filter === 'active') {
      return todoList.filter(todo => !todo.completed);
    }

    return todoList;
  }

  clearComplited = () => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { todoList, editingTodoId, activeFilter, selectedAll } = this.state;
    const filteredTodoList = this.getFilteredTodos();

    return (
      <section className="todoapp">
        <Header addNewTodo={this.addNewTodo} pattern={pattern} />

        <TodoList
          todoList={filteredTodoList}
          editingTodoId={editingTodoId}
          selectedAll={selectedAll}
          toggleTodoStatus={this.toggleTodoStatus}
          toggleTodoAllStatus={this.toggleTodoAllStatus}
          deleteTodo={this.deleteTodo}
          setEditingId={this.setEditingId}
          setTodoValue={this.setTodoValue}
          pattern={pattern}
        />

        <Footer
          todoList={todoList}
          activeFilter={activeFilter}
          setFilter={this.setFilter}
          clearComplited={this.clearComplited}
        />
      </section>
    );
  }
}

export default App;
