const program = require('commander')
const start = require('../commands/start')

program
  .option('-l, --length', 'Length of the session in minutes')
  .option('-b, --break', 'Length of the post-session break in minutes')
  .option('-t, --task', 'Name of the task')
  .option('-c, --category', 'Name of the task category')
  .option('-q, --quiet', 'Quiet mode (no sounds)')
  .description('Start a pomodoro session')
  .action(async () => await start.start())

program
  .parse(process.argv)
