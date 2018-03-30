import styled from 'styled-components'
import { Flex } from 'rebass'

export const Editor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 17px;
  padding: 18px 15px;
  width: 578px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  flex: 1 0 auto;
`

export const TextInput = styled.textarea`
  height: 68px;
  width: 376px;
  opacity: 0.63;
  border: solid 1px #979797;
  font-family: Lato;
  font-size: 15px;
  resize: none;
  color: #484848;
`

export const AddPhoto = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 21px;
  align-items: center;
`

export const AddPhotoText = styled.div`
  opacity: 0.8;
  font-family: Lato;
  font-size: 12px;
  color: #575757;
  white-space: nowrap;
  margin-top: 8px;
`

export const PicturesContainer = Flex.extend`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

export const PicturePreview = styled.img`
  position: relative;
  flex: 1;
  width: 542px;
  height: 343px;
`

const Button = styled.button`
  outline: none;
  cursor: pointer;
  position: relative;
  border: none;
  width: 240px;
  height: 34px;
  font-family: Lato;
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  border-radius: 100px;
`

export const PostButton = Button.extend`
  background-color: #429d8a;
  margin: 15px 0;
`

export const AnnounceButton = Button.extend`background-color: #e7aa2e;`

export const PostButtonIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 6px;
`

export const PushText = styled.div`
  font-family: Lato;
  font-size: 13px;
  text-align: left;
  color: #a4a2a2;
  padding-right: 15px;
`
