import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
`

export const Title = styled.Text`
font-size: 20px;
font-weight: bold;
color: #ffffff;
background-color: #000000;
width: 100%;
height: 70px;
text-transform: uppercase;
text-align: center;
padding-top: 20px;
`
export const BoxItem = styled.FlatList`
width: 100%;
`