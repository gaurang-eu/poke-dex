import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import FormSelect from 'react-bootstrap/FormSelect'
import { SORT_BY_FIELDS, SORT_BY_LABEL } from '../util/constants'

function PokemonSort (props: { sortPokemonByField: (field: string) => void }) {
  return (
        <Col xxs={12} xs={12} md={6} lg={4} xl={4} xxl={4} className='mt-2'>
            <Row className='p-1 d-flex align-items-center'>
                <Col xs={6} className="d-flex justify-content-end">
                    <Form.Label htmlFor='select-sort-field'>{SORT_BY_LABEL}</Form.Label>
                </Col>
                <Col xs={6} className="d-flex justify-content-center">
                    <FormSelect id="select-sort-field" title="Select Pokemon Type" onChange={e => props.sortPokemonByField(e.target.value)}>
                        <option key={0} value='0'>Select None</option>
                        {
                          SORT_BY_FIELDS.map((type, index) => <option key={index} value={type.id}>{type.name}</option>)
                        }
                    </FormSelect>
                </Col>
            </Row>
        </Col>
  )
}

export default PokemonSort
