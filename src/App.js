import React from "react"
import request from "superagent"
import { serverUrl } from "./constants"

class App extends React.Component {
  state = {
    inputField: ""
  }

  source = new EventSource(`${serverUrl}/stream`)

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()
    request.post(`${serverUrl}/message`)
      .send({ text: this.state.inputField })
      .then(res => {
        console.log(res)
        this.setState({
          inputField: ""
        })
      })
      .catch(console.error)
  }


  componentDidMount() {
    this.source.onmessage = event => {
      const messages = JSON.parse(event.data)
      console.log("Messages:", messages)
    }
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <input
            name="inputField"
            type="text"
            value={this.state.inputField}
            onChange={this.onChange}
          />
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default App