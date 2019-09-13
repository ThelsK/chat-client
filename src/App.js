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
      this.setState({ messages })
      console.log("Messages:", messages)
    }
  }

  render() {
    return (
      <main className="App">
        {this.state.messages.map((message, index) =>
          <Message
            key={index}
            message={message}
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