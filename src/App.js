import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';

 class App extends React.Component {
   state = {
     toDoListArray: [],
     toDoListArrayOriginal: [],
     selected: 'all',
   };

   componentDidMount() {
     this.setState({
       toDoListArray: JSON.parse(localStorage.getItem('todosList')) || [],
       toDoListArrayOriginal: JSON
         .parse(localStorage.getItem('originalTodosList')) || [],
     });

     this.handleButtonChange(this.state.selected);
   }

   componentDidUpdate(prevState) {
     const { toDoListArray, toDoListArrayOriginal } = this.state;
     if (toDoListArray !== prevState.todos) {
       localStorage.setItem('originalTodosList', JSON.stringify(toDoListArrayOriginal));
       localStorage.setItem('todosList', JSON.stringify(toDoListArray));
     }
   }

   handleAdd = (todo) => {
     if (todo.title) {
       this.setState(prevState => ({
         toDoListArray: [...prevState.toDoListArray, todo],
         toDoListArrayOriginal: [...prevState.toDoListArrayOriginal, todo],
       }));
     }

     this.handleButtonChange(this.state.selected);
   };

   handleDoubleClickEditTitle = (filmTitle, todoId) => {
     const mapFuncAddTitle = todo => (
       todo.id === todoId
         ? { ...todo, title: filmTitle }
         : todo
     );

     this.setState(prevState => ({
       toDoListArray: prevState.toDoListArray
        .map(mapFuncAddTitle),
       toDoListArrayOriginal: prevState.toDoListArrayOriginal
       .map(mapFuncAddTitle),
   }));
   };

   handleDelete = (todoId) => {
     const arrFilter = todo => (
       todo.id !== todoId
     );

     this.setState(prevState => ({
       toDoListArray: prevState.toDoListArray
         .filter(arrFilter),
       toDoListArrayOriginal: prevState.toDoListArrayOriginal
         .filter(arrFilter),
     }));
   };

   handleStatus = (todoId) => {
     const mapFuncCompletedTodo = todo => (
       todo.id === todoId
         ? { ...todo, completed: !todo.completed }
         : todo
     );
     this.setState(prevState => ({
       toDoListArray: prevState.toDoListArray
         .map(mapFuncCompletedTodo),
       toDoListArrayOriginal: prevState.toDoListArrayOriginal
         .map(mapFuncCompletedTodo),
     }));

     this.handleButtonChange(this.state.selected);
   };

   handleCompletedAll = () => {
     const filterFunc = arr => (
       arr.map(todo => ({
         ...todo,
         completed: !arr.every(({ completed }) => completed),
       }))
     );

     this.setState(prevState => ({
       toDoListArray: filterFunc(prevState.toDoListArray),
       toDoListArrayOriginal: filterFunc(prevState.toDoListArrayOriginal),
     }));

     this.handleButtonChange(this.state.selected);
   };

   handleButtonChange = (value) => {
     switch (value) {
       case 'active':
         this.setState(prevState => ({
           toDoListArray: prevState.toDoListArrayOriginal.filter(todo => !todo.completed),
           buttonSelected: 'active',
         }));
         break;
       case 'completed':
         this.setState(prevState => ({
           toDoListArray: prevState.toDoListArrayOriginal.filter(todo => todo.completed),
           buttonSelected: 'completed',
         }));
         break;
       case 'all':
       default:
         this.setState(prevState => ({
           toDoListArray: [...prevState.toDoListArrayOriginal],
           buttonSelected: 'all',
         }));
     }
   }

   handleDeleteAllCompleted = () => {
     const filterFunc = arr => (
       arr.filter(todo => !todo.completed)
     );

     this.setState(prevState => ({
       toDoListArray: filterFunc(prevState.toDoListArray),
       toDoListArrayOriginal: filterFunc(prevState.toDoListArrayOriginal),
     }));
   };

   render() {
     const {
       toDoListArray, toDoListArrayOriginal, selected,
     } = this.state;

     return (
       <section className="todoapp">
         <Header addNewTodo={this.handleAdd} />

         <section className="main" style={{ display: 'block' }}>
           <input
             type="checkbox"
             id="toggle-all"
             className="toggle-all"
             onChange={this.handleCompletedAll}
           />
           <label htmlFor="toggle-all">Mark all as complete</label>

           <TodoList
             todosList={toDoListArray}
             handleTodoStatus={this.handleStatus}
             handleDeleteTodo={this.handleDelete}
             handleDoubleClickEditTitle={this.handleDoubleClickEditTitle}
           />
         </section>
         <Footer
           handleButtonChange={this.handleButtonChange}
           originalTodos={toDoListArrayOriginal}
           todosList={toDoListArray}
           buttonSelected={selected}
           handleDeleteAllCompleted={this.handleDeleteAllCompleted}
         />
       </section>
     );
   }
 }

export default App;
