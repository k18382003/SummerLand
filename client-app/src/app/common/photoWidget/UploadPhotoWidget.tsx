import { useEffect, useState } from 'react';
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoDropZone from "./PhotoDropZone";
import PhotoCropper from './PhotoCropper';

interface Props {
    handleUpload: (file:Blob) => void;
    uploading: boolean;
}


export default function UploadPhotoWidget({ handleUpload , uploading}: Props) {
    const [file, setFile] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    const onCropper = () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blog) => 
                handleUpload(blog!)
            )
        }
    }

    // Clean up the data in the memory
    useEffect (() => {
        return () => {
            file.forEach((f : any) => URL.revokeObjectURL(f.preview));
        }
    }, [file])

    return (
        <Grid stackable>
            <Grid.Column width={4}>
                <Header sub color="grey" content="Step 1 - Upload Photo" />
                <PhotoDropZone setFile={setFile} />
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={4}>
                <Header sub color="grey" content="Step 2 - Resize Photo" />
                {file && file.length > 0 &&
                    <PhotoCropper setCroper={setCropper} FileUrl={file[0].preview} />
                }
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={4}>
                <Header sub color="grey" content="Step 3 - Preview & Upload" />
                {
                    cropper &&
                    <>
                        <div className='image-preview' style={{ width: '100%', height: 200, overflow: "hidden", marginBottom: '2px'}}></div>
                        <Button.Group widths={2}>
                            <Button loading={uploading} onClick={onCropper} basic positive icon='check'/>
                            <Button onClick={() => {setFile([]); setCropper(undefined)}} basic color='red' icon='cancel' />
                        </Button.Group>
                    </>
                }
            </Grid.Column>
        </Grid>
    )
}