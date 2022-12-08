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
    await fs.writeFile(contactsPath, JSON.stringify(data, null, '\t'));
  } catch (err) {
    error(err);
  }
}

function error(message) {
  console.log(colors.red.underline(message));
  process.exit();
} 

/**
 * Output of data array in the form of a table to the console.
 * @returns console.table(array)
 */
async function listContacts() {
  const contacts = await readFile();
  console.table(contacts);
}

/**
 * Search in the data array by 'Id' and output data in the form of a table to the console.
 * @param {string} contactId - id of the element to be found.
 * @returns console.table(array)
 */
async function getContactById(contactId) {
  const contactIdStr = contactId.toString();
  const contacts = await readFile();
  const contact = await contacts.find(({ id }) => id === contactIdStr);
  console.table(contact);
}

/**
 * Adding a new element to an data array.
 * @param {string} name
 * @param {string} email
 * @param {string} phones
 */
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

/**
 * Removing element by 'Id' from data array.
 * @param {string} contactId - id of the element to be deleted.
 */
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