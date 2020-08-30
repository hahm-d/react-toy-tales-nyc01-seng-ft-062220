import React, { Component } from 'react';

class ToyForm extends Component {

  state ={
    name:"",
    image:"",
    likes: 0
  }

  changeHandler= e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  submitHandler = e => {
    e.preventDefault()
    this.postToys(this.state)
    .then(resp => resp.json())
    .then(data => this.props.submitHandler(data))
  }

  postToys = (toyObj) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(toyObj)
  }
    return fetch("http://localhost:3000/toys", options)
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.submitHandler}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={this.changeHandler} value={this.state.name}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={this.changeHandler} value={this.state.image}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    )
  }
}
export default ToyForm;
