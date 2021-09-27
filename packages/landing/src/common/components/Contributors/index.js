import React from 'react';

import _ from 'lodash';

import ContributorsStyle from './contributors.style';
import { ellipsisAddress, unitToNumber } from 'common/utils';
import config from '../../../config';

const { oak } = config;

const Contributors = ({ contributions, ...props }) => {
  // In the data structure on the blockchain, the latest contribution is at the end of the list, and the reverse is to make the latest contribution appear at the top of the interface list.
  const reverseContributions = _.reverse(_.clone(contributions));
  return (
    <ContributorsStyle {...props}>
      {_.map(reverseContributions, (contribution) => {
        return (
          <div key={contribution.account_id} className="contribution-row">
            <span>Account: {ellipsisAddress(contribution.account_id)}</span>
            <span className="contribution-value">
              Value: {unitToNumber(contribution.value)} {oak.symbol}
            </span>
          </div>
        );
      })}
    </ContributorsStyle>
  );
};

export default Contributors;
