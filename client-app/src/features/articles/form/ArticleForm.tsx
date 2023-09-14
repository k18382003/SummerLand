import React, { useEffect, useState } from 'react'
import { Button, Form, Header, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingComp from '../../../app/layout/Loading';
import { v4 as uuid } from 'uuid';
import { Formik } from 'formik';
import { Article } from '../../../app/models/article';
import * as yup from "yup";
import MyTextField from '../../../app/common/form/MyTextField';
import MyDropDownField from '../../../app/common/form/MyDropDownField';
import MyEditorField from '../../../app/common/form/MyEditorField';
import { CategoryOption } from '../../../app/common/form/dropdownopt/CategoryOption';


export default observer(function ArticleForm() {
  const { articlestore } = useStore();
  const { CreateArticle, EditArticle, LoadArticle, loading, loadinginitial, selectedarticle } = articlestore;
  const { id } = useParams();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    title: yup
      .string()
      .required("Title cannot be empty"),
    category: yup
      .string()
      .required("Please choose a category"),
    content: yup
      .string()
      .required(" cannot be empty")
  })

  const [article, setArticle] = useState<Article>(selectedarticle ?? {
    artID: '',
    title: '',
    category: '',
    createDate: '',
    content: '',
    authorName: '',
  });


  useEffect(() => {
    if (id) LoadArticle(id).then(article => setArticle(article!))
  }, [id, LoadArticle])

  async function handleFormSubmit(article: Article) {
    if (article.artID === '') {
      article.artID = uuid();
      await CreateArticle(article)
      navigate(`/article/${article.artID}`)
    }
    else {
      await EditArticle(article)
      navigate(`/article/${article.artID}`)
    }
  }

  if (loadinginitial) return <LoadingComp message='Loading article...' inverted={true} />

  return (
    <>
      {console.log(article.isauthor + ' ' + article.myFav)}
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={article}
        onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit }) => (
          <Segment clearing>
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
              <MyTextField label='Article Title' name='title' placeholder='Title' rows={1} />
              <MyEditorField label='Artilce Content' name='content' placeholder={'content'} />
              <MyDropDownField label='Article Category' name='category' placeholder="Category" option={CategoryOption} />
              <Button as={Link} to="/article" floated='right' color='grey' content='Cancel' />
              <Button loading={loading} floated='right' color='black' type='submit' content='Save' />
            </Form>
          </Segment>
        )}
      </Formik>
    </>
  )
})