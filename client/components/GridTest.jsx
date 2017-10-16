import React from 'react';
import { Flex, Box } from 'grid-styled';

import styled from 'styled-components';

const InnerBox = styled.div`
background:white;

 `;
const SBox = styled(Flex)`
background:red;
height:300px;
border:1px solid black;`;
const Smenu = styled(Flex)`

background:green;

border:1px solid black;
`;
const ContainerInner = styled(Flex)`
background:blue;
  `;
const Container = styled(Flex)`background:grey;
max-width: 1024px;

margin: 0 auto;`;

const Button = styled.button`

height: 40px;
line-height: 40px;
white-space: nowrap;
margin: 10px;
box-shadow: 0 2px 2px #dddddd;
display: inline-block;
background-color: #fff;
padding: 0 16px;

border-radius: 3px;
font-size: 15px;
text-align:left;
outline: 0;
-webkit-appearance: none;
    border: none;
&.selected{  border: none;background: #da943a;}
}
`;
const GridTest = React.createClass({

  componentDidMount() {

  },

  render() {
    return (


      <Container

        wrap
      >
        <SBox
          width={[

            1 / 7,
          ]}
          px={2}
        >
          <InnerBox>blaaaaaaaat</InnerBox>
        </SBox>
        <ContainerInner
          width={[

            6 / 7,
          ]}

          wrap
        >
          <SBox
            width={[
              1 / 2,
              1 / 3,
              1 / 4,
              1 / 6,
            ]}
            px={2}
          >
            <InnerBox>blaaaaaaaat</InnerBox>
          </SBox>
          <SBox
            width={[
              1 / 2,
              1 / 3,
              1 / 4,
              1 / 6,
            ]}
            px={2}
          >
            <InnerBox>blaaaaaaaat</InnerBox>
          </SBox>
          <SBox
            width={[
              1 / 2,
              1 / 3,
              1 / 4,
              1 / 6,
            ]}
            px={2}
          >
            <InnerBox>blaaaaaaaat</InnerBox>
          </SBox>
          <SBox
            width={[
              1 / 2,
              1 / 3,
              1 / 4,
              1 / 6,
            ]}
            px={2}
          >
            <InnerBox>blaaaaaaaat</InnerBox>
          </SBox>
          <SBox
            width={[
              1 / 2,
              1 / 3,
              1 / 4,
              1 / 6,
            ]}
            px={2}
          >
            <InnerBox>blaaaaaaaat</InnerBox>
          </SBox>
          <SBox
            width={[
              1 / 2,
              1 / 3,
              1 / 4,
              1 / 6,
            ]}
            px={2}
          >
            <InnerBox>blaaaaaaaat</InnerBox>
          </SBox>

        </ContainerInner>
      </Container>
    );
  },
});

export default GridTest;
