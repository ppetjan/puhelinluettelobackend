const mongoose = require('mongoose')

const args = process.argv

if (args.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (args.length === 4 || args.length > 5) process.exit(1)

const password = args[2]

const url = `mongodb+srv://petja:${password}@puhelinluettelo.r2knqrp.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (args.length === 5) {
  const newName = args[3]
  const newNumber = args[4]

  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(() => {
    console.log(`Added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
}

if (args.length === 3) {
  console.log('phonebook:')
  Person
    .find({})
    .then((result) => {
      result.forEach((person) => (
        console.log(`${person.name} ${person.number}`)
      ))
      mongoose.connection.close()
    })
}
