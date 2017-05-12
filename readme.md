#### 用途：
用以全局管理react项目中的弹出框，保持前台始终只显示一个弹出框。

### 用法：
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
