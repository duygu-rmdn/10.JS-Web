import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from '../hooks/useForm';

export const AddTodoModal = ({
    show,
    onTodoAddClose,
    onTodoAddSubmit,
}) => {
    const {formValues, onChangeHandler, onSubmit} = useForm({
        text: '',
        isCompleted: false
    }, onTodoAddSubmit);

    return (

        <Modal show={show}>
            <Modal.Header closeButton onHide={onTodoAddClose}>
                <Modal.Title>Add todo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Task:</Form.Label>
                        <Form.Control type="text" name="text" placeholder="Enter todo" value={formValues.text} onChange={onChangeHandler}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={onTodoAddClose}>Close</Button>
                </Form>
            </Modal.Body>
        </Modal>

    );
};