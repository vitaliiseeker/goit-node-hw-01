const path = require('path');
const fs = require('fs').promises;
const colors = require('colors/safe');

const contactsPath = path.resolve('./db/contacts.json');

async function readFile() {
  try {
    return JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
  } catch (err) {
    error(err);
  }
}

async function writeFile(data) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(data, null, '\t'));
  } catch (err) {
    error(err);
  }
}

function error(message) {
  console.log(colors.red.underline(message));
  process.exit();
} 

async function listContacts() {
  const contacts = await readFile();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contactIdStr = contactId.toString();
  const contacts = await readFile();
  const contact = await contacts.filter(({ id }) => id === contactIdStr);
  console.table(contact);
}

async function addContact(name, email, phone) {
  const contacts = await readFile();
  const newContactId = (Number(contacts[contacts.length - 1].id) + 1).toString();
  const newContact = {
    id: newContactId,
    name,
    email,
    phone
  }
  writeFile([...contacts, newContact]);
}

async function removeContact(contactId) {
  const contactIdStr = contactId.toString();
  const contacts = await readFile();
  const newContactsList = await contacts.filter(({ id }) => id !== contactIdStr);
  writeFile([...newContactsList]);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact
}


