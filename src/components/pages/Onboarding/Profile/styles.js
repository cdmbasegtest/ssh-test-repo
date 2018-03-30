import styled from 'styled-components'
import { Flex, Text } from 'rebass'

import colors from 'constants/colors'

export const Container = styled.div`
  flex: 1;
  background-color: ${colors.WHITE};
`

export const Header = Flex.extend`height: 87px;`

export const Title = Text.extend`
  font-size: 26px;
  color: #7c7c7c;
`

export const Content = styled.div`
  height: 867px;
  background-color: #eeeeee;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Card = styled.div`
  background-color: ${colors.WHITE};
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.45);
  width: 498px;
  height: 704px;
`

export const CardTextStyle = {
  flex: 1,
  alignItems: 'center'
}

export const HR = styled.div`
  width: 498px;
  height: 2px;
  border: solid 1px #979797;
  margin-bottom: 27px;
`

export const DashedHR = styled.hr`
  width: 465.4px;
  height: 2px;
  border: none;
  border-top: 2px dashed #979797;
  color: #fff;
  background-color: #fff;
  margin-top: 28px;
  margin-bottom: 23px;
`

export const CompanyName = styled.div`
  font-family: Prompt;
  font-size: 20px;
  text-align: center;
  color: #575757;
  margin-top: 27px;
  margin-bottom: 18px;
`

export const CompanyDescription = styled.div`
  font-family: Lato;
  font-size: 16px;
  text-align: left;
  color: #575757;
`

export const ParagraphText = styled.div`
  font-family: Lato;
  font-size: 15px;
  text-align: left;
  color: #575757;
  margin-left: 15px;
`

export const ParagraphName = styled.div`
  font-family: Lato;
  font-size: 15px;
  font-weight: bold;
  text-align: right;
  color: #575757;
`

export const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`
export const InfoBlock = styled.div`width: 426.3px;`

export const SaveButtonRow = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`

export const SaveButtonText = styled.div`
  font-family: Prompt;
  font-size: 16px;
  text-align: center;
  color: #565656;
  margin-left: 58px;
`

export const AddButtonRow = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
`

export const CompanyPhotoCard = styled.div`
  width: 498px;
  height: 311px;
  border-top-right-radius: 6px;
  border-top-lefr-radius: 6px;
  border-bottom: solid 1px #979797;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`

export const NoPhotosImage = styled.div`
  width: 360px;
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DeletePhotoBtn = styled.div`
  position: absolute;
  border-radius: 100px;
  background-color: #ffffff;
  top: 5px;
  right: 5px;
  width: 34px;
  height: 34px;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
`
