import React from 'react'
import { Formik } from 'formik'
import Yup from 'yup'

import pick from 'lodash/pick'

import {
  Container,
  Header,
  Title,
  Content,
  Row,
  Textarea,
  Input,
  PhoneInput,
  SubmitInput,
  Select,
  Label
} from './styles'

const withFormik = Formik({
  validateOnChange: true,
  mapPropsToValues: ({ company = {} }) =>
    pick(company, [
      'name',
      'city',
      'email',
      'phone',
      'address',
      'website',
      'description',
      'business-area'
    ]),

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    city: Yup.string().required(),
    email: Yup.string().email(),
    phone: Yup.string().required(),
    address: Yup.string().required(),
    website: Yup.string(),
    description: Yup.string(),
    'business-area': Yup.string().required()
  }),

  handleSubmit(values, { props, resetForm }) {
    props.onIntroSubmit(values)
    resetForm()
  }
})

const Intro = ({ values, handleSubmit, setFieldValue }) =>
  <Container>
    <Header align="center" justify="center">
      <Title>Create profile</Title>
    </Header>

    <Content>
      <form onSubmit={handleSubmit}>
        <Row>
          <Label>Company name</Label>
          <Input
            name="name"
            placeholder="Company name"
            value={values.name}
            onChange={setFieldValue}
          />
        </Row>
        <br />
        <Row>
          <Label>Company sector</Label>
          <Select
            items={[
              {
                text: 'Food & Drink',
                value: 'food-and-drink'
              },
              {
                text: 'Retail',
                value: 'retail'
              },
              {
                text: 'Service',
                value: 'service'
              },
              {
                text: 'Manufacturing',
                value: 'manufacturing'
              },
              {
                text: 'Distribution',
                value: 'distribution'
              },
              {
                text: 'Other',
                value: 'other'
              }
            ]}
            name="business-area"
            placeholder="Company sector"
            value={values['business-area']}
            onChange={setFieldValue}
          />
        </Row>
        <br />
        <Row>
          <Label>Company Street Address</Label>
          <Input
            name="address"
            placeholder="Company Street Address"
            value={values.address}
            onChange={setFieldValue}
          />
        </Row>
        <br />
        <Row>
          <Label>Company city</Label>
          <Input
            name="city"
            placeholder="Company city"
            value={values.city}
            onChange={setFieldValue}
          />
        </Row>
        <br />
        <Row>
          <Label>Company email (non required)</Label>
          <Input
            name="email"
            placeholder="Company email (non required)"
            value={values.email}
            onChange={setFieldValue}
          />
        </Row>
        <br />
        <Row>
          <Label>Company Phone Number</Label>
          <PhoneInput
            name="phone"
            placeholder="Company Phone Number"
            value={values.phone}
            onChange={setFieldValue}
          />
        </Row>
        <br />
        <Row>
          <Label>Company Website (non required)</Label>
          <Input
            name="website"
            placeholder="Company Website (non required)"
            value={values.website}
            onChange={setFieldValue}
          />
        </Row>
        <br />
        <Row>
          <Label>Short descrition of your company (non required)</Label>
          <Textarea
            name="description"
            placeholder="Desciption of your company"
            value={values.description}
            onChange={setFieldValue}
          />
        </Row>
        <br />
        <Row>
          <SubmitInput type="submit" value="NEXT STEP" />
        </Row>
      </form>
    </Content>
  </Container>

export default withFormik(Intro)
