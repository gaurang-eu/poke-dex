import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Spinner from 'react-bootstrap/Spinner'

import Button from 'react-bootstrap/Button'

function LoadMore (props: { loadMorePokemon: () => void, showLoadMoreButton: boolean }) {
  // let LoadMoreLayout = <Row className='mt-2 mb-2'>
  //       <Col className='d-flex justify-content-center'>
  //           <Spinner variant='success' />
  //       </Col>
  //   </Row>
  let LoadMoreLayout = null
  if (props.showLoadMoreButton) {
    LoadMoreLayout = <Row className='mt-2 mb-2'>
            <Col className='d-flex justify-content-center'>
                <Button variant="primary" onClick={props.loadMorePokemon}>Load more Pokemon</Button>
            </Col>
        </Row>
  }
  return (
        <>
            {LoadMoreLayout}
        </>
  )
}

export default LoadMore
