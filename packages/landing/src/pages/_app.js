import { Modal } from '@redq/reuse-modal';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import '@redq/reuse-modal/es/index.css';
import 'common/assets/css/flaticon.css';
import 'swiper/swiper-bundle.css';
import '../containers/CryptoModern/CountDown/timer.css';
import 'common/assets/css/icon-example-page.css';
import reducers from '../redux/reducers'

const store = createStore(reducers);

export default function CustomApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Modal>
        <Component {...pageProps} />
      </Modal>
    </Provider>
  );
}
