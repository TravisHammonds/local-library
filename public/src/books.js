const findAuthorById = (authors=[], id = null) => 
  authors.find((authObj) =>  authObj.id === id)


const findBookById = (books =[], id="") => 
  books.find((bookObj) => bookObj.id === id)

  function partitionBooksByBorrowedStatus(books=[]) {
    //create 2 arrays for each category of borrow status
    let checkedOut = [];
    let available = []
    //look at books array and go through each book Obj
    for(let bookObj of books) {
      const returnStatus = bookObj.borrows[0].returned;
      //look at the first elem in borrows array to see if return = true
      if (returnStatus === true) {
        available.push(bookObj);
      } else {
        checkedOut.push(bookObj);
      }
    }
   return [checkedOut , available];
  }
  
function getBorrowersForBook({borrows}={}, accounts=[]) {
  const result = borrows.map(({id,returned}) => {
    const accountObj = accounts.find((elem) => {
      return elem.id === id;
    })
    accountObj.returned = returned;
    return accountObj;
  })
  
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
