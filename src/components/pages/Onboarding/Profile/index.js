import React, { PureComponent } from 'react'

import get from 'lodash/get'

import { ButtonCircle as UiButtonCircle } from 'components/ui'

// import MdDeleteForever from 'react-icons/lib/md/delete-forever'
import MdAddAPhoto from 'react-icons/lib/md/add-a-photo'

import {
  Container,
  Header,
  Title,
  Content,
  Card,
  DashedHR,
  CompanyName,
  ParagraphText,
  ParagraphName,
  Row,
  InfoBlock,
  CompanyDescription,
  CardTextStyle,
  SaveButtonRow,
  AddButtonRow,
  CompanyPhotoCard,
  NoPhotosImage,
  SaveButtonText
  // DeletePhotoBtn
} from './styles'
import { Flex } from 'rebass'

const SaveButtonCircle = UiButtonCircle.extend`
  width: 286px;
  height: 54px;
  border-radius: 100px;
  background-color: #4ab597;
  font-family: Lato;
  font-size: 18px;
  color: #ffffff;
`

const AddButtonCircle = UiButtonCircle.extend`
  width: 310px;
  height: 38px;
  border-radius: 100px;
  background-color: #ffffff;
  border: solid 2px #979797;
  display: flex;
  align-items: center;
`

class Profile extends PureComponent {
  render() {
    const { company, onProfileSubmit } = this.props

    return (
      <Container>
        <Header align="center" justify="center">
          <Title>Profile</Title>
        </Header>
        <Content>
          <Card>
            <Flex direction="column" style={CardTextStyle}>
              <CompanyPhotoCard>
                {/* <DeletePhotoBtn>
                  <MdDeleteForever color="#000000" size={24} />
                </DeletePhotoBtn> */}
                <NoPhotosImage>
                  <AddButtonRow>
                    <AddButtonCircle>
                      <MdAddAPhoto size={20} style="opacity: 0.45" />
                      <SaveButtonText>ADD YOUR PHOTO</SaveButtonText>
                    </AddButtonCircle>
                  </AddButtonRow>
                </NoPhotosImage>
              </CompanyPhotoCard>
              <CompanyName>
                {get(company, 'name')}
              </CompanyName>
              <InfoBlock>
                <CompanyDescription>
                  {get(company, 'description')}
                </CompanyDescription>
              </InfoBlock>
              <DashedHR />
              <InfoBlock>
                <Row>
                  <ParagraphName>Phone:</ParagraphName>
                  <ParagraphText>
                    {get(company, 'phone')}
                  </ParagraphText>
                </Row>
                <Row>
                  <ParagraphName>E-mail:</ParagraphName>
                  <ParagraphText>
                    {get(company, 'email')}
                  </ParagraphText>
                </Row>
                <Row>
                  <ParagraphName>Address:</ParagraphName>
                  <ParagraphText>
                    {get(company, 'address')}
                  </ParagraphText>
                </Row>
              </InfoBlock>
            </Flex>
            <SaveButtonRow>
              <SaveButtonCircle type="submit" onClick={onProfileSubmit}>
                CREATE PROFILE
              </SaveButtonCircle>
            </SaveButtonRow>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default Profile
