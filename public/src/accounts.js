function findAccountById(accounts = {}, id = "") {
  let result = accounts.find((acctObj) => 
    acctObj.id === id
  )
  return result; 
}

function sortAccountsByLastName(accounts = {}) {
  return accounts.sort((a,b) => 
    a.name.last.toLowerCase() < b.name.last.toLowerCase() ? -1 : 1
  )
}

function getTotalNumberOfBorrows({id}={}, books=[]) {
  //loop through array of books to: 
  let result = books.reduce((acc, {borrows}) => {
      //loop through each instance of book.borrows 
      for(let borrowObj of borrows){
        //check if the borrows id === id
        if(borrowObj.id === id){
           //if so acc ++
          acc ++;
        }
      }
    //return acc;
    return acc;
  },0)
  //return result
  return result;
}

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  //set a return array
  //filter through books 
  let result = books.filter(({borrows: [{id,returned}]}) => {
    //check first elem of book.borrows array
    //if borrows.id === account.id & if borrows.returned = false
    return id === account.id && returned === false
  })
  //Now add the author object to each element of return array by:
  //Iterate through result array
  for(let bookObj of result){
    //Go through authors using Find 
    let authorInfo = authors.find(({id}) => {
      //if book.author.id = author.id 
      return id === bookObj.authorId;
    })
    //add the object to the current element of return array
    bookObj.author = authorInfo;
  }
  //return the array
  return result; 
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
