import _ from 'lodash';
import actions from './actions';

const initState = {
  count: 0,
  account: null,
};

function reducer(state = initState, action) {
  console.log('state: ', state);
  console.log('action: ', action);
  
  switch (action.type) {
    case actions.INCREASE:
      {
        const { count } = state;
        return { ...state, count: count + 1 };
      }
    case actions.SET_ACCOUNT:
      {
        console.log('actions.SET_ACCOUNT, state: ', state);
        const { account } = state;
        return { ...state, account };
      }
      return state;
  }
}

export default reducer;
