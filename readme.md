#### 用途：
用以全局管理react项目中的弹出框，保持前台始终只显示一个弹出框。

#### 用法：
- 初始化reducer时注入dialogReducer
```javascript
  const reducers = combineReducers({
    ...otherReducer,
    dialog: dialogReducer
  });
```
- 根节点配置DialogQueue组件
```javascript
  class App extends Component{
    render() {
      return (
        <div>
          <Route exact path="/" component={Home} />
          <DialogQueue />
        </div>
      );
    }
  }
```
- 引入DialogTrigger组件，用以控制对话框的开关
```javascript
  import { DialogTrigger } from 'react-dialog-queue';
  import MyDialog from '../components/dialog';

  class Test extends React.Component {

    render() {
      return (
        <div>
          <DialogTrigger type="show" cmpt={MyDialog}>
            <Button>show dialog</Button>
          </DialogTrigger>
        </div>
      );
    }
  }
```

- Dialog组件中同样引入DialogTrigger，用以添加关闭按钮
```javascript
  import { DialogTrigger } from 'react-dialog-queue';

  class MyDialog extends React.Component {

    render() {
      return (
        <Dialog {...this.props}>
          Hello Dialog~
          <DialogTrigger type="close">
            <Button>close</Button>
          </DialogTrigger>
        </Dialog>
      );
    }
  }
```


#### DialogTrigger 属性
- type: 'show' | 'open' | 'close'
- cmpt: 关联的Dialog组件类
- data: 传给Dialog组件的数据，键值对



### 关闭Dialog
```javascript
// close dialog through DialogTrigger
<DialogTrigger type="close">close dialog</DialogTrigger>
<DialogTrigger type="close" all>close all dialog</DialogTrigger>

// close dialog through dispatch an action
import { closeDialog } from 'react-dialog-queue';
import { connect } from 'react-redux';

class MyComponent extends React.Component { ... }

const mapDispatchToProps = (dispatch) => {
  return {
    closeDialog: (isCloseAll) => dispatch(closeDialog(isCloseAll))
  }
}

export default connect(null, mapDispatchToProps)(MyComponent);

```
