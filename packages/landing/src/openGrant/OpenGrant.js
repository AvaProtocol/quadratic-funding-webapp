const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const _ = require('lodash');

const config = require('./config');

class OpenGrant {
  constructor() {
    this.api = '';
  }

  // Initial the Polkadot.js api promise
  async init() {
    if (_.isEmpty(this.api)) {
      const { endpoint, types } = config;
      const wsProvider = new WsProvider(endpoint);
      const api = await ApiPromise.create({
        provider: wsProvider,
        types,
      });

      this.api = api;
    }
  }

  // Storage Module

  /**
   * Read the OpenGrant's storage data
   * @param {*} method OpenGrant's method name
   * @param  {...any} args OpenGrant's method's params
   */
  readStorage(method, ...args) {
    return this.api.query.openGrant[method](...args);
  }

  async getCurrentBlockNumber() {
    const blockNumber = await this.api.query.system.number();
    return blockNumber.toNumber();
  }

  async getProjectCount() {
    const projectCount = await this.readStorage('projectCount');
    return projectCount.toNumber();
  }

  async getProjectInfo(projectIndex) {
    const projectInfo = await this.readStorage('projects', projectIndex);
    return projectInfo;
  }

  async getGrantRoundCount() {
    const roundCount = await this.readStorage('roundCount');
    return roundCount.toNumber();
  }

  async getGrantRoundInfo(grantRoundIndex) {
    const roundInfo = await this.readStorage('rounds', grantRoundIndex);
    return roundInfo;
  }

  async getIdentity(accountId) {
    const identity = await this.api.query.identity.identityOf(accountId);
    return identity;
  }
}

export default OpenGrant;
