'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showDialog = showDialog;
exports.closeDialog = closeDialog;

var _message = require('./message');

function showDialog(cmpt, data) {
  return {
    type: _message.SHOWDIALOG,
    cmpt: cmpt,
    data: data
  };
}

function closeDialog(isCloseAll) {
  return {
    type: _message.CLOSEDIALOG,
    isCloseAll: isCloseAll
  };
}