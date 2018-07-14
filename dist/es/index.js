import React from 'react';

function displayName(Comp) {
  return Comp.displayName || Comp.name || "Component";
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

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
function validation(option) {
  return function (Comp) {
    var ruleMap = option.rules;
    if (!ruleMap) {
      throw Error("Validation need rules property");
    }
    var initErrors = {};
    Object.keys(ruleMap).forEach(function (r) {
      initErrors[r] = { isError: false };
    });

    var Wrapper = function (_React$PureComponent) {
      inherits(Wrapper, _React$PureComponent);

      function Wrapper() {
        var _temp, _this, _ret;

        classCallCheck(this, Wrapper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
          errors: initErrors
        }, _this.validate = function (values) {
          var errors = Object.assign({}, _this.state.errors); // {[field]: {isError: {Boolean}, errorText: {string}} }
          Object.keys(values).map(function (key) {
            var rules = ruleMap[key];
            var val = values[key];
            var testRes = null;

            if (!rules || rules && !rules.length) {
              errors[key] = { isError: false };
              return;
            }
            for (var i = 0, len = rules.length; i < len; i++) {
              var _rules$i = rules[i],
                  r = _rules$i.test,
                  errorText = _rules$i.errorText;

              if (_this.checkRule(val, r)) {
                testRes = { isError: false };
              } else {
                testRes = { isError: true, errorText: errorText };
                break;
              }
            }
            errors[key] = testRes;
          });
          _this.setErrors(errors);
          return !Object.values(errors).map(function (m) {
            return m.isError;
          }).reduce(function (cur, pre) {
            return cur || pre;
          }, false);
        }, _this.setErrors = function (errors) {
          _this.setState({
            errors: errors
          });
        }, _this.checkRule = function (val, rule) {
          if (rule instanceof RegExp) {
            return rule.test(val);
          } else if (rule instanceof Function) {
            return rule(val);
          }
          return true;
        }, _temp), possibleConstructorReturn(_this, _ret);
      }

      Wrapper.prototype.render = function render() {
        return React.createElement(Comp, { validate: this.validate, errors: this.state.errors });
      };

      return Wrapper;
    }(React.PureComponent);

    var wraped = Wrapper;
    wraped.displayName = displayName(Comp);
    wraped.displayName = 'Validation(' + displayName(Comp) + ')';
    return wraped;
  };
}

export default validation;
