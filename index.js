const { Command, program } = require('commander');

program
    // .arguments('<cmd> [title]')
    .command('add')
    .arguments('<title> <date>','title & body')
    .description(' add new note to the DB')



  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')
//   .requiredOption('-c, --cheese <type>', 'pizza must have cheese');

program.parse(process.argv);
console.log(program)