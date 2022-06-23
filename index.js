
const fs = require('fs');

let catalogArray;
let LibraryArray;

class Book {

    constructor(isbn, title, author, publication_date) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publication_date = publication_date;
    }

    lookup = (input_isbn) => {
        fs.readFile("catalog.csv", "utf8", function (err, data) {
            if (err) {
                console.error(err);
            }
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            catalogArray = data.split(',');// to handle next cell

            for(let i = 0; i < catalogArray.length-1; i++) {
                if(catalogArray[i] === input_isbn) //if isbn exists in catalog
                    console.log(catalogArray[i+1], "by ", catalogArray[i+2], " (", catalogArray[i+3], ")" );
                    
            }
        });

    }
}

class Library extends Book{
    add = (input_isbn, copy) => {
        if(copy === undefined){
            copy = 1;
        }

        fs.readFile("library.csv", "utf8", function (err, data) {
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            LibraryArray = data.split(',');// to handle next cell

            for(let i = 0; i < LibraryArray.length-1; i++) {
                if(LibraryArray[i] === input_isbn){ //if isbn already added into library
                    LibraryArray[i+1] = (+LibraryArray[i+1]) + copy;
                    LibraryArray[i+2] = (+LibraryArray[i+2]) + copy;
                }
                fs.writeFile('library.csv', LibraryArray.join(), err => {
                    if(err)
                        console.log(err);
                });
            }

            if(LibraryArray.indexOf(input_isbn) === -1){ //if isbn doesnt exist in library
                fs.readFile("catalog.csv", "utf8", function (err, data) {
                    data = data.replace("\n",","); //to handle bottom row
                    data = data.replace("\n",","); //to handle bottom row
                    data = data.replace("\n",","); //to handle bottom row
                    data = data.replace("\n",","); //to handle bottom row
                    data = data.replace("\n",","); //to handle bottom row
                    catalogArray = data.split(','); // to handle next cell
        
                
                for(let i = 0; i < catalogArray.length-1; i++) {
                        if(catalogArray[i] === input_isbn){ // if it exists in catalog
                            let available = copy;
                            let newEntry = ""
                            newEntry = newEntry.concat(catalogArray[i],",",copy,",",available,"\n");
        
                            fs.appendFile('library.csv', newEntry, err => {
                                if (err) {
                                  console.error(err);
                                }
                            });
                        }         
                    }
        
                });
            }
            
        });

        
        
    }

    borrow = (input_isbn) => {
        fs.readFile("library.csv", "utf8", function (err, data) {
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            LibraryArray = data.split(',');// to handle next cell

            for(let i = 0; i < LibraryArray.length-1; i++) {
                if(LibraryArray[i] === input_isbn)
                    LibraryArray[i+2] = LibraryArray[i+2] - 1;
            }
            
            fs.writeFile('library.csv', LibraryArray.join(), err => {});

        });
    }

    return = (input_isbn) => {
        fs.readFile("library.csv", "utf8", function (err, data) {
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            LibraryArray = data.split(',');// to handle next cell

            for(let i = 0; i < LibraryArray.length-1; i++) {
                if(LibraryArray[i] === input_isbn)
                    LibraryArray[i+2] = (+LibraryArray[i+2]) + 1;
            }
            
            fs.writeFile('library.csv', LibraryArray.join(), err => {});

        });
    }

    stock = () => {
        fs.readFile("library.csv", "utf8", function (err, data) {
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            data = data.replace("\n",","); //to handle bottom row
            LibraryArray = data.split(',');// to handle next cell

            for(let i = 0; i < LibraryArray.length-1; i+=3) {
                console.log(LibraryArray[i], ", Copies: ", LibraryArray[i+1], ", Available: ", LibraryArray[i+2]);  
            }
        });
    }
}

let workcompass = new Library();


//workcompass.lookup("9780441569595");
workcompass.add("9780441569595",3);

//workcompass.borrow("9780441569595");
//workcompass.return("9780441569595");

workcompass.stock();
