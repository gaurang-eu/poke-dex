import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'

function Loader()  {
  return (
    <Row className='m-2'>
        <Col className="d-flex justify-content-center">
            <Spinner style={{ width: "5rem", height: "5rem" }} animation="border" variant="warning" />
        </Col>
    </Row>
  );
}

export default Loader;