import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'

function Search (props: { searchPokemon: () => void, setSearchWord: (value: string) => void }) {
  return (
        <Col>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Form.Control type="text" placeholder="Enter Pokemon Name" onChange={e => props.setSearchWord(e.target.value.toLowerCase().trim())} />
                </Col>
                <Col className="d-flex justify-content-start">
                    <Button onClick={props.searchPokemon}>Search</Button>
                </Col>
            </Row>
        </Col>
  )
}

export default Search
