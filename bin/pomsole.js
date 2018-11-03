#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  //.command('configure', 'View or change configuration')
  .command('start', 'Start a pomodoro session')

program
  .parse(process.argv)
