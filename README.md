# react-ant-checkable-tag
> Checkable tag for ant.

## properties:
```javascript

  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: false,
    onChange: noop,
  };
  
```

## install && import:
```bash
npm install --save afeiship/react-ant-checkable-tag --registry=https://registry.npm.taobao.org
```

```js
import ReactAntCheckableTag from 'react-ant-checkable-tag';
```

```scss
// customize your styles:
$react-ant-checkable-tag-options:(
);

@import 'node_modules/react-ant-checkable-tag/dist/style.scss';
```


## usage:
```jsx

// install: npm install afeiship/react-ant-checkable-tag --save
// import : import ReactAntCheckableTag from 'react-ant-checkable-tag'

class App extends React.Component{
  state = {
  };

  constructor(props){
    super(props);
    window.demo = this;
    window.refs = this.refs;
    window.rc = this.refs.rc;
  }

  render(){
    return (
      <div className="hello-react-ant-checkable-tag">
        <ReactAntCheckableTag> Tag1 </ReactAntCheckableTag>
        <ReactAntCheckableTag> Tag2 </ReactAntCheckableTag>
        <ReactAntCheckableTag> Tag3 </ReactAntCheckableTag>
      </div>
    );
  }
}

```
