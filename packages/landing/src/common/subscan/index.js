import _ from 'lodash';
import moment from 'momnet';
import config from '../../config';

const { subscan, oak: { decimals } } = config;

const PAGE_SIZE = 100;

/**
 * Subscan wrapper
 */
class Subscan {
	/**
	 * Get extrinsics
	 * @param {string} moduleId 
	 * @param {string} callId 
	 * @returns extrinsics
	 */
  async getContributions (fund_id) {
		try {
			const url = `${subscan.baseUrl}/scan/parachain/contributes`;
			const body =  JSON.stringify({ page: 0, row: PAGE_SIZE, fund_id });
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'x-api-key': subscan.apiKey,
				},
				body
			});
			const responseBody = await response.json();
			console.log(responseBody);
			const { data: { contributes } } = responseBody;
			const contributions = _.map(contributes, (contribute) => {
				const { who, block_timestamp, contributed } = contribute;
				return { address: who, amount: parseInt(contributed) / (10 ** 12), timestamp: block_timestamp * 1000 };
			} );
			return contributions;
		} catch (err) {
			console.log(err);
			return [];
		}
  }

}

export default new Subscan();
