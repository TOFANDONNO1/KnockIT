import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { database } from '../firebaseauth';
import { Button, Form, Image, InputGroup } from 'react-bootstrap';
import "../CSS/Search.css"
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]); // Clear results if the search query is empty
        return;
      }

      const q = query(collection(database, 'PRODUCTS'), where('productSearch',"array-contains", searchQuery));
  
      try {
        const querySnapshot = await getDocs(q);
        const results = [];

        querySnapshot.forEach((doc) => {
       
          results.push(doc.data());
        });

        setSearchResults(results);
      } catch (error) {
        console.error('Error searching Firestore:', error);
      }
    };

    // Execute the search function on every change to the searchQuery state
    handleSearch();
  }, [searchQuery]);



  return (
    <div className="search-container">
        <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search ..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
        />
        <Button variant='info'>
        <BsSearch  className="search_logo"/>
        </Button>
        
      </InputGroup>


      <div className="search-results">
        {searchResults.length > 0 ? (
         
            searchResults.map((result) => (
              <Link style={{textDecoration:"none"}} key={result.id} to={`/productpage/${result.id}`}>
              
             
              <div key={result.id}>
           <Image style={{width:"80px"}} src={result.productImage} alt='Image'/>
                <p>{result.productTitle}</p>
               
              </div>
              </Link>
            ))
          
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default SearchComponent