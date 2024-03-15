import { observer } from 'mobx-react-lite';
import { Button, Header } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import { useEffect, useState } from 'react';


export default observer(function SessionContinue() {

  const { accountstore } = useStore();
  const [counter, setCounter] = useState(accountstore.reminder_timer);

  useEffect(() => {
    const timer = (counter > 0) && setInterval(() => {
      setCounter(counter - 1);
    }, 1000) as any
    return (() => {
      clearInterval(timer);
    })
  }, [counter])

  return (
    <>
      <Header>Stay login?</Header>
      <p>If not, you be log out automatically in 30 seconds.</p>
      <Button
        loading={accountstore.reminder_loader}
        color='red'
        onClick={() => {
          accountstore.refreshToken();
        }}
        floated='right' >
        Yes, I want to stay ({counter}).
      </Button>
      <Button
        color='black'
        onClick={() => {
          accountstore.logout();
        }}
        floated='right' >
        Log me out.
      </Button>
      <br />
    </>
  )
})

