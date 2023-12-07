import { ModalContainer, ModalContent } from "./styles"

type ModalProps = {
    handleShowModal: (title: string, description: string) => void,
    handleCloseModal: () => void,
    title: string
    description: string
}

const Modal = ({ title, description, handleCloseModal }: ModalProps) => {

    return (
        <ModalContainer>
        <ModalContent>
            <div className="header">
                <span onClick={handleCloseModal}>X</span>
            </div>
            <h4>{title}</h4>
            <p>{description}</p>
        </ModalContent>
        </ModalContainer>
    ) 
}

export default Modal;