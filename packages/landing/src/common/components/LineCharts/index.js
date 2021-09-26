import React, { useEffect, useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Line } from '@reactchartjs/react-chart.js';
import LineChartsStyle from './lineCharts.style';
import { PolkadotContext } from 'common/contexts/PolkadotContext';
import backend from 'common/backend';
import _ from 'lodash';
import moment from 'moment';

const X_NUM = 7;

const LineCharts = (props) => {
  const polkadotContext = useContext(PolkadotContext);
  const [chartData, setChartData] = useState(null);

  useEffect(async () => {
    const projectIndex = parseInt(polkadotContext.projectDetail.project_index);
    const result = await backend
      .getDatabase()
      .collection('votes')
      .where({
        projectIndex,
      })
      .get();

    // Find votes of project
    const votes = result.data;
    const projectVotes = _.filter(
      votes,
      (vote) => vote.projectIndex === projectIndex
    );

    if (_.isEmpty(projectVotes)) {
      return;
    }

    // get days from 2000-01-01 00:00:00
    const getDays = (timestamp) =>
      Math.floor(
        moment
          .duration(moment(timestamp) - moment('2000-1-1 00:00:00'))
          .asDays()
      );

    // Calculate day section
    const beginDay = getDays(projectVotes[0].timestamp);
    const endDay = getDays(new Date());
    const dayDistance = endDay - beginDay + 1;

    let daySection = Math.ceil(dayDistance / X_NUM);
    daySection = daySection > 1 ? daySection : 1;

    // Initialize chart data
    const dayDatas = [];
    for (let i = 0; i < X_NUM; i += 1) {
      const day = i * daySection;
      dayDatas.push({ day, amount: day - 1 > dayDistance ? null : 0 });
    }

    // Calculate chart data
    _.each(projectVotes, (vote) => {
      const day = getDays(vote.timestamp);
      const dayDiff = day - beginDay;
      const index = Math.floor(dayDiff / daySection);
      dayDatas[index].amount += vote.amount;
    });

    // Accumulate previous votes
    for (let i = 1; i < X_NUM; i += 1) {
      if (dayDatas[i].day > dayDistance) {
        break;
      }
      dayDatas[i].amount += dayDatas[i - 1].amount;
    }

    // Set chart datas
    const labels = _.map(dayDatas, (item) =>
      moment(projectVotes[0].timestamp).add(item.day, 'day').format('YYYY/M/D')
    );
    const amounts = _.map(dayDatas, (item) => item.amount);

    setChartData({
      labels,
      datasets: [
        {
          label: '# of Votes',
          data: amounts,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    });
  }, [polkadotContext.projectDetail]);

  return (
    <LineChartsStyle {...props}>
      {!_.isEmpty(chartData) && (
        <Line
          height={370}
          data={chartData}
          options={{ maintainAspectRatio: false }}
        />
      )}
    </LineChartsStyle>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  projectRecords: state.projects,
});

const mapDispatchToProps = (dispatch) => ({
  setAccount: (account) => dispatch(actions.setAccount(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LineCharts);
