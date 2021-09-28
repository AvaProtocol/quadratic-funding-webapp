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

		// Calculate dayDatas
		// Group all data by dates.
		const groupedVotes = _.groupBy(projectVotes, (vote) => moment(vote.timestamp).format('YYYY-MM-DD'));
		// Loop over each group, and sum up all vote.amount, and change it to data.y.
		const dayDatas = _.map(groupedVotes, (votes, key) => ({
				x: key,
				y: _.reduce(votes, (sum, vote) => sum + vote.amount, 0),
			}
		));
		// Accumulate the votes of the previous day
		_.each(dayDatas, (data, index) => data.y += index === 0 ? 0 : dayDatas[index-1].y);

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
