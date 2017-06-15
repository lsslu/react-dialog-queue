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
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DialogQueue);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DialogQueue.__proto__ || Object.getPrototypeOf(DialogQueue)).call.apply(_ref, [this].concat(args))), _this), _this.generate = function (dialogs) {
      var animateClass = _this.props.animateClass;


      return dialogs.map(function (dialog, index) {
        var isFirstDialog = index == dialogs.length - 1;
        var styleConfig = {
          'show': isFirstDialog,
          'hide': !isFirstDialog
        };

        console.log(animateClass);

        if (animateClass) {
          styleConfig[animateClass.enter] = !dialog.hide;
          styleConfig[animateClass.leave] = dialog.hide;
        }

        var dialogStyle = (0, _classnames2.default)('dialog', styleConfig);
        console.log(dialogStyle);
        return _react2.default.createElement(dialog.cmpt, _extends({
          key: dialog.name,
          className: dialogStyle
        }, dialog.data));
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DialogQueue, [{
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
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, DialogTrigger);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = DialogTrigger.__proto__ || Object.getPrototypeOf(DialogTrigger)).call.apply(_ref2, [this].concat(args))), _this2), _this2.showDialog = function () {
      var _this2$props = _this2.props,
          cmpt = _this2$props.cmpt,
          data = _this2$props.data;

      _this2.props.showDialog(cmpt, data);
    }, _this2.closeDialog = function () {
      _this2.props.hideDialog();
      setTimeout(function () {
        _this2.props.closeDialog(!!_this2.props.all);
      }, 300);
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(DialogTrigger, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          className = _props.className,
          all = _props.all;

      var isShowAction = type === 'show' || type === 'open';
      return _react2.default.createElement(
        'div',
        { className: className,
          onClick: isShowAction ? this.showDialog : this.closeDialog },
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
    closeDialog: function closeDialog(isCloseAll) {
      dispatch((0, _action.closeDialog)(isCloseAll));
    },
    hideDialog: function hideDialog() {
      dispatch((0, _action.hideDialog)());
    }
  };
};

var _d_trigger = (0, _reactRedux.connect)(null, mapDispatchToProps)(DialogTrigger);
var _d_queue = (0, _reactRedux.connect)(mapStateToProps)(DialogQueue);

exports.DialogQueue = _d_queue;
exports.DialogTrigger = _d_trigger;