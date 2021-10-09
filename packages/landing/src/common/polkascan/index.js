import _ from 'lodash';
import moment from 'momnet';
const BASE_URL = 'http://rpc.testnet.oak.tech:8080/api/v1';
const PAGE_SIZE = 10000;
const DECIMAL = 10e-11;

class Polkascan {
  async getExtrinsics (moduleId, callId) {
		const url = `${BASE_URL}/extrinsic?filter[signed]=1&filter[module_id]=${moduleId}&filter[call_id]=${callId}&page[size]=${PAGE_SIZE}`;
		const response = await fetch(url);
		const responseData = await response.json();
		let extrinsics = responseData.data;
		extrinsics = _.filter(extrinsics, { attributes: { success: 1 }})
		const promises = _.map(extrinsics, async (extrinsic) => {
			const { attributes } = extrinsic;
			const { extrinsic_hash } = attributes;
			return this.getExtrinsicDetail(extrinsic_hash);
		});
		const promiseResults = await Promise.allSettled(promises);
		_.each(promiseResults, (promiseResult, index) => {
			if (promiseResult.status === 'fulfilled') {
				const { attributes } = extrinsics[index];
				const { params, datetime } =  promiseResult.value;
				attributes.params = params;
				attributes.datetime = datetime;
			}
		});
		return extrinsics;
  }

	async getExtrinsicDetail (hash) {
		const url = `${BASE_URL}/extrinsic/0x${hash}`;
		const response = await fetch(url);
		const responseData = await response.json();
		const { data: { attributes }}  = responseData;
		return attributes;
	}

	async getContributionsByProjectIndex(projectIndex) {
		let extrinsics = await this.getExtrinsics('QuadraticFunding', 'contribute');
		extrinsics = _.filter(extrinsics, (extrinsic) => {
			const { attributes } = extrinsic;
			const { params } = attributes;
			const projectIndexParam = _.find(params, { name: 'project_index' });
			return projectIndexParam.value === projectIndex;
		});
		const votes = _.map(extrinsics, (extrinsic) => {
			const { attributes: { address, params, datetime } } =  extrinsic;
			const valueParam = _.find(params, { name: 'value' });
			return { address, amount: valueParam.value * DECIMAL, timestamp: moment(datetime).valueOf() };
		});
		return votes;
	}
}

export default new Polkascan();
