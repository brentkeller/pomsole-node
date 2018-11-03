const inquirer = require('inquirer')

const MODES = {
  SESSION: 'SESSION',
  BREAK: 'BREAK'
}

const start = {
  async getConfig () {
    return await inquirer.prompt([
      {
        type: 'input',
        name: 'session',
        message: 'Length of the session in minutes',
        // TODO: Read default from config
        default: 20
      },
      {
        type: 'input',
        name: 'break',
        message: 'Length of the post-session break in minutes',
        // TODO: Read default from config
        default: 5
      },
      {
        type: 'input',
        name: 'task',
        message: 'Name of the task',
        // TODO: Re-use last task name
        default: ''
      },
      {
        type: 'input',
        name: 'category',
        message: 'Name of the task category',
        // TODO: Re-use last category
        default: ''
      }
      // TODO: Add quiet mode
    ])
  },
  configuration: null,
  currentMode: null,
  currentTimer: null,
  startTime: null,
  async start () {
    configuration = await this.getConfig()
    currentMode = MODES.SESSION
    startTime = new Date()
    currentTimer = setInterval(this.processTick, 500, this)
  },
  processTick (self) {
    currentTime = new Date()
    periodLength = currentMode === MODES.SESSION
      ? configuration.session
      : configuration.break
    elapsedSec = (currentTime.getTime() - startTime.getTime()) / 1000
    totalRemainingTime = (periodLength * 60) - elapsedSec
    if (totalRemainingTime < 1) {
      if (currentMode === MODES.SESSION){
        currentMode = MODES.BREAK
        startTime = new Date()
        return
      }
      clearInterval(currentTimer)
      // TODO: Play sound
      // TODO: Log successful session?
      self.writeUpdate('Session completed!')
      return
    }
    minRemaining = Math.floor(totalRemainingTime / 60)
    secRemaining = Math.floor(totalRemainingTime % 60).toFixed(0).toString().padStart(2, '0')
    const label = currentMode === MODES.SESSION ? 'Session' : 'Break'
    self.writeUpdate(`${label} remaining: ${minRemaining}:${secRemaining}`)
  },
  writeUpdate (text) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(text)
  }

}

module.exports = start