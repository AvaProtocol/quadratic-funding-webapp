import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash';

import OpenGrant from '../../openGrant';

export const PolkadotContext = React.createContext({});

const PolkadotProvider = ({ children, projectId, roundId }) => {
  const [openGrant, setOpenGrant] = useState(null);
  const [blockNumber, setBlockNumber] = useState(0);
  const [projects, setProjects] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [projectDetail, setProjectDetail] = useState({});

  // Init openGrant api
  const initOpenGrant = async () => {
    const og = new OpenGrant();
    await og.init();
    setOpenGrant(og);
  };

  // Get the project owner's identity information
  const getIdentity = async (projects) => {
    const promises = [];
    _.forEach(projects, (project) => {
      const { owner } = project;
      promises.push(openGrant.getIdentity(owner));
    });

    const results = await Promise.all(promises);

    const newProjects = [];
    _.forEach(results, (item, index) => {
      if (!_.isEmpty(item.toHuman())) {
        const username =
          item.toHuman().info.display.Raw || projects[index].owner;
        newProjects.push({ ...projects[index], username });
      } else {
        newProjects.push(projects[index]);
      }
    });
    setProjects(newProjects);
  };

  // Get all projects information
  const getProjects = async () => {
    const count = await openGrant.getProjectCount();
    const promises = [];
    for (let index = 0; index < count; index += 1) {
      promises.push(openGrant.getProjectInfo(index));
    }

    const results = await Promise.all(promises);

    const newProjects = [];
    _.forEach(results, (item, index) => {
      newProjects.push({ ...item.toHuman(), id: index });
    });
    setProjects(newProjects);

    await getIdentity(newProjects);
  };

  // Get all rounds information
  const getRounds = async () => {
    const count = await openGrant.getGrantRoundCount();
    const promises = [];
    for (let index = 0; index < count; index += 1) {
      promises.push(openGrant.getGrantRoundInfo(index));
    }

    const results = await Promise.all(promises);

    const newRounds = [];
    _.forEach(results, (item, index) => {
      newRounds.push({ ...item.toHuman(), id: index });
    });
    setRounds(newRounds);
  };

  useEffect(() => {
    if (!openGrant) {
      initOpenGrant();
    }
  }, []);

  useEffect(() => {
    if (openGrant) {
      // Substribe the latest block number
      openGrant.api.rpc.chain.subscribeNewHeads((header) => {
        setBlockNumber(Number(header.number));
      });

      getProjects();
      getRounds();
    }
  }, [openGrant]);

  // Get specific round's project contribute information
  useEffect(() => {
    if (projectId && roundId && !_.isEmpty(rounds) && !_.isEmpty(projects)) {
      const round = _.find(
        rounds,
        (item) => Number(item.id) === Number(roundId)
      );
      const project = _.find(
        projects,
        (item) => Number(item.id) === Number(projectId)
      );

      const { grants } = round;
      const grant = _.find(
        grants,
        (item) => Number(item.project_index) === Number(projectId)
      );

      setProjectDetail({ ...project, ...grant });
    }
  }, [rounds, projects]);

  return (
    <PolkadotContext.Provider
      value={{ openGrant, projects, rounds, blockNumber, projectDetail }}
    >
      {children}
    </PolkadotContext.Provider>
  );
};

export default PolkadotProvider;
