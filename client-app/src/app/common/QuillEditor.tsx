import { useField } from "formik";
import ReactQuill from "react-quill";

interface props {
  value: string,
  name: string,
  onChange: (value: string) => void
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color', 'background'
]


export default function QuillEditor({ value, onChange, name }: props) {
  const [, , helper] = useField(name);
  return (
    <div className="quill_editor"
      onBlur={() => helper.setTouched(true)}>
      <ReactQuill
        onChange={onChange}
        value={value}
        theme="snow"
        modules={modules}
        formats={formats}
        preserveWhitespace={true} />
    </div>
  );
}
