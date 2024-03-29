import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import FormSelect from 'react-bootstrap/FormSelect'
import { FILTER_LABEL, POKEMON_TYPES } from '../util/constants'

function PokemonFilter (props: { filterPokemonByType: (selectedType: string) => void }) {
  return (
        <Col xxs={12} xs={12} md={6} lg={4} xl={4} xxl={4} className='mt-2'>
            <Row className='p-1 d-flex align-items-center'>
                <Col xs={6} className="d-flex justify-content-end">
                    <Form.Label htmlFor='select-pokemon-type'>{FILTER_LABEL}</Form.Label>
                </Col>
                <Col xs={6} className="d-flex justify-content-center">
                    <FormSelect id="select-pokemon-type" title="Select Pokemon Type" onChange={e => props.filterPokemonByType(e.target.value)}>
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
