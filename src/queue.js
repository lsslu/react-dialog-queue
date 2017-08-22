import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { showDialog, closeDialog } from './action';

// import './queue.less';

class DialogQueue extends React.Component {

  generate(dialogs) {
    return dialogs.map((dialog, index) => {
      const dialogStyle = classNames({
        'dialog': true,
        'show': index == dialogs.length - 1,
        'hide': !(index == dialogs.length - 1)
      });

      return React.createElement(dialog.cmpt, {
        key: dialog.name,
        className: dialogStyle,
        ...dialog.data
      });

    });
  }

  render() {
    const queueStyle = classNames({
      'dialog-queue': true,
      'show': this.props.dialog.stack.length > 0
    });

    return (
      <div className={queueStyle}>
        { this.generate(this.props.dialog.stack) }
      </div>
    );
  }
}

class DialogTrigger extends React.Component {
  showDialog = () => {
    const { cmpt, data, onClick } = this.props;
    this.props.showDialog(cmpt, data);

    if(typeof onClick === 'function') {
      onClick.call(this);
    }
  };

  closeDialog = () => {
    this.props.closeDialog(!!this.props.all);
  };

  render() {
    const { type, className, all } = this.props;
    const isShowAction = type === 'show' || type === 'open';
    return (
      <div className={ className }
           onClick={ isShowAction ? this.showDialog : this.closeDialog }>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dialog: state.dialog.toJS()
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showDialog: ( cmpt, data ) => { dispatch(showDialog(cmpt, data)) },
    closeDialog: ( isCloseAll ) => { dispatch(closeDialog(isCloseAll)) }
  };
};

const _d_trigger = connect(null, mapDispatchToProps)(DialogTrigger);
const _d_queue = connect(mapStateToProps)(DialogQueue);

export {
  _d_queue as DialogQueue,
  _d_trigger as DialogTrigger
};
