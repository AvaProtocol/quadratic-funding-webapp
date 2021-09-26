import React from 'react';

import _ from 'lodash';

import ContributorsStyle from './contributors.style';
import { ellipsisAddress, unitToNumber } from 'common/utils';
import config from '../../../config';

const { oak } = config;

const Contributors = ({ contributions, ...props }) => {
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
