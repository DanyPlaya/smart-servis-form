/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'

// Определяем типы для значений формы
interface FormValues {
  firstName: string
  bio?: string
  country: string
  city: string
  address: string
}

// Определяем типы для ошибок валидации
interface FormErrors {
  firstName?: string
  bio?: string
  country?: string
  city?: string
  address?: string
}

// Валидация полей
const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {}

  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.country) {
    errors.country = 'Required'
  }
  if (!values.city) {
    errors.city = 'Required'
  }
  if (!values.address) {
    errors.address = 'Required'
  }

  return errors
}

// Типизация компонента для рендеринга TextField с использованием MUI
interface RenderTextFieldProps {
  input: any
  label: string
  meta: {
    touched: boolean
    error: string
  }
  custom?: any
}

const renderTextField: React.FC<RenderTextFieldProps> = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    label={label}
    error={touched && !!error}
    helperText={touched && error}
    fullWidth
    {...input}
    {...custom}
  />
)

interface EmailFormProps extends InjectedFormProps<FormValues> {}

const EmailForm: React.FC<EmailFormProps> = ({ handleSubmit }) => {
  return (
    <Box sx={{ p: 3, maxWidth: '600px', margin: 'auto' }}>
      <Typography
        variant="h6"
        gutterBottom
      >
        Change your private information
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        gutterBottom
      >
        Please read our <Link href="https://www.google.com">terms of use</Link> to be informed how we manage your
        private data.
      </Typography>
      <hr />
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <Box sx={{ mb: 2 }}>
              <label>Enter your first name</label>
              <Field
                name="firstName"
                component={renderTextField}
                label="First name"
                required
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Box sx={{ mb: 2 }}>
              <label>Bio</label>
              <Field
                name="bio"
                component={renderTextField}
                label="Bio"
                multiline
                rows={4}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
          >
            <Box sx={{ mb: 2 }}>
              <label>Country</label>
              <Field
                name="country"
                component={renderTextField}
                label="Country"
                required
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Box sx={{ mb: 2 }}>
              <label>City</label>
              <Field
                name="city"
                component={renderTextField}
                label="City"
                required
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Box sx={{ mb: 2 }}>
              <label>Address</label>
              <Field
                name="address"
                component={renderTextField}
                label="Address"
                required
              />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">
            You may also consider to update your <Link href="https://www.google.com">billing information</Link>.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default reduxForm<FormValues>({
  form: 'emailForm',
  validate
})(EmailForm)
