import { observer } from 'mobx-react-lite';
import { Button, Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { useNavigate } from 'react-router-dom'

interface Props {
  artID: string
}


export default observer(function DeleteArticleMsg({ artID }: Props) {
  const { modalstore, articlestore } = useStore();
  const navigate = useNavigate();

  function handleDelete(id: string) {
    articlestore.DeleteArticle(id).then(() => navigate('/article'))
  }

  return (
    <>
      <Header>Delete Article</Header>
      <p>Are you sure you want to delete this article?</p>
      <Button color='black' onClick={modalstore.closeModal} floated='right'>
        No
      </Button>
      <Button
        color='red'
        onClick={() => { handleDelete(artID) }}
        loading={articlestore.loading}
        floated='right' >
        Yes
      </Button>
      <br />
    </>
  )
})

