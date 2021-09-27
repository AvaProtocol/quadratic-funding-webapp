import React, { useEffect, useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import LineChartsStyle from './lineCharts.style';
import { PolkadotContext } from 'common/contexts/PolkadotContext';
import backend from 'common/backend';
import _ from 'lodash';
import moment from 'moment';
import 'chartjs-adapter-moment';

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
    const projectVotes = _.filter(votes, (vote) => {
      return vote.projectIndex === projectIndex;
    });

    if (_.isEmpty(projectVotes)) {
      return;
    }

    const dayDatas = []; // List of data({ x: '2020-01-01', y: 40})

		// Calculate dayDatas
    _.each(projectVotes, (vote) => {
      const momentFormat = moment(vote.timestamp).format('YYYY-MM-DD');
      let lastData = _.last(dayDatas);

      if (!lastData || lastData.x != momentFormat) {
        const data = {
          x: momentFormat,
          y: _.isEmpty(dayDatas.length) ? 0: lastData.y,
        };
        dayDatas.push(data);
        lastData = data;
      }

      lastData.y += vote.amount;
    });

		// Set chart data
    setChartData({
      datasets: [
        {
          label: '# of Votes',
          data: dayDatas,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    });
  }, [polkadotContext.projectDetail]);

	// Set chart options
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
					unit: 'day',
					displayFormats: { day: 'YYYY-MM-D' }
				},
      },
      y: { beginAtZero: true },
    },
  };

  return (
    <LineChartsStyle {...props}>
      {!_.isEmpty(chartData) && (
        <Line height={370} data={chartData} options={options} />
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
