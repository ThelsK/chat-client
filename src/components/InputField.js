import React from "react"

export default function InputField(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input
        name="inputField"
        type="text"
        value={props.values.inputField}
        onChange={props.onChange}
      />
      <button>Send</button>
    </form>
  )
}



