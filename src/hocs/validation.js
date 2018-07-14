import React from 'react'
import { displayName } from 'utils'

/**
 *
 * @param {Object} option
 * {
 *  rules: {
 *    [field]: [
 *      { test: /regex/, errorText: ""},
 *      { test: {Function}, errorText: "require"},
 *    ]
 * }
 * }
 */
export default function validation (option) {
  return Comp => {
    const ruleMap = option.rules
    if(!ruleMap) {
      throw Error("Validation need rules property")
    }
    let initErrors = {}
    Object.keys(ruleMap).forEach(r => {
      initErrors[r] = { isError: false }
    })

    class Wrapper extends React.PureComponent {
      state = {
        errors: initErrors,
      }
      render () {
        return <Comp validate={this.validate} errors={this.state.errors} />
      }
      validate = (values) => {
        let errors = Object.assign({}, this.state.errors) // {[field]: {isError: {Boolean}, errorText: {string}} }
        Object.keys(values).map(key => {
          const rules = ruleMap[key]
          const val = values[key]
          let testRes = null
          
          if(!rules || (rules && !rules.length)) {
            errors[key] = {isError: false} 
            return
          }
          for (let i = 0, len = rules.length; i < len; i++) {
            const { test: r, errorText } = rules[i]
            if (this.checkRule(val, r)) {
              testRes = { isError: false }
            } else {
              testRes = { isError: true, errorText }
              break
            }
          }
          errors[key] = testRes
        })
        this.setErrors(errors)
        return !Object.values(errors).map(m => m.isError).reduce((cur, pre) => cur || pre, false)
      }
      setErrors = (errors) => {
        this.setState({
          errors,
        })
      }

      checkRule = (val, rule) => {
        if (rule instanceof RegExp) {
          return rule.test(val)
        } else if (rule instanceof Function) {
          return rule(val)
        }
        return true
      }
    }
    let wraped = Wrapper
    wraped.displayName = displayName(Comp)
    wraped.displayName = `Validation(${displayName(Comp)})`
    return wraped
  }
}
