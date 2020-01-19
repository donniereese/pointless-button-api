const hat = require('hat');
const util = require('./util');

const status = {
    SUCCESS     : '200',
    BAD_REQUEST : '400',
    UNAUTHORIZED: '401',
    FORBIDDEN   : '403',
    NOT_FOUND   : '404',
    SERVER_ERR  : '500',
    USER_ERR    : '422'
};

let headInstance = null;

const defaultRuleset = new Map([
  ['hear', { console: 'log', value: true, }],
  ['notice', { console: 'warn', value: false, }],
  ['alert', { console: 'error', value: false, }],
]);

const HeardEvent = {
  sounds: [],
  from: undefined,
  timestamp: 0,
  echo: function ( i = null ) {
    const temp = this.sounds[i ? i : this.sounds.length - 1];
    console.log(temp);
  },
  from: function (f) { this.from = f; },
}


class Eartoface {
  constructor(name) {
    if(!name) throw new util.EartofaceError('Eartoface must have a name.');
  }
}


class Head {
  constructor() {
    this.ears = new Map();
    this.masterSounds = [];
  }

  registerEar(earInstance) {
    if (!this.ears.has(earInstance.id)) this.ears.set(earInstance.id, earInstance);
  }

  unregisterEar() {
    if (!this.ears.has(earInstance.id)) return false;

    this.ears.delete(earInstance.key);
  }

  newEvent(...snds) {
    const event = Object.assign({}, HeardEvent, { timestamp: Date.now()});
    event.sounds.push(...snds);
    this.masterSounds.push(event);
    return event;
  }
}


class Listener {
  constructor(moduleName = 'unknownModule**') {
    if (!headInstance) headInstance = new Head();
    this.head = headInstance;
    this.name = moduleName;
    this.stack = [];
    this.id = hat();

    this._rules = util.cloneMap(defaultRuleset);

    this.link = this.head.registerEar(this)
  }

  hear (...msgs) {
      const event = this.head.newEvent(msgs);
      this.stack.push(event);
      console.log('\n\n\n', this.rules, '\n\n\n')
      if (this.rules.get('hear').value) event.echo();
  }

  notice (...msgs) {

  }

  alert (...msgs) {

  }

  set rules(ruleSet) {
    this._rules = rulesSet;
  }

  get rules() {
    return this._rules;
  }
}

module.exports = {
    status,
    Listener,
    Head,
}
