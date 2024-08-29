import React, { useState } from 'react'
import EmailForm from '@/widget/email-form/ui/email-form'
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField
} from '@mui/material'
import emailjs from '@emailjs/browser'
import { format } from 'date-fns'

export const MainPage = () => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [formData, setFormData] = useState({})
  const [emailError, setEmailError] = useState('')

  const handleSubmit = (values: React.SetStateAction<object>) => {
    setFormData(values)
    setOpen(true)
  }

  const handleSend = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }

    const serviceID = 'service_eczg6o8'
    const templateID = 'template_0f32ae7'
    const userID = 'pH-18pidAvRxCBP3o'

    const currentDateTime = format(new Date(), 'dd/MM/yyyy HH:mm')
    const dataToSend = {
      ...formData,
      to_email: email,
      send_time: currentDateTime
    }

    emailjs
      .send(serviceID, templateID, dataToSend, userID)
      .then(response => {
        console.log('SUCCESS!', response.status, response.text)
      })
      .catch(error => {
        console.log('FAILED...', error)
      })

    setOpen(false) // Закрытие модального окна после отправки
    setEmailError('') // Очистка ошибки после успешной отправки
  }

  const handleClose = () => {
    setOpen(false)
    setEmailError('') // Очистка ошибки при закрытии модального окна
  }

  return (
    <Container>
      <EmailForm onSubmit={handleSubmit} />

      {/* Модальное окно для ввода email */}
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Send Form Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the email address to which you would like to send the form data.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            color="primary"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
