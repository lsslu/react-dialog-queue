import { List, Map, fromJS } from 'immutable';
import { SHOWDIALOG, CLOSEDIALOG, HIDEDIALOG } from './message';

function createRandID() {
  const timestamp = new Date().getTime().toString();
  return 'dialog_' + timestamp;
}

function dialog(state = Map({stack: List()}), action) {
  switch(action.type) {
    case SHOWDIALOG: {
      const newStack = state.get('stack').push(fromJS({
        cmpt: action.cmpt,
        name: createRandID(),
        data: action.data,
        hide: false
      }));
      return state.set('stack', newStack);
    }

    case CLOSEDIALOG: {
      if(action.isCloseAll) {
        return state.set('stack', List());
      }
      return state.set('stack', state.get('stack').pop());
    }

    case HIDEDIALOG: {
      const stack = state.get('stack');
      let dialog = stack.last();
      return state.set('stack', stack.setIn([stack.size - 1], dialog.set('hide', true)));
    }

    default: {
      return state;
    }
  }
}

export default dialog;
