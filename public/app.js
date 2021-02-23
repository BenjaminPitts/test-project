class App extends React.Component {

  state = {
      question: '',
      answer: '',
      answer_char: '',
      point_value: '',
      input: '',
      correct: '',
      points: 0,
      quizq: [],
    }

    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value,
          input: event.target.value
        })
      }

      handleSubmit = (event) => {
        // event.preventDefault()
        axios.post('/quiz', this.state).then((response) => {
          //console.log(response.data)
          this.setState({
            quizq: [response.data],
            question: response.data.question,
            answer: response.data.answer,
            answer_char: response.data.answer_char,
            point_value: parseInt(response.data.point_value)
          })
        })
      }

      updateQuestion = (event) => {
        event.preventDefault()
        event.target.reset()
        const id = event.target.id
        axios.put('/quiz/' + id, this.state).then((response) => {
          this.getQuestion()
        })
      }

      deleteQuestion = (event) => {
        axios.delete('/quiz/' + event.target.value).then((response) => {
          this.getQuestion()
        })
      }

      getQuestion = () => {
        axios
        .get('/quiz')
        .then(
          (response) => this.setState({
            quizq: response.data,
            question: response.data[0].question,
            answer: response.data[0].answer,
            answer_char: response.data[0].answer_char,
            point_value: parseInt(response.data[0].point_value)
          }),
          (err) => console.error(err)
        )
        .catch((error) => console.error(error))
      }

      isCorrect=()=>{
        this.setState({
          correct:'CORRECT!'
        })
      }
      isIncorrect=(event)=>{
        this.setState({
          correct:'INCORRECT!'
        })
            if (this.state.points < 0) {
              this.youLose()
            }
      }
      youLose=()=>{
          this.setState({
            correct: 'YOU CLEARLY NEED MORE PRACTCE!'
          })
      }

      componentDidMount = () => {
        this.getQuestion()
      }

      addPoints=()=>{
        this.setState({
          points: this.state.points += this.state.point_value
        })
      }

      removePoints=()=>{
        this.setState({
          points:this.state.points -= this.state.point_value
        })
      }

      isTrue=(event)=>{
          //console.log(this.state)
          if(this.state.answer_char === this.state.input.toUpperCase()) {
            this.isCorrect()
            this.addPoints()
            this.getQuestion()
            event.preventDefault()
            event.target.reset()
          } else {
            this.isIncorrect()
            this.removePoints()
            event.preventDefault()
            event.target.reset()
          }
        }


  render = () => {
  return (
  <div className='container'>
    <div id='headerBar'>
      <div><h1>Quiz.js</h1></div>
      <div></div>
      <div></div>
    </div>
    <div className='main'>
    <details>
      <summary>createNewQuestion:</summary>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor='question'>enterQuestion:</label>
        <input type='text' id='question' onChange={this.handleChange} />
        <br />
        <label htmlFor='answer'>choices(A,B,C,D):</label>
        <input type='text' id='answer' onChange={this.handleChange} />
        <br />
        <label htmlFor='answer_char'>answer(A,B,C,D):</label>
        <input type='text' id='answer_char' onChange={this.handleChange} />
        <br />
        <label htmlFor='point_value'>pointValue:</label>
        <input type='text' id='point_value' onChange={this.handleChange} />
        <br />
        <input type='submit' value='createQuestion' />
        </form>
  </details>
  <br />
  <h2>currentPoints: {this.state.points}</h2><br />

   <div className='quiz'>
    {this.state.quizq.map((quiz, index) => {
      return    <div className='update' key={index}>
            <h3>question: {quiz.question}</h3>
            <h4>answer: {quiz.answer}</h4>
            <h5>pointValue: {quiz.point_value}</h5>
            <br />
            <br />
          <form onSubmit={this.isTrue}>
            <input type='text' id={quiz.id} onChange={this.handleChange} />
            <input type='submit' value='submitAnswer' />
          </form>
          <br />
          <details>
            <summary>editQuestion: </summary>
            <form id={quiz.id} onSubmit={this.updateQuestion}>
            <label htmlFor='question'>updateQuestion:</label>
            <input type='text' id='question' onChange={this.handleChange} />
            <br />
            <label htmlFor='answer'>choices(A,B,C,D):</label>
            <input type='text' id='answer' onChange={this.handleChange} />
            <br />
            <label htmlFor='answer_char'>answer(A,B,C,D):</label>
            <input type='text' id='answer_char' onChange={this.handleChange} />
            <br />
            <label htmlFor='point_value'>pointValue:</label>
            <input type='text' id='point_value' onChange={this.handleChange} />
            <br />
            <input type='submit' value='updateQuestion' />
            <br />
            <br />
            <button value={quiz.id} onClick={this.deleteQuestion}>
            deleteQuestion</button>
            </form>
          </details>

        </div>
  })}

  <div className='correct'>
  <h2>{this.state.correct}</h2>
  </div>

        </div>
      </div>
   </div>
      )

    }
  }


ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
