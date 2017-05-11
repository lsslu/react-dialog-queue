'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogTrigger = exports.DialogQueue = exports.dialogReducer = undefined;

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _queue = require('./queue');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.dialogReducer = _reducer2.default;
exports.DialogQueue = _queue.DialogQueue;
exports.DialogTrigger = _queue.DialogTrigger;