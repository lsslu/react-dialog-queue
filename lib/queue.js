'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogTrigger = exports.DialogQueue = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _action = require('./action');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './queue.less';

var AnimateContainer = function (_React$Component) {
  _inherits(AnimateContainer, _React$Component);

  function AnimateContainer() {
    _classCallCheck(this, AnimateContainer);

    return _possibleConstructorReturn(this, (AnimateContainer.__proto__ || Object.getPrototypeOf(AnimateContainer)).apply(this, arguments));
  }

  _createClass(AnimateContainer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          Cmpt = _props.Cmpt,
          data = _props.data,
          others = _objectWithoutProperties(_props, ['Cmpt', 'data']);

      return _react2.default.createElement(
        'div',
        others,
        _react2.default.createElement(Cmpt, data)
      );
    }
  }]);

  return AnimateContainer;
}(_react2.default.Component);

var DialogQueue = function (_React$Component2) {
  _inherits(DialogQueue, _React$Component2);

  function DialogQueue() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, DialogQueue);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = DialogQueue.__proto__ || Object.getPrototypeOf(DialogQueue)).call.apply(_ref, [this].concat(args))), _this2), _this2.generate = function (dialogs) {
      var animateClass = _this2.props.animateClass;


      return dialogs.map(function (dialog, index) {
        var isFirstDialog = index == dialogs.length - 1;
        var styleConfig = {
          'show': isFirstDialog,
          'hide': !isFirstDialog
        };

        if (animateClass) {
          styleConfig[animateClass.enter] = !dialog.hide;
          styleConfig[animateClass.leave] = dialog.hide;
        }

        var dialogStyle = (0, _classnames2.default)('dialog', styleConfig);
        // return React.createElement(CmptHoc(dialog.cmpt), {
        return _react2.default.createElement(AnimateContainer, {
          key: dialog.name,
          className: dialogStyle,
          Cmpt: dialog.cmpt,
          data: dialog.data
        });
      });
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(DialogQueue, [{
    key: 'render',
    value: function render() {
      var isShow = this.props.dialog.stack.length > 0;
      var queueStyle = (0, _classnames2.default)({
        'dialog-queue': true,
        'show': isShow
      });

      document.body.style.overflow = isShow ? 'hidden' : '';

      return _react2.default.createElement(
        'div',
        { className: queueStyle },
        this.generate(this.props.dialog.stack)
      );
    }
  }]);

  return DialogQueue;
}(_react2.default.Component);

var DialogTrigger = function (_React$Component3) {
  _inherits(DialogTrigger, _React$Component3);

  function DialogTrigger() {
    var _ref2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, DialogTrigger);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = DialogTrigger.__proto__ || Object.getPrototypeOf(DialogTrigger)).call.apply(_ref2, [this].concat(args))), _this3), _this3.showDialog = function () {
      var _this3$props = _this3.props,
          cmpt = _this3$props.cmpt,
          data = _this3$props.data;

      _this3.props.showDialog(cmpt, data);
    }, _this3.closeDialog = function () {
      _this3.props.hideDialog();
      setTimeout(function () {
        _this3.props.closeDialog(!!_this3.props.all);
      }, 300);
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(DialogTrigger, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          type = _props2.type,
          className = _props2.className,
          all = _props2.all;

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