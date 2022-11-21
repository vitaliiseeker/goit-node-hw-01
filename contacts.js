const path = require(`path`);
const fs = require('fs');

const contactsPath = path.resolve('contacts.js');

// TODO: задокументувати кожну функцію
function listContacts() {
  return fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
    }
    console.log(data);
  });
}

function getContactById(contactId) {
  // ...твій код
}

function removeContact(contactId) {
  // ...твій код
}

function addContact(name, email, phone) {
  // ...твій код
}

console.log(contactsPath);``
listContacts();


