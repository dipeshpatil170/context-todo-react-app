

import { Component } from 'react';
import AddTodo from './components/AddTodo';
import NotificationMessage from './components/NotificationMessage';
import TodosList from './components/TodosList';
import TodoContextProvider from './contexts/TodoContext';
import { TodoContext } from './contexts/TodoContext';
class App extends Component {
  render() {
    return (
      <div className="container">
        <TodoContextProvider>
          <TodoContext.Consumer>
            {(todoContext) => {
              return (
                <>
                  <AddTodo />
                  {todoContext.isCreateSuccess && (
                    <NotificationMessage message="Task Added Successfully..!" type="alert alert-success" />
                  )}
                  {todoContext.isUpdateSuccess && (
                    <NotificationMessage message="Task Updated Successfully..!" type="alert alert-success"  />
                  )}
                  {todoContext.isDeleteSuccess && (
                    <NotificationMessage message="Task Deleted Successfully..!" type="alert alert-danger"  />
                  )}
                  <TodosList />
                </>
              )
            }}

          </TodoContext.Consumer>
        </TodoContextProvider>
      </div>
    );
  }
  
}

export default App;
