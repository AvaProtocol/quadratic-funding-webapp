import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';
import MatchingWrapper from './matchingSection.style';
import { PolkadotContext } from 'common/contexts/PolkadotContext';
import { Spin } from 'antd';
import config from '../../../config';
import { unitToNumber } from 'common/utils';

const { oak } = config;

const MatchingSection = ({ row, col, rid }) => {
  const polkadotContext = useContext(PolkadotContext);
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState({});
  const [projectDetail, setProjectDetail] = useState({});
  const [contributions, setContributions] = useState([]);
  const [latestContributions, setLatestContributions] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalMatching, setTotalMatching] = useState(0);

  const getMatchingFund = (matching) => {
    const fund = _.isEmpty(round) ? 0 : unitToNumber(round.matching_fund);
    return totalMatching ? ((matching / totalMatching) * fund).toFixed(4) : 0;
  };

  useEffect(() => {
    if (!_.isEmpty(polkadotContext)) {
      setLoading(false);
      setRound(polkadotContext.rounds[rid] || {});
      setProjectDetail(polkadotContext.projectDetail || {});

      const newContributions = [];
      _.forEach(polkadotContext.projectDetail.contributions, (item, index) => {
        newContributions.push({ ...item, index });
      });
      setContributions(newContributions);
    }
  }, [
    polkadotContext.projectDetail,
    polkadotContext.projectDetail.contributions,
  ]);

  useEffect(() => {
    const { length } = contributions;
    switch (length) {
      case 0: {
        setLatestContributions([]);
        break;
      }

      case 1: {
        setLatestContributions([contributions[0]]);
        break;
      }

      default: {
        setLatestContributions([
          contributions[length - 1],
          contributions[length - 2],
        ]);
        break;
      }
    }

    let totalContribute = 0;
    _.forEach(contributions, (item) => {
      totalContribute = totalContribute + unitToNumber(item.value);
    });

    setTotal(totalContribute);

    let totalMatchingAmount = 0;
    _.forEach(round.grants, (item) => {
      totalMatchingAmount += item.matching;
    });

    setTotalMatching(totalMatchingAmount);
  }, [contributions]);

  console.log('projectDetail: ', projectDetail);

  return (
    <MatchingWrapper>
      <Container>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Box className="row" {...row}>
            <Box className="col" {...col}>
              <div className="block matcing">
                <div className="count-down">
                  <text className="title">Project {projectDetail.name}</text>
                  <text className="count-down-text">
                    {projectDetail.description}
                  </text>
                </div>
                <div className="contribute-info">
                  {_.map(latestContributions, (item) => {
                    return (
                      <div className="contribute" key={item.account_id}>
                        <span>
                          + {unitToNumber(item.value)} {oak.symbol} contribution
                        </span>
                      </div>
                    );
                  })}
                </div>
                <span style={{ marginTop: '10px' }}>
                  ${total * oak.price} Raised{' '}
                  <span style={{ fontSize: 12 }}>
                    from {contributions.length} contributors
                  </span>
                </span>
                <span>
                  + {getMatchingFund(projectDetail.matching)} {oak.symbol} match
                </span>
                <div>
                  <div className="total">
                    <div className="current"></div>
                  </div>
                </div>
                <div className="participate">
                  <Button title="Participate" />
                </div>
              </div>
            </Box>

            <Box className="col" {...col}>
              <div className="block">
                <div className="carousell">
                  <span>Carousell</span>
                </div>
              </div>
            </Box>
          </Box>
        )}
      </Container>
    </MatchingWrapper>
  );
};

MatchingSection.propTypes = {
  title: PropTypes.object,
  btnStyle: PropTypes.object,
  description: PropTypes.object,
  contentStyle: PropTypes.object,
  discountText: PropTypes.object,
  discountAmount: PropTypes.object,
  outlineBtnStyle: PropTypes.object,
};

MatchingSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
    alignItems: 'center',
  },
  col: {
    pr: '15px',
    pl: '15px',
    width: ['100%', '70%', '60%', '50%'],
  },
  title: {
    fontSize: ['26px', '34px', '42px', '55px'],
    fontWeight: '300',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: ['20px', '25px'],
    lineHeight: '1.31',
  },
  description: {
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '2.1',
    mb: '0',
  },
  btnStyle: {
    minWidth: ['120px', '156px'],
    fontSize: '14px',
    fontWeight: '500',
  },
  outlineBtnStyle: {
    minWidth: ['130px', '156px'],
    fontSize: '14px',
    fontWeight: '500',
    color: '#0f2137',
    p: '5px 10px',
  },
  discountAmount: {
    fontSize: '14px',
    color: '#10AC84',
    mb: 0,
    as: 'span',
    mr: '0.4em',
  },
  discountText: {
    fontSize: '14px',
    color: '#0f2137',
    mb: 0,
    as: 'span',
  },
};

export default MatchingSection;
