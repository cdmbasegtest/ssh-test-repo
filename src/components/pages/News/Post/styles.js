import styled from 'styled-components'

export const Content = styled.div`
  width: 578px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
  flex-grow: 0;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  margin: 15px 0;
`

export const ControlButtons = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
`

export const PostText = styled.div`
  width: 480px;
  font-family: Lato;
  font-size: 15px;
  text-align: left;
  color: #565656;
  align-self: center;
  padding-bottom: 23px;
`

export const Picture = styled.img`
  width: 542px;
  align-self: center;
  height: 343px;
`

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: -50px;
`

export const UserName = styled.div`
  font-family: Prompt;
  font-size: 16px;
  color: #565656;
`

export const CreatedAt = styled.div`
  font-family: Prompt;
  font-size: 12px;
  color: #565656;
`

export const ToggleComments = styled.button`
  outline: none;
  cursor: pointer;
  border-radius: 100px;
  background-color: #f4f4f4;
  font-family: Lato;
  font-size: 14px;
  border: none;
  width: 220px;
  height: 26px;
  align-self: center;
  color: #565656;
  margin-top: 14px;
`

export const Border = styled.div`
  border-bottom: 1px dashed #c1c1c1;
  width: 542px;
`
