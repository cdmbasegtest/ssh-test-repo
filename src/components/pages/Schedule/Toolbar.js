import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'rebass'
import { ButtonCircle, Select } from 'components/ui'

class Toolbar extends PureComponent {
  state = {
    selectedOption: 'profile.first-name'
  }

  onSelectSorting = value => {
    this.setState({ selectedOption: value })
    this.props.onSortingChange(value)
  }

  render() {
    const { editMode } = this.props
    const { toggleEdit, onPublish } = this.props
    const options = [
      { value: 'profile.first-name', text: 'By name' },
      { value: 'profile.last-name', text: 'By last name' },
      { value: 'job.name', text: 'By role' }
    ]
    return (
      <Flex
        align="center"
        className={this.props.className}
        justify="space-between"
      >
        <Box>
          <Select
            items={options}
            value={this.state.selectedOption}
            onChange={this.onSelectSorting}
          />
        </Box>
        <Box>
          {!editMode &&
            <ButtonCircle onClick={toggleEdit}>Edit/Create</ButtonCircle>}
          {editMode &&
            <div>
              <ButtonCircle onClick={toggleEdit}>Exit editing</ButtonCircle>
              <ButtonCircle onClick={onPublish}>Publish</ButtonCircle>
            </div>}
        </Box>
      </Flex>
    )
  }
}
export default styled(Toolbar)`
    width: 100%;
    min-height: 59px;
    background-color: #fff;
    border-bottom: solid 3px #aca2a2;
`
