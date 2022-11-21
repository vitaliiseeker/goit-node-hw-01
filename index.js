const argv = require('yargs').argv;

// const { Command } = require('commander');
// const program = new Command();
// program
//   .option('-a, --action <type>', 'choose action')
//   .option('-i, --id <type>', 'user id')
//   .option('-n, --name <type>', 'user name')
//   .option('-e, --email <type>', 'user email')
//   .option('-p, --phone <type>', 'user phone');

// program.parse(process.argv);

// const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {

    case 'list':
      console.log('list');
      break;

    case 'get':
      console.log('ld: ', id);
      break;

    case 'add':
      console.log('name', name, '\n, email', email, '\n, phone', phone);
      break;

    case 'remove':
      console.log('ld: ', id);
      break;

    default:
      console.log('\x18[31m Unknown action type!]');

  }
}

invokeAction(argv);

//======================================

// # Отримуємо і виводимо весь список контактів у вигляді таблиці(console.table)
// node index.js--action = "list"

// # Отримуємо контакт по id
// node index.js--action = "get" --id = 5

// # Додаємо контакт
// node index.js--action = "add" --name = "Mango" --email = "mango@gmail.com" --phone = "322-22-22"

// # Видаляємо контакт
// node index.js--action = "remove" --id 3
//======================================
