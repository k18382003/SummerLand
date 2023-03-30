import { DeltaStatic, Sources } from "quill";
import ReactQuill from "react-quill";

interface props{
  value: string;
  onChange : (value: string) => void 
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]


export default function QuillEditor({value, onChange} : props){
  return (
    <div className="quill_editor">
      <ReactQuill onChange={onChange} theme="snow" modules={modules} formats={formats} value={value} preserveWhitespace={true}/> 
    </div>
  );
}
  