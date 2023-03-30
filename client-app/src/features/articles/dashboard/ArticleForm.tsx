import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import { Article } from '../../../app/models/article'
import QuillEditor from '../../../app/common/QuillEditor';

interface Props{
    article: Article | undefined;
    closeForm: () => void;
    createOrEdit: (article: Article) => void;
    saveArticle: boolean;
}

const TopicOptions = [
    {
      key: 'C#',
      text: 'C#',
      value: 'C#'

    },
    {
      key: 'Python',
      text: 'Python',
      value: 'Python'

    },
    {
      key: '.Net',
      text: '.Net',
      value: '.Net'
    },
    {
        key: 'Javascript',
        text: 'Javascript',
        value: 'Javascript'
    },
    {
        key: 'Others',
        text: 'Others',
        value: 'Others'
    }
  ]

  
  export default function ArticleForm({article : selectedArticle, closeForm, createOrEdit, saveArticle}:Props)
  {
      const initialState = selectedArticle ?? {
        artID : '',
        title : '',
        category : '',
        createDate : '',
        content: '',   
      } 

      const [article, setArticle] = useState(initialState);

      function handleSubmit(){
        createOrEdit(article);
      }

      function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        // Spread into article (matching the name with the article object and set the value to it)
        setArticle({...article, [name]: value})
      }

      function handleDropDownChange(event: SyntheticEvent<HTMLElement>, data : object){
        const found = Object.entries(data).find(([key]) => key === 'value');
        setArticle({...article, category : found?.[1]})
      }

      function handleEditorChange(value: string){
        setArticle({...article, content : value})
      }

      return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={article.title} name='title' onChange={handleInputChange}></Form.Input>
                <QuillEditor value={article.content} onChange={handleEditorChange}/>
                <Form.Dropdown search selection placeholder='Category' options={TopicOptions} value={article.category} name='category' onChange={handleDropDownChange}>
                </Form.Dropdown>
                <Button onClick={() => closeForm()} floated='right' color='grey' content='Cancel'/>
                <Button loading={saveArticle} floated='right' color='black' type='submit' content='Save'/>
            </Form>
        </Segment>
    )
}