import { Button, Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ModalContainer(){
    const {modalstore} = useStore();

    return (
        <>
            <Modal open={modalstore.open} onClose={modalstore.closeModal} 
            size={modalstore.size}>
                <Modal.Content>
                    <Modal.Description>{modalstore.content}</Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                {modalstore.closeBtn &&
                    <Button color='black' onClick={modalstore.closeModal}>
                        Close
                    </Button>
                }
                </Modal.Actions>
            </Modal>
        </>
    )
})