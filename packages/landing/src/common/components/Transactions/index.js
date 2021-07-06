import React, { useState, useEffect }  from 'react';
import _ from 'lodash';
import cloudbase from '@cloudbase/js-sdk';
import TransactionsStyle from './transactions.style';

const Transactions = ({ ...props }) => {
  const { voteRecords } = props;

  const getVoteList = (votes) => {
    return _.map(votes, (vote) => {
      const { address, amount, timestamp } = vote;
      return (
        <div style={{ border: '1px solid #ccc', marginTop: 10, padding: 10 }}>
          <div>user: {address}</div>
          <div>amnout: {amount}</div>
          <div>timestamp: {timestamp}</div>
        </div>
      );
    });
  }

  return (
    <TransactionsStyle {...props}>
      <div>{getVoteList(voteRecords)}</div>
    </TransactionsStyle>
  );
};

export default Transactions;
