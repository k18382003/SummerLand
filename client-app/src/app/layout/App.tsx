import React, { useEffect } from 'react';
import './styles.css'
import './timeline.css'
import { Container, Loader } from 'semantic-ui-react';
import NavBar from './NavBar';
import "react-quill/dist/quill.core.css";
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/homepage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import LoadingComp from './Loading';
import ModalContainer from '../common/modal/modalContainer';

function App() {
  const location = useLocation();
  const {commondstore, accountstore} = useStore();

  useEffect(()=>{
    if (commondstore.token)
      accountstore.getCurrentUser().finally(() => commondstore.setAppLoaded());
    else
      commondstore.setAppLoaded();
  }, [commondstore, accountstore])

  if (!commondstore.appLoaded) return <LoadingComp inverted message='App loading...' /> 

  return (
    //Need to have <> </> to let react know its fragment = <React.fragment>
    <> 
      <ModalContainer />
      <ToastContainer hideProgressBar position='bottom-right' theme='colored' />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{marginTop: '5em'}} >
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);

