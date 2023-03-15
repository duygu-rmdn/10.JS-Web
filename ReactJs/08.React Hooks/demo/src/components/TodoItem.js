import ListGroup from 'react-bootstrap/ListGroup';  

export const TodoItem = ({
    text
}) => {
    return (
        <ListGroup.Item action >
            {text}
        </ListGroup.Item>
    );
};