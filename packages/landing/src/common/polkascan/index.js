import _ from 'lodash';
import moment from 'momnet';
import config from '../../config';

const { polkascan, oak: { decimals } } = config;

const PAGE_SIZE = 10000;

/**
 * Polkascan wrapper
 */
class Polkascan {
	/**
	 * Get extrinsics
	 * @param {string} moduleId 
	 * @param {string} callId 
	 * @returns extrinsics
	 */
  async getExtrinsics (moduleId, callId) {
		try {
			const url = `${polkascan.baseUrl}/extrinsic?filter[signed]=1&filter[module_id]=${moduleId}&filter[call_id]=${callId}&page[size]=${PAGE_SIZE}`;
			const response = await fetch(url);
			const responseData = await response.json();
			if (!responseData || !_.isArray(responseData.data) ||  _.isEmpty(responseData.data)) {
				return [];
			}
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
	 * @returns extrinsics detail
	 */
	async getExtrinsicDetail (extrinsicHash) {
		const url = `${polkascan.baseUrl}/extrinsic/0x${extrinsicHash}`;
		const response = await fetch(url);
		const responseData = await response.json();
		if (!responseData ||  _.isEmpty(responseData.data)) {
			return {};
		}
		const { data: { attributes }}  = responseData;
		return attributes;
	}

	/**
	 * Get contributions by project index
	 * @param {number} projectIndex 
	 * @returns contributions
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
			const amount = valueParam ? valueParam.value / (10 ** decimals) : 0;
			return { address, amount, timestamp: moment(datetime).valueOf() };
		});
		return contributions;
	}
}

export default new Polkascan();
