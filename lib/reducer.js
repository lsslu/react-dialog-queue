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
        var newStack = state.get('stack').push((0, _immutable.fromJS)({
          cmpt: action.cmpt,
          name: createRandID(),
          data: action.data,
          hide: false
        }));
        return state.set('stack', newStack);
      }

    case _message.CLOSEDIALOG:
      {
        if (action.isCloseAll) {
          return state.set('stack', (0, _immutable.List)());
        }
        return state.set('stack', state.get('stack').pop());
      }

    case _message.HIDEDIALOG:
      {
        var stack = state.get('stack');
        var _dialog = stack.last();
        return state.set('stack', stack.setIn([stack.size - 1], _dialog.set('hide', true)));
      }

    default:
      {
        return state;
      }
  }
}

exports.default = dialog;