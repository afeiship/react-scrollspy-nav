import './dev.scss';
import ReactAntCheckableTag from './main';

/*===example start===*/

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
/*===example end===*/

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
