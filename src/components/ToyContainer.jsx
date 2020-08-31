import React from 'react';
import ToyCard from './ToyCard'
import ToyForm from './ToyForm'

const API = "http://localhost:3000/toys"
class ToyContainer extends React.Component{
  state = {
    toys: [],
    display: false,
    name: "",
    image: ""
  }

  componentDidMount(){
    this.reload()
  }

  reload(){
    fetch(API)
    .then(resp => resp.json())
    .then(data => this.setState({ toys: data}))
  }

  handleClick = () => {
    let flag = !this.state.display
    this.setState({ display: flag})
  }

  likeHandler = (toyObj) => {
    toyObj.likes += 1
    const settings = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({likes: toyObj.likes})  
    }
    fetch(`${API}/${toyObj.id}`, settings)
    .then(resp => resp.json())
    this.reload()
  }

  donateHandler = (toyId) => {
    fetch(`${API}/${toyId}`, {method: "DELETE"})
    this.reload()
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value //review this cool thing
    }, () => console.log(this.state.name))
  }

  submitHandler = e => {
    e.preventDefault()
    const newToyObj = {
      name: this.state.name,
      image: this.state.image,
      likes: 0
    }
    const settings = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newToyObj)      
    }
    fetch(API, settings)
    .then(resp => resp.json())
    this.reload()
  }

  render(){
    return(
    <>
      { this.state.display
        ?
      <ToyForm changeHandler={this.changeHandler} submitHandler={this.submitHandler}/>
        :
      null
    }
    <div className="buttonContainer">
      <button onClick={this.handleClick}> Add a Toy </button>
    </div>
      <div id="toy-collection">
        {this.state.toys.map(toyObj => <ToyCard toy={toyObj} donateHandler={this.donateHandler} likeHandler={this.likeHandler}/>)}
      </div>
    </>
    );
  }
}

export default ToyContainer;
