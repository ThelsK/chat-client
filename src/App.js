import React from "react"
import request from "superagent"
import { serverUrl } from "./constants"
import InputField from "./components/InputField"
import Message from "./components/Message"

class App extends React.Component {
  state = {
    messages: [],
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
        this.setState({
          inputField: ""
        })
      })
      .catch(console.error)
  }

  componentDidMount() {
    this.source.onmessage = event => {
      this.setState({
        messages: this.state.messages
          .concat(JSON.parse(event.data))
      })
    }
  }

  render() {
    return (
      <main className="App">
        {this.state.messages.map(message =>
          <Message
            key={message.id}
            message={message.text}
          />
        )}
        < InputField
          values={this.state}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </main>
    )
  }
}

export default App