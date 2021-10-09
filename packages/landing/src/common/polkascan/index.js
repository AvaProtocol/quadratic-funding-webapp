import _ from 'lodash';
import moment from 'momnet';
const BASE_URL = 'http://rpc.testnet.oak.tech:8080/api/v1';
const PAGE_SIZE = 10000;
const DECIMALS = 10e9;

/**
 * Polkascan wrapper
 */
class Polkascan {
	/**
	 * Get extrinsics
	 * @param {string} moduleId 
	 * @param {string} callId 
	 * @returns 
	 */
  async getExtrinsics (moduleId, callId) {
		try {
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
		} catch (err) {
			console.log(err);
			return [];
		}
  }

	/**
	 * Get extrinsic detail
	 * @param {string} extrinsicHash 
	 * @returns 
	 */
	async getExtrinsicDetail (extrinsicHash) {
		const url = `${BASE_URL}/extrinsic/0x${extrinsicHash}`;
		const response = await fetch(url);
		const responseData = await response.json();
		const { data: { attributes }}  = responseData;
		return attributes;
	}

	/**
	 * Get contributions by project index
	 * @param {number} projectIndex 
	 * @returns 
	 */
	async getContributionsByProjectIndex(projectIndex) {
		let extrinsics = await this.getExtrinsics('QuadraticFunding', 'contribute');
		extrinsics = _.filter(extrinsics, (extrinsic) => {
			const { attributes } = extrinsic;
			const { params } = attributes;
			if (!params) {
				return false;
			}
			const projectIndexParam = _.find(params, { name: 'project_index' });
			return projectIndexParam && projectIndexParam.value === projectIndex;
		});
		const contributions = _.map(extrinsics, (extrinsic) => {
			const { attributes: { address, params, datetime } } =  extrinsic;
			const valueParam = _.find(params, { name: 'value' });
			const amount = valueParam ? valueParam.value / DECIMALS : 0;
			return { address, amount, timestamp: moment(datetime).valueOf() };
		});
		return contributions;
	}
}

export default new Polkascan();
