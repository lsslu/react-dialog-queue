'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogTrigger = exports.DialogQueue = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _action = require('./action');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './queue.less';

var DialogQueue = function (_React$Component) {
  _inherits(DialogQueue, _React$Component);

  function DialogQueue() {
    _classCallCheck(this, DialogQueue);

    return _possibleConstructorReturn(this, (DialogQueue.__proto__ || Object.getPrototypeOf(DialogQueue)).apply(this, arguments));
  }

  _createClass(DialogQueue, [{
    key: 'generate',
    value: function generate(dialogs) {
      return dialogs.map(function (dialog, index) {
        var dialogStyle = (0, _classnames2.default)({
          'dialog': true,
          'show': index == dialogs.length - 1,
          'hide': !(index == dialogs.length - 1)
        });

        return _react2.default.createElement(dialog.cmpt, _extends({
          key: dialog.name,
          className: dialogStyle
        }, dialog.data));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var queueStyle = (0, _classnames2.default)({
        'dialog-queue': true,
        'show': this.props.dialog.stack.length > 0
      });

      return _react2.default.createElement(
        'div',
        { className: queueStyle },
        this.generate(this.props.dialog.stack)
      );
    }
  }]);

  return DialogQueue;
}(_react2.default.Component);

var DialogTrigger = function (_React$Component2) {
  _inherits(DialogTrigger, _React$Component2);

  function DialogTrigger() {
    _classCallCheck(this, DialogTrigger);

    return _possibleConstructorReturn(this, (DialogTrigger.__proto__ || Object.getPrototypeOf(DialogTrigger)).apply(this, arguments));
  }

  _createClass(DialogTrigger, [{
    key: 'showDialog',
    value: function showDialog() {
      var _props = this.props,
          cmpt = _props.cmpt,
          data = _props.data;

      this.props.showDialog(cmpt, data);
    }
  }, {
    key: 'closeDialog',
    value: function closeDialog() {
      this.props.closeDialog();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          type = _props2.type,
          className = _props2.className;

      var isShowAction = type === 'show' || type === 'open';
      return _react2.default.createElement(
        'div',
        { className: className,
          onClick: isShowAction ? this.showDialog.bind(this) : this.closeDialog.bind(this) },
        this.props.children
      );
    }
  }]);

  return DialogTrigger;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    dialog: state.dialog.toJS()
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    showDialog: function showDialog(cmpt, data) {
      dispatch((0, _action.showDialog)(cmpt, data));
    },
    closeDialog: function closeDialog() {
      dispatch((0, _action.closeDialog)());
    }
  };
};

var _d_trigger = (0, _reactRedux.connect)(null, mapDispatchToProps)(DialogTrigger);
var _d_queue = (0, _reactRedux.connect)(mapStateToProps)(DialogQueue);

exports.DialogQueue = _d_queue;
exports.DialogTrigger = _d_trigger;