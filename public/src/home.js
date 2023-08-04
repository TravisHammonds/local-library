const {partitionBooksByBorrowedStatus} = require("./books");
const {findAuthorById} = require("./books");

//you have to destructure in the variable before "require" because the functions are exported in an object 

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books=[]) {
  const [checkedOut,] = partitionBooksByBorrowedStatus(books);
  return checkedOut.length;
}

function getMostCommonGenres(books=[]) {
  //create a lookup object 
  let lookupObj = {};
  //loop through books array 
  for (let {genre} of books) {
    //if doesnt include genre 
    if(lookupObj[genre] === undefined) {
      //add a key (genre) with value of 1
      lookupObj[genre] = 1;
    }
    //if it contains the genre 
    else {
        //increment the value by 1
      lookupObj[genre]++;
    }
  }
  //set return array
  const result = [];
  //iterate through each key/value pair in lookupObj
  for(let key in lookupObj) {
    //create each key into an obj
    const obj = {name: key, count: lookupObj[key]};
    //push the object into the array 
    result.push(obj);
  }
  //sort the  array by count
  result.sort((a, b) => b.count - a.count);
  //return the first 5 elements of the array (slice)
  return result.slice(0,5);
}

function getMostPopularBooks(books=[]) {
   //create a return array  
   let result = [];
   // iterate through books 
   books.forEach((bookObj) => {
    //add book to lookupObj and set value equal to borrows.length
    const obj = {name: bookObj.title, count: bookObj.borrows.length};
    result.push(obj);
   });
   //sort the  array by count
   result.sort((a, b) => b.count - a.count);
   //return the first 5 elements of the array (slice)
   return result.slice(0,5);
}

function getMostPopularAuthors(books=[], authors=[]) {
  //sort the books by borrows  
  books.sort((a, b) => {
    return b.borrows.length - a.borrows.length;
  });
  const result = books.slice(0,5).reduce((acc, bookObj)=>{
      //look at AuthorId and roster
      const {authorId,borrows} = bookObj;
      //look at the authors array and find the author whose id === current book's authorId 
      const foundAuthor = findAuthorById(authors,authorId)
      //create an object with the information about authors name and borrows (borrows size)
      const fullName = helperJoinFirstAndLastNames(foundAuthor.name.first, foundAuthor.name.last);
      
      const obj = { name: fullName, count: borrows.length}
      acc.push(obj);
      return acc;
  },[])
  return result;
}

function helperJoinFirstAndLastNames(first, last) {
return `${first} ${last}`;
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
