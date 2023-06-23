//! first app welcome app

// const name = process.argv[2];
// const age = process.argv[3];

// console.log(`Hello ${name} , you will be ${Number(age)+10} After 10 years`)

///////////////////////////////////////////////////////
//! note app 

const fs = require('fs');
const { json } = require('stream/consumers');

// const db = require('./db.json')
// console.log(db);

const dbPath = './db.json';

const readDB=()=>
{
    const dbString = fs.readFileSync(dbPath,'utf8')||'[]';
    return  JSON.parse(dbString);
}

const writeDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  };
  

const addNote = ({title , date})=>
 {
    // const dbString = fs.readFileSync('./db.json','utf8')||'[]';

    const db =readDB();
    const newNote = {
        id:Date.now(),
        title,
        date
    };
    db.push(newNote)

    // console.log(db, typeof(db))              //2=> spaces to make the data readable
fs.writeFileSync(dbPath , JSON.stringify(db, null , 2) , 'utf8' )

console.log('Note added succesfully')
console.log(db)

}

const listNotes = ()=>
{
    const db =readDB();
    console.log(db);

}

// const updateNote = ({id , title})=>
// {
//     //? read ==> search  ==> delete 
//     const db =readDB();
// if(db.length)
// {
//     for (let i = 0 ; i < db.length ; i++) {
//         if (db[i].id.toString() === id.toString())
//          {
//             const updatedNotes = {
//                 id,
//                 title
//                 ,date
//             }
//             db.push(updatedNotes);
//             fs.writeFileSync(dbPath , JSON.stringify(db, null , 2) , 'utf8' )

//         }
// }
//     console.log('Note updated succesfully')
//     console.log(db)
// }

//? read  => push => save

const updateNote = ( id , title) =>
{
    const db = readDB();
    const note = db.find((note) => note.id === id );
    if ( !note)
    {
        console.log(`Entry with ID ${id} not found`);
        
    } else {
        note.title = title;
        writeDB(db);
        console.log(`Entry with ID ${id} updated to "${title}"`);
      }
}


const deleteNote = (id) => {
    const db = readDB();
    const index = db.findIndex((entry) => entry.id === id);
    if (index === -1) {
      console.log(`Entry with ID ${id} not found`);
    } else {
      const entry = db[index];
      db.splice(index, 1);
      writeDB(db);
      console.log(`Entry "${entry.title}" with ID ${entry.id} deleted`);
    }
  };

//! node index.js add "this is a note " "20 - 10 - 2023"
const [ , , action ,...args] = process.argv;

switch(action)
{
    case 'add' :
        addNote({
            title:process.argv[3],
            date:process.argv[4]
        })
        break;
         
        case 'list':
            listNotes();
            break;

        case 'delete':
            if (args.length === 0) {
                console.log('Please provide an ID for the entry to delete');
              } else {
                const id = parseInt(args[0]);
                deleteNote(id);
              }
            break;

         case 'update':
            if (args.length < 2) {
                console.log('Please provide an ID and a new title for the entry');
              } else {
                const id = parseInt(args[0]);
                const title = args.slice(1).join(' ');
                updateNote(id, title);
              }
            break;



        default:
            throw new Error ('Not Implemented');
            break;
}

// console.log({
//     id: Date.now(),
//     action,
//     title,
//     date
// })



