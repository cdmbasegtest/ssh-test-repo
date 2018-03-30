import styled from 'styled-components'

export const Comment = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 82px;
  margin-bottom: 30px;
`

export const CommentText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Lato;
  font-size: 14px;
  color: #565656;
`

export const AuthorName = styled.div`
  font-family: Lato;
  font-size: 14px;
  font-weight: bold;
  color: #565656;
`

export const ControlButtons = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
`

export const PostedAt = styled.div`
  font-family: Lato;
  font-size: 12px;
  font-style: italic;
  color: #565656;
`
