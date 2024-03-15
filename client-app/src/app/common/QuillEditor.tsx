import { useField } from "formik";
import ReactQuill from "react-quill";
import Quill from 'quill';
import { ImageResize } from 'quill-image-resize-module-ts';

Quill.register('modules/imageResize', ImageResize);

interface props {
  name: string,
}

const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']]
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color', 'background', 'width'
]



export default function QuillEditor({ name }: props) {
  const [field, , helper] = useField(name);
  return (
    <div
      onBlur={() => helper.setTouched(true)}>
      <ReactQuill
        onChange={(value: any) => helper.setValue(value)}
        value={field.value}
        theme="snow"
        modules={modules}
        formats={formats}
        preserveWhitespace={true}
      />
    </div>
  );
}
