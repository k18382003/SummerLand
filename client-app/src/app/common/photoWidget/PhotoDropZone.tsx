import  { useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';


interface Props {
    setFile : (File:any) => void;
}

export default function PhotoDropZone({ setFile } : Props) {

    const dzStyle = {
        border : "2px dashed #eeee",
        boderColor : "#eeee",
        borderRadius : "5px",
        paddingTop: "30px",
        textAlign: "center" as "center",
    }

    const dzActive = {
        borderColor : "green"
    }


    const onDrop = useCallback((acceptedFiles : any) => {
        if (acceptedFiles) {
            setFile(acceptedFiles.map((file:any) => Object.assign(file, {
                preview : URL.createObjectURL(file)
            })))
        }
        console.log(acceptedFiles);
    }, [setFile])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? {...dzStyle, ...dzActive} : dzStyle}>
            <input {...getInputProps()} />
            <Icon name="upload" size="huge" />
            <Header content="Drop image here" />
        </div>
    )
}