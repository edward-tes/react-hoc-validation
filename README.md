# react-hoc-validation
React hoc for validation form, it's only the validation logic

## How to use

```jsx
import validation from ".."

@validaton({
  rules: {
    name: [{ test: (val) => !!val, errorText: "Is Required" }],
    email: [
      { test: (val) => !!val, errorText: "Is Required" },
      {
        test: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        errorText: 'Email need to format',
      }
    ]
  }
})
export default class ValidationForm extends Component {
  state = {
    name: "",
    email: ""
  }
  handleSubmit = () => {
    const { validate } = this.props
    const { name, email } = this.state
    validate({ name, email })
  }
  handleFieldChange = (e) => {
    const field = e.target.name
    this.setState({
      [field]: e.target.value
    })
    const {errors}= this.props
    action(errors)
  }
  render() {
    const { errors, name, email } = this.props
    
    return (
      <div>
        <div>
          <label>username</label>
          <input name="name" value={name} type="text" onChange={this.handleFieldChange} />
          {errors.name.isError ? <span style={{ color: "red" }} >{errors.name.errorText}</span> : null}
        </div>
        <div>
          <label>email</label>
          <input name="email" value={email} type="text" onChange={this.handleFieldChange} />
          {/* {errors.email.isError ? <span style={{ color: "red" }} >{errors.email.errorText}</span> : null} */}
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
```


