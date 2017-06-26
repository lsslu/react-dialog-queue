import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { showDialog, closeDialog, hideDialog } from './action';

// import './queue.less';

class AnimateContainer extends React.Component {
  render () {
		const { Cmpt, data, ...others } = this.props;


		return <div {...others}><Cmpt {...data} /></div>;
  }
}

class DialogQueue extends React.Component {

  generate = (dialogs) => {
    const { animateClass } = this.props;

    return dialogs.map((dialog, index) => {
      const isFirstDialog = index == dialogs.length - 1;
      let styleConfig = {
        'show': isFirstDialog,
        'hide': !isFirstDialog
      };

      if(animateClass) {
        styleConfig[animateClass.enter] = !dialog.hide;
        styleConfig[animateClass.leave] = dialog.hide;
      }

      const dialogStyle = classNames('dialog', styleConfig);
			// return React.createElement(CmptHoc(dialog.cmpt), {
      return React.createElement(AnimateContainer, {
        key: dialog.name,
        className: dialogStyle,
        Cmpt: dialog.cmpt,
        data: dialog.data
      });

    });
  };

  render() {
    const isShow = this.props.dialog.stack.length > 0;
    const queueStyle = classNames({
      'dialog-queue': true,
      'show': isShow
    });

    document.body.style.overflow = isShow ? 'hidden' : '';

    return (
      <div className={queueStyle}>
        { this.generate(this.props.dialog.stack) }
      </div>
    );
  }
}

class DialogTrigger extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool
  };

  showDialog = () => {
    const { cmpt, data } = this.props;
    this.props.showDialog(cmpt, data);
  };

  closeDialog = () => {
    this.props.hideDialog();
    setTimeout(() => {
      this.props.closeDialog(!!this.props.all);
    }, 300);
  };

  render() {
    const { type, className, disabled } = this.props;
    const isShowAction = type === 'show' || type === 'open';
    const onClick = isShowAction ? this.showDialog : this.closeDialog;
    return (
      <div className={ className }
           onClick={ disabled ? null : onClick }>
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
    closeDialog: ( isCloseAll ) => { dispatch(closeDialog(isCloseAll)) },
    hideDialog: () => { dispatch(hideDialog()) }
  };
};

const _d_trigger = connect(null, mapDispatchToProps)(DialogTrigger);
const _d_queue = connect(mapStateToProps)(DialogQueue);

export {
  _d_queue as DialogQueue,
  _d_trigger as DialogTrigger
};
