import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownItemProps, Form, FormDropdown, Image, Segment } from 'semantic-ui-react';
import { Article } from '../../../app/models/article'
import TextFormattingGroupIcon from '../../TextFormatting';
import {v4 as uuid} from 'uuid';

interface Props{
    article: Article | undefined;
    closeForm: () => void
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

  
  export default function ArticleForm({article : selectedArticle, closeForm}:Props)
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
        console.log(article);
      }

      function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        console.log(event.target)
        // Spread into article (matching the name with the article object and set the value to it)
        setArticle({...article, [name]: value})
      }

      function handleDropDownChange(event: SyntheticEvent<HTMLElement>, data : object){
        const found = Object.entries(data).find(([key]) => key === 'value');
        setArticle({...article, category : found?.[1]})
      }

      return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' value={article.title} name='title' onChange={handleInputChange}></Form.Input>
                <TextFormattingGroupIcon />
                <Form.TextArea rows='15' placeholder='Content' value={article.content} name='content' onChange={handleInputChange}>
                </Form.TextArea>
                <Form.Dropdown search selection placeholder='Category' options={TopicOptions} value={article.category} name='category' onChange={handleDropDownChange}>
                </Form.Dropdown>
                <Button onClick={() => closeForm()} floated='right' color='grey' content='Cancel'/>
                <Button floated='right' color='black' type='submit' content='Save'/>
            </Form>
        </Segment>
    )
}