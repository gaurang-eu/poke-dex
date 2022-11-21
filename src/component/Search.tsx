import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'

function Search (props: { searchPokemon: () => void, setSearchWord: (value: string) => void }) {
  return (
        <Col xxs={12} xs={12} md={6} lg={4} xl={4} xxl={4}>
            <Row className='mb-4'>
                <Col xs={9} className="d-flex justify-content-center">
                    <Form.Control type="text" placeholder="Pokemon Name" onChange={e => props.setSearchWord(e.target.value.toLowerCase().trim())} />
                </Col>
                <Col xs={3} className="d-flex justify-content-center">
                    <Button onClick={props.searchPokemon}>Search</Button>
                </Col>
            </Row>
        </Col>
  )
}

export default Search
