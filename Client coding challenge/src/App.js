import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      api = "https://www.googleapis.com/books/v1/volumes/"
    }
  }

  handlesubmit = () => {
    event.preventDefault();
    
    
    const url = `${this.state.api}`

    const settings = {
      method: GET,
      headers: {
        'content-type' : 'applicaton-json'
      },
      body : JSON.stringify(data)
    }

    fetch(url, settings)
      .then(response => {
        if(response.ok){
          return response.json
        } else {
          throw new error (response)
        }
      })
      .then(responsejason => {
        return responsejason;
      })
      .catch(err => {
        throw new Error(err);
      })
  }

  render(){
    return(
      <div>
        BookForm
      </div>
    )
  }

}

export default App;
