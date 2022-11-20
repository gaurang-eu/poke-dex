import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

function AlertMessage (props: { message: string }) {
  return (
        <Row>
            <Col>
                <Alert key="danger" variant='danger'>{props.message} </Alert>
            </Col>
        </Row>
  )
}

export default AlertMessage
