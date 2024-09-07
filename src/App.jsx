import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(30);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  async function getData() {
    const skip = (page - 1) * limit;

    const fetchUrl = `https://dummyjson.com/products?delay=0&limit=${limit}&skip=${skip}`;

    const data = await fetch(fetchUrl).then(res => res.json());
    setProducts([...data.products]);
    setTotal(data.total);
  }

  useEffect(() => {
    getData();
  }, [page]);

  function changePage(pageNumber) {
    setPage(pageNumber);
  }

  const pageCount = Math.ceil(total/limit);

  function handlePrevPage(e) {
    e.preventDefault();
    if((page-1) > 0) {
      setPage(page-1);
    }
  }

  function handleNextPage(e) {
    e.preventDefault();
    if((page+1) <= pageCount) {
      setPage(page+1);
    }
  }

  return (
    <>
      <div className="container">
        {products.map(x => <div className="productItem" key={x.id}>
          <h4>{x.title}</h4>
          <img src={x.thumbnail} />
        </div>)}
      </div>

      {pageCount > 0 && 
        <ul className="pagination">
          <li><a href="#" onClick={handlePrevPage}>&lt;</a></li>
          {
            Array
              .from({ length: pageCount }, (v, i) => (i+1))
              .map(x => <li key={x}><a href="#" className={page === x ? 'activePage' : ''} onClick={e => { e.preventDefault(); changePage(x); }}>{x}</a></li>)
          }
          <li><a href="#" onClick={handleNextPage}>&gt;</a></li>
        </ul>
      }
    </>
  )
}

export default App
