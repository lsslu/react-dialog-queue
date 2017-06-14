import { List, Map } from 'immutable';
import { SHOWDIALOG, CLOSEDIALOG } from './message';

function createRandID() {
  const timestamp = new Date().getTime().toString();
  return 'dialog_' + timestamp;
}

function dialog(state = Map({stack: List()}), action) {
  switch(action.type) {
    case SHOWDIALOG: {
      const newStack = state.get('stack').push({
        cmpt: action.cmpt,
        name: createRandID(),
        data: action.data
      });
      return state.set('stack', newStack);
    }

    case CLOSEDIALOG: {
      if(action.isCloseAll) {
        return state.set('stack', List());
      }
      return state.set('stack', state.get('stack').pop());
    }

    default: {
      return state;
    }
  }
}

export default dialog;
