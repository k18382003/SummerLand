import React, { useEffect, useState } from 'react';
import './styles.css'
import { Header, Container } from 'semantic-ui-react';
import { Article } from '../models/article';
import NavBar from './NavBar';
import ArticleDashBoard from '../../features/articles/dashboard/ArticleDashBoard';
import agent from '../api/agent';
import LoadingComp from './Loading';
import {v4 as uuid} from 'uuid';
import "react-quill/dist/quill.core.css";

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [article, setSelectArticle] = useState<Article | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, showLoading] = useState(true);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    agent.Articles.List().then(res => {
      setArticles(res);
      showLoading(false);
    }) 
  }, []) // to avoid the request fire infinitly, we give [], to let it fire only one time

  // get the selected article
  function handleSelectArticle(artid: string) {
    setSelectArticle(articles.find(a => a.artID === artid));
  }

  // cancel select (set to undefine)
  function handleCancelSelectArticle(){
    setSelectArticle(undefined);
  }

  // checking if current mode (view/edit/add) and open the form
  function handleFormOpen(id?: string){
    id ? handleSelectArticle(id) : handleCancelSelectArticle();
    setEditMode(true);
  }

  // handle form close
  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditArticle(article:Article)
  {
    // Edit if has artID
    setSubmit(true);
    if (article.artID){
      agent.Articles.Update(article).then(() =>{
        setArticles([...articles.filter(x => x.artID !== article.artID), article])
        setSelectArticle(article);
        setEditMode(false);
        setSubmit(false);
      })
    }
    else
    {
      // Create if artID is undefined
      article.artID = uuid();
      article.createDate = new Date().toISOString();
      agent.Articles.Create(article).then(() =>{
        setArticles([...articles, article])
        setSelectArticle(article);
        setEditMode(false);
        setSubmit(false);
      })
    }
  }

  function handleDelete(id : string)
  {
    setSubmit(true);
    agent.Articles.Delete(id).then(() => {
      setArticles([...articles.filter(x => x.artID !== id)]);
      setSubmit(false);
    })
  }



  if (loading) return <LoadingComp inverted={true} message={"Loading Articles..."}/>

  return (
    //Need to have <> </> to let react know its fragment = <React.fragment>
    <> 
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '5em'}}>
        <ArticleDashBoard 
          articles={articles} 
          selectedArticle={article}
          selectArticle={handleSelectArticle}
          cancelSelectArticle={handleCancelSelectArticle}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          createOrEdit = {handleCreateOrEditArticle}
          deleteArticle = {handleDelete}
          saveArticle = {submit}
        />
      </Container>
    </>
  );
}

export default App;

