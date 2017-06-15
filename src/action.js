import { SHOWDIALOG, CLOSEDIALOG, HIDEDIALOG } from './message';

export function showDialog(cmpt, data) {
  return {
    type: SHOWDIALOG,
    cmpt,
    data
  };
}

export function closeDialog(isCloseAll) {
  return {
    type: CLOSEDIALOG,
    isCloseAll
  };
}

export function hideDialog() {
  return {
    type: HIDEDIALOG
  };
}
