// import yargs from 'yargs';
const yargs = require('yargs');
const notes = require('./notes.js')
debugger
// add a note
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body)
  }
})

// Remove a note
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.removeNote(argv.title)
  }
})

// list notes
yargs.command({
  command: 'list',
  describe: 'List notes.',
  handler: () => {
    notes.getNotes()
  }
})

yargs.command({
  command: 'read',
  describe: 'Read notes.',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.readNote(argv.title)
  }
})

yargs.parse();