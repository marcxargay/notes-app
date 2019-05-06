const fs = require('fs')
const chalk = require('chalk')

//list notes
const getNotes = () => {
  
  const notes = loadNotes()

  if (notes.length > 0) {
    console.log(chalk.green('Your notes:'))
   
    notes.forEach( note => {
      console.log(note.title)
    });

  } else {
    console.log(chalk.red.inverse('Notes not found!'))
  }
}

// Add note
const addNote = (title, body) => {

  const notes = loadNotes()
  // const duplicateNotes = notes.filter((note) =>{ note.title === title })
  const duplicateNote = notes.find((note) =>{ note.title === title })

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('Note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }

}
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}
//Remove Note
const removeNote = (title) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => { note.title !== title })
  debugger
  if (duplicateNotes.length !== notes.length) {
    saveNotes(duplicateNotes)
    console.log(chalk.green.inverse('Note Deleted!'))
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }

}
const loadNotes = () => {
  // try to get file, if file does not exist return empty array since its the basic type needed
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find(note => note.title === title)

  if (note) {
    console.log('Title: ' + note.title)
    console.log('Body: ' + note.body)
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}


module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote
}