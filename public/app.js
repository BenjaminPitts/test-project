class App extends React.Component {

  state = {
    name: '',
    age: '',
    contacts:[],
  }

  handleChange =  (event) => {
      this.setState({
        [event.target.id]: event.target.value
      })
    }

  handleSubmit = event => {
  event.preventDefault()
  axios.post('/contacts', this.state)
    .then(response =>
      this.setState({
      contacts: response.data,
      name: '',
      age: '',
    })
  )
}

deleteGear = (event) => {
  axios.delete('/contacts/' + event.target.value)
  .then((response) => {
    this.setState({
      contacts: response.data
    })
  })
}

updateGear = (event) => {
  event.preventDefault()
  const id = event.target.id
  axios.put('/contacts/' + id, this.state).then((response) => {
    this.setState({
      contacts: response.data,
      name: '',
      age: '',
    })
  })
}

showStats=(event)=>{
  event.preventDefault()
  let stats = this.state.showStats
  axios.get('/contacts/' + event.target.id).then((response)=>{

      if(stats) {
        this.setState({
          showStats:false,
          contacts: response.data
        })
      } else {
        this.setState({
          showStats:true,
          contacts: response.data
        })
      }
  })
}

componentDidMount = () => {
  axios.get('/contacts').then((response) => {
    this.setState({
      contacts: response.data
    })
  })
}

render = () => {
        return <div className='main'>
            <h1 id='top'>Test-Project</h1>
            <h2><i>List of Contacts:</i></h2>
            <br />
            <div className='create'>
            <section id="add">
                <form className='formi' onSubmit={this.handleSubmit}>
                    <label htmlFor="type">Name:  </label>
                    <input required type="text" id="name" value={this.state.name} onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="make">Age: </label>
                    <input type="text" id="age" value={this.state.age} onChange={this.handleChange}/>

                    <br/>
                    <input type="submit" value="Add Contact" />
                </form>
                </section>
                </div>
                <br />
                <br />
                <button value={this.state._id} onClick={this.showStats}>
                Show Details</button><br />

            <section id="mid">
            <br />
            <div className='itemBox'>
                {this.state.contacts.map((contact) => {
                    return <div className='item' key={contact._id}>

                        <h2>Name: <i>{contact.name}</i></h2>
                        <h4>{ this.state.showStats ? 'Name: ' + contact.name : null }</h4>
                        <h4>{ this.state.showStats ? 'Age: ' + contact.age : null }</h4>

                        <br/>
                        { this.state.showStats ? <details>
                            <summary>Edit {contact.name} Details</summary>
                            <form id={contact._id} onSubmit={this.updateGear}>
                                <label htmlFor="name">Name: </label>
                                <input
                                type="text"
                                id="name"
                                defaultValue={contact.name}
                                onChange={this.handleChange} />
                                <br />
                                <label htmlFor="age">Age: </label>
                                <input
                                type="text"
                                id="age"
                                defaultValue={contact.age}
                                onChange={this.handleChange} />
                                <br />
                                <input type="submit" value="Update Details" />
                            </form>
                        </details> : null }
                        <br />
                        { this.state.showStats ? <button value={contact._id} onClick={this.deleteGear}>Remove</button> : null }
                    </div>
                })}
                </div>
            </section>
            <br />
            <br />

        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
