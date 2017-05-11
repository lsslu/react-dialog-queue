'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _message = require('./message');

function createRandID() {
  var timestamp = new Date().getTime().toString();
  return 'dialog_' + timestamp;
}

function dialog() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)({ stack: (0, _immutable.List)() });
  var action = arguments[1];

  switch (action.type) {
    case _message.SHOWDIALOG:
      {
        var newStack = state.get('stack').push({
          cmpt: action.cmpt,
          name: createRandID(),
          data: action.data
        });
        return state.set('stack', newStack);
      }

    case _message.CLOSEDIALOG:
      {
        return state.set('stack', state.get('stack').pop());
      }

    default:
      {
        return state;
      }
  }
}

exports.default = dialog;