import ReactScrollSpyNav from '@jswork/react-component-library/src';
import '@jswork/react-component-library/src/style.scss';

function App() {
  return (
    <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
      <div className="badge badge-warning absolute right-0 top-0 m-4">
        Build Time: {BUILD_TIME}
      </div>
      <h1>react-component-library</h1>
      <ReactScrollSpyNav />
      <button className='btn btn-info'>Button</button>
    </div>
  );
}

export default App;
