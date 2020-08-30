import React from 'react';
import ToyCard from './ToyCard'
import ToyForm from './ToyForm'

class ToyContainer extends React.Component{
//create an empty state of data which will be updated based on life cycle
  state = {
    data: [],
    display: false
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

//after this container is mounted lets fetch the initial api
  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => this.setState({data: data}))
  }

  update() {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => this.setState({data: data}))
  }
  
  donateHandler = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, { method: 'DELETE'})
    this.update()
  }

  likeHandler = (toyObj) => {
    toyObj.likes += 1 
    let settings = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({likes: parseInt(toyObj.likes)})
    }
    fetch(`http://localhost:3000/toys/${toyObj.id}`, settings)
    .then(resp => resp.json())
    .then(toyObj => {
      let newArray = this.state.data.filter(toy => toy.id !== toyObj.id)
      newArray = [...newArray, toyObj]
      this.setState({data: newArray.sort((a,b) => {return a.id - b.id})})
    })
  }

  submitHandler = toyObj => {
    console.log(toyObj)
    let settings = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }
    fetch('http://localhost:3000/toys', settings)
    this.update()
  }

  render(){
    return(
    <>
      { this.state.display
        ?
      <ToyForm submitHandler={this.submitHandler}/>
        :
      null
    }
    <div className="buttonContainer">
      <button onClick={this.handleClick}> Add a Toy </button>
    </div>
      <div id="toy-collection">
        {this.state.data.map(toyObj => <ToyCard toy={toyObj} donateHandler={this.donateHandler} likeHandler={this.likeHandler}/>)}
      </div>
    </>
    );
  }
}

export default ToyContainer;
