import React from 'react'
import styled from 'styled-components'
import Form from '../Form/Form';

const CardWrapper = styled.div`
    background-color:#fff;
    box-shadow: 0px 4px 12px 0px #0000001A;
    border-radius: 12px;
    width:100%;
    max-width:400px;
    height: auto;
    padding:36px 32px;
`;

function Card() {
  return (
    <CardWrapper>
        <Form />
    </CardWrapper>
  )
}

export default Card