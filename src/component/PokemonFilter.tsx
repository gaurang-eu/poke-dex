import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import FormSelect from 'react-bootstrap/FormSelect'
import { POKEMON_TYPES } from '../util/constants'

function PokemonFilter (props: { filterPokemonByType: (selectedType: string) => void }) {
  return (
        <Col xxs={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
            <Row>
                <Col className="d-flex justify-content-end">
                    {/* <Form.Control type="text" placeholder="Enter Pokemon Name" onChange={} /> */}
                    <Form.Label>Filter by Pokemon Type</Form.Label>
                </Col>
                <Col className="d-flex justify-content-end">
                    <FormSelect id="dropdown-basic-button" title="Select Pokemon Type" onChange={e => props.filterPokemonByType(e.target.value)}>
                        <option key={0} value='0'>Select None</option>
                        {
                          POKEMON_TYPES.map((type, index) => <option key={index} value={type.id}>{type.name}</option>)
                        }
                    </FormSelect>
                </Col>
            </Row>
        </Col>
  )
}

export default PokemonFilter
