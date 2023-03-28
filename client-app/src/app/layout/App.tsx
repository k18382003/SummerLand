import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css'
import { Header, Container } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { Article } from '../models/article';
import NavBar from './NavBar';
import ArticleDashBoard from '../../features/articles/dashboard/ArticleDashBoard';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [article, setSelectArticle] = useState<Article | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Article[]>('http://localhost:5000/api/article')
    .then(res => {
      setArticles(res.data);
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
        />
      </Container>
    </>
  );
}

export default App;
