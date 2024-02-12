// URI bootcamp class - HW 11 Due 2.8.24 MJS - Original code from shared URI repo.
let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

const baseURL = "file:///C:/Users/Mike/Desktop/URIClass/hw11/uriHW11ExpressNotes"; 

  // MJUS 2.8.24 - to turn on/off all logging
  const log = (text) => {
    console.log("MJS " + text);
  };

  // determine if you are in the server or in a browser
  const inBrowser = ( ) => {
    // First see if the window exists ... needed for server.js require method.
    // if (!window) {  // Does NOT work
    // if (window instanceof Window) {  // Does not work
    if (typeof window !== 'undefined') {
      return true;
    }
    return false;
  };  // end inBrowser

  // determine if you are in a browser at the indicated filename (ie. notes.html )
  const inBrowserFile = (fileName ) => {
      // First see if the window exists ... needed for server.js require method.
      // if (!window) {  // Does NOT work
      // if (window instanceof Window) {  // Does not work
      if (!inBrowser()) {
        return false;
      }
      const wlp = window.location.pathname;
      log("wind.loc.pname is " + wlp + " notes.html len/indOf " + wlp.length + "/" + wlp.indexOf(fileName));
      // window.location.pathname returns the full path for me, ie. C:/...Develop/public/notes.html
      // if (window.location.pathnamew === '/notes') {      
      if (wlp.lastIndexOf(fileName) === wlp.length - 10 ) {
        return true;  
      }
      return false;
  };  // end inBrowserFile(fileName)

log("Starting index.js");
if (inBrowser()) {
  console.log("Window defined.");
} else {
  log("Window not defined");
}

// this returns the full path for me, ie. C:/...Develop/public/notes.html
if (inBrowserFile('notes.html')) {
  console.log("In notes.html.");
} else {
  log("Not in notes.html");
}

// if (window.location.pathname === '/notes') {  // window undefined when loading server.js
// and pathname includes full path and file on my Windows 10 system
if (inBrowserFile('notes.html')) {
console.log("Index.js pathname ends in notes.html");
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearBtn = document.querySelector('.clear-btn');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () => {
  console.log("In getNotes");
  // URL parse err on this line - stack overflow claims need full path when not in browser. 
  // fetch('/api/notes', {
  // In the sample repo data is in Develop/db/db.json, while this index.js is in Develop/public/assets/js
  // fetch('/Develop/db/db.json', { // FAILS TypeError: Invalid URL
  //   fetch('./../../../db/db.json', { // FAILS - Type Error: Invalid URL
    // fetch(baseURL + 'Develop/db/db.json', { // FAILS, but fetch fails unknown scheme error, not Invalid URL. 
  // fetch(baseURL + 'Develop/db/db.json', { // FAILS, but not implemented yet error if file:///C... in baseURL
  fetch('/api/notes', {   // think I need this exact same path in server.js
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })  // end fetch()
  .then((res) => log("Done Running getNotes"));
}; // end getNotes

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {


      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

const renderActiveNote = () => {
  hide(saveNoteBtn);
  hide(clearBtn);

  if (activeNote.id) {
    show(newNoteBtn);
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    hide(newNoteBtn);
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  show(clearBtn);
  renderActiveNote();
};

// Renders the appropriate buttons based on the state of the form
const handleRenderBtns = () => {
  show(clearBtn);
  if (!noteTitle.value.trim() && !noteText.value.trim()) {
    hide(clearBtn);
  } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  }; // end CreateLi inner function

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);
    noteListItems.push(li);
  });

  // if (window.location.pathname === '/notes') {
  if (inBrowserFile('notes.html')) {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
}; // end function renderNoteList

// Gets notes from the db and renders them to the sidebar
// This also did not originally compile
const getAndRenderNotes = () => {
  getNotes(); 
  // .then(renderNoteList);
}; // end function getAndRenderNotes

// BEGIN EXCUTING CODE 
// ======================
// if (window.location.pathname === '/notes') {  // add event listeners
// above wont work since window not defined (and pathname includes full path and filename)
if (inBrowserFile('notes.html')) {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', renderActiveNote);
  noteForm.addEventListener('input', handleRenderBtns);
}

log("Index.js calling getAndRenderNotes");
getAndRenderNotes();
log("Index.js returned from getAndrenderNotes");
