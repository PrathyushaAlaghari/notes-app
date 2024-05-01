const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = () => {
  return 'Your notes...'
}

const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicateNotes = notes.find((note) => note.title === title)

  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    })

    saveNotes(notes)
  } else {
    console.log('Title is already taken')
  }
}

const removeNote = (title) => {
  const notes = loadNotes()

  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length === notesToKeep.length) {
    console.log(chalk.red('No note removed'))
  } else {
    console.log(chalk.green('Note removed'))
    saveNotes(notesToKeep)
  }
}

const saveNotes = (notes) => {
  const dJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dJSON)
}

const loadNotes = () => {
  try {
    const bufferData = fs.readFileSync('notes.json')
    const dataJson = bufferData.toString()
    return JSON.parse(dataJson)
  } catch (e) {
    return []
  }
}

const listNotes = () => {
  console.log(chalk.yellow('Your notes----'))
  const notes = loadNotes()
  notes.forEach((note) => {
    console.log(note.title)
  })
}

const readNote = (title) => {
  const notes = loadNotes()
  const noteF = notes.find((note) => note.title === title)

  if (noteF) {
    console.log(chalk.blue(noteF.title))
    console.log(noteF.body)
  } else {
    console.log(chalk.red('No note found'))
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
}
