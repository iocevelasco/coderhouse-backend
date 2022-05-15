const pets = []
const books = [
  { name: 'Clean Code', author: 'Robert Marting' },
  { name: 'Inferno', author: 'Dan Brown' },
  { name: 'Mrs Mercades', author: 'Stephen Kind' },
]
class User {
  constructor(name, lastName, books, pets) {
    this.name = name;
    this.lastName = lastName;
    this.books = books;
    this.pets = pets;
  };

  getFullName() {
    if (!this.name && !this.lastName) console.error('Please enter full name')
    else return `User name:${this.name} ${this.lastName}`
  }

  addPet(newPet) {
    if (!newPet) console.error('Pet name is invalid')
    else {
      this.pets.push(newPet)
      return 'Pet added successfully'
    };
  };

  countPets() {
    if (this.pets.length === 0) console.error('The user haven\'t added pets yet')
    return `User has: ${this.pets.length} pets`
  }

  addBook(newBook) {
    if (!newBook.name && !newBook.author) return console.error('Book is invalid')
    this.pets.push(newBook)
    return 'Book added successfully'
  }

  getBooks() {
    const pepito1 = this.books.map(function (element, index) {
      return {
        name: element.name,
        author: element.author,
        index: index
      }
    })

    const pepito2 = pepito1.map(e => e.name)

    console.log('pepito1', pepito1)
    console.log('pepito2', pepito2)
  }
};

const firstUser = new User('ioce', 'velasco', books, pets);

console.log(firstUser.getFullName())
console.log(firstUser.addPet())
console.log(firstUser.countPets())
console.log(firstUser.addBook({ name: 'Battle Royale' }))
console.log(firstUser.getBooks())


