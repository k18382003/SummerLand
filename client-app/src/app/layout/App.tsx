import { useEffect } from 'react';
import './styles.css'
import './timeline.css'
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import "react-quill/dist/quill.core.css";
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/homepage';
import { ToastContainer } from 'react-toastify';
import { store, useStore } from '../stores/store';
import LoadingComp from './Loading';
import ModalContainer from '../common/modal/modalContainer';
import SessionContinue from '../../features/user/sessionContinue';

function App() {
  const location = useLocation();
  const { commonstore, accountstore } = useStore();

  useEffect(() => {
    if (commonstore.token)
      accountstore.getCurrentUser().finally(() => commonstore.setAppLoaded());
    else
      commonstore.setAppLoaded();
  }, [commonstore, accountstore])

  useEffect(() => {
    if (accountstore.showsessionReminder)
      store.modalstore.openModal(<SessionContinue />, "tiny", false, false, true)
    else
      store.modalstore.closeModal()
  }, [accountstore.showsessionReminder])

  if (!commonstore.appLoaded) return <LoadingComp inverted message='App loading...' />

  return (
    //Need to have <> </> to let react know its fragment = <React.fragment>
    <>
      <ModalContainer />
      <ToastContainer hideProgressBar position='bottom-right' theme='colored' />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{ marginTop: '5em' }} >
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);

