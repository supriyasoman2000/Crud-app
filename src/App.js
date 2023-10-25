import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('books');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  // main array of objects state || books state || books array of objects
  const [books, setbooks]=useState(getDatafromLS());

  // input field states
  const [title, setTitle]=useState('');
  const [author, setAuthor]=useState('');
  const [isbn, setIsbn]=useState('');

  // form submit event
  const handleAddBookSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let book={
      title,
      author,
      isbn
    }
    setbooks([...books,book]);
    setTitle('');
    setAuthor('');
    setIsbn('');
  }

  // delete book from LS
  const deleteBook=(isbn)=>{
    const filteredBooks=books.filter((element,index)=>{
      return element.isbn !== isbn
    })
    setbooks(filteredBooks);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('books',JSON.stringify(books));
  },[books])

  return (
    <div className='wrapper'>
      <h1 style={{color:'white'}}>BookList App</h1>
      <p style={{color:'white'}}>Add your books using local storage</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddBookSubmit}>
            <label style={{fontWeight:'bold'}}>TITLE :</label>
            <input style={{fontWeight:'bold',width:'340px',height:'40px',marginLeft:'37px',marginBottom:'40px'}} type="text" className='form-control' required
            onChange={(e)=>setTitle(e.target.value)} value={title}></input>
            <br></br>
            <label style={{fontWeight:'bold'}}>AUTHOR :</label>
            <input style={{fontWeight:'bold',width:'340px',height:'40px',marginLeft:'15px',marginBottom:'50px'}} type="text" className='form-control' required
            onChange={(e)=>setAuthor(e.target.value)} value={author}></input>
            <br></br>
            <label style={{fontWeight:'bold'}}>ISBN# :</label>
            <input style={{fontWeight:'bold',width:'340px',height:'40px',marginLeft:'36px',marginBottom:'50px'}} type="text" className='form-control' required
            onChange={(e)=>setIsbn(e.target.value)} value={isbn}></input>
            <br></br>
            <button style={{borderRadius: '12px',width:'150px',height:'35px',marginLeft:'140px',backgroundColor:'green',color:'white'}} className='btn btn-success '>ADD</button>
          </form>
        </div>

        <div className='view-container'>
          {books.length>0&&<>
            <div className='table-responsive'>
              <table className='table mt-5 mb-5 container'>
                <thead>
                  <tr>
                    <th>ISBN#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View books={books} deleteBook={deleteBook}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md '
            onClick={()=>setbooks([])}><i className="fa-solid fa-trash text-danger"></i></button>
          </>}
          {books.length < 1 && <div>No books are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App
