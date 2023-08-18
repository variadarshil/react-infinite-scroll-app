import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //setTimeout to display loading state
    setTimeout(() => {
      setList((prev) => [...prev, ...Array.from({length: 9}, (_, i) => i + 1)]);
      setLoading(false);
    }, 1000)
  },[page]);

  const handleScrollEvent = () => {
    const docHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;

    try {
      if (innerHeight + scrollTop + 2 >= docHeight) {
        setLoading(true);
        setPage(page => page + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll' , handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent)
  }, []);

  return (
    <div className="App">
      {list.map((ele, ind) => {
        return <div className='single-element' key={ind}>{ele}</div>
      })}
      {loading && <div style={{fontSize: '25px', paddingBottom: '20px'}}>Loading...</div>}
    </div>
  );
}

export default App;
