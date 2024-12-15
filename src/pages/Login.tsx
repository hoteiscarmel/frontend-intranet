import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, UserState } from '../store/slices/authSlice'
import { LoginContainer, UiButton, UiForm, UiInputWrapper, UiInputLabel, UiInputIconWrapper, UiInputErrorText, UiInputContainer, UiInputField, UiTitle, UiSubtitle } from '../styles/Root'
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi'
import { validateEmail } from '../utils/regex'
import { api } from '../services/api'
import { FaMailBulk } from 'react-icons/fa'
import { jwtDecode } from 'jwt-decode'
import { errorMessage } from '../store/slices/errorSlice'
import { message } from 'antd'
import { RootState } from '../store'
import { useNavigate } from 'react-router-dom'
import { setInitialChat } from '../store/slices/chatSlice'

interface IInputType {
  mail: 'mail'
  password: 'password'
}

interface IInputProps {
  isInvalid: boolean
  isFocus: boolean
  value: string
  message: string
}

const Login: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [mail, setMail] = useState<IInputProps>({
    isInvalid: false,
    isFocus: false,
    value: '',
    message: ''
  })
  const [pass, setPass] = useState<IInputProps>({
    isInvalid: false,
    isFocus: false,
    value: '',
    message: ''
  })
  const onHandleChange = (event: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>, inputType: keyof IInputType) => {
    const inputValue = event.target.value
    if (!inputValue || inputValue.length < 1 && inputType === 'mail') {
      setMail({ ...mail, message: 'Esse campo é obrigatório! Por favor, preencha esse campo!', isInvalid: true, isFocus: true, value: inputValue })
    }
    if (!inputValue || inputValue.length < 1 && inputType === 'password') {
      setPass({ ...pass, message: 'Esse campo é obrigatório! Por favor, preencha esse campo!', isInvalid: true, isFocus: true, value: inputValue })
    }
    if (inputType === 'password') {
      if (inputValue.length < 6) {
        setPass({ ...pass, message: 'A senha é muito curta', isInvalid: true, value: inputValue })
      } else if (inputValue.length > 11) {
        setPass({ ...pass, message: 'A senha é muito longa', isInvalid: true, value: inputValue })
      } else if (!/[a-z]/.test(inputValue) || !/[A-Z]/.test(inputValue) || !/[0-9]/.test(inputValue)) {
        setPass({ ...pass, message: 'A senha deve conter letras maiúsculas, minúsculas e números ou caracteres especiais', isInvalid: true, isFocus: true, value: inputValue })
      } else {
        setPass({ ...pass, message: '', isInvalid: false, isFocus: false, value: inputValue })
      }
    }
    if (inputType === 'mail') {
      if (!validateEmail(inputValue)) {
        setMail({ ...mail, message: 'E-mail inválido! Por favor, forneça um e-mail válido!', isInvalid: true, isFocus: true, value: inputValue })
      } else {
        setMail({ ...mail, message: '', isInvalid: false, isFocus: false, value: inputValue })
      }
    }
  }
  const onValidateFields = async () => {
    if (mail.value.length < 1 && pass.value.length < 1) {
      setMail({ ...mail, message: 'Esse campo é obrigatório! Por favor, preencha esse campo!', isInvalid: true, isFocus: true })
      setPass({ ...pass, message: 'Esse campo é obrigatório! Por favor, preencha esse campo!', isInvalid: true, isFocus: true })
    } else {
      setMail({ ...mail, message: '', isInvalid: false, isFocus: false })
      setPass({ ...pass, message: '', isInvalid: false, isFocus: false })
      onLogon()
    }
  }
  const onLogon = async () => {
    try {
      const request = await api.post('/api/users-signin', { mail: mail.value, password: pass.value })
      const token = request.data.token
      const decodeToken: UserState = jwtDecode(token)
      dispatch(login({ user: decodeToken, userJWT: token }))
      dispatch(setInitialChat())
      navigate('/chat')
    } catch (error: any) {
      const errorText = error.response.data.message || error.response.data.error
      dispatch(errorMessage(errorText))
      setTimeout(() => {
        message.error(errorText)
      }, 1500)
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat')
    }
  }, [])
  return (<LoginContainer>
    <UiForm>
      <UiTitle>Intranet Carmel Hotéis</UiTitle>
      <UiSubtitle>Bem-vindo! Informe seu login e senha abaixo para acessar a plataforma.</UiSubtitle>
      <UiInputWrapper>
        <UiInputLabel
          isFocus={mail.isFocus}
          isInvalid={mail.isInvalid}
        >E-mail</UiInputLabel>
        <UiInputContainer>
          { mail.isInvalid && (<UiInputIconWrapper position={'prefix'}>
            <FiAlertCircle color={mail.isInvalid ? (mail.isFocus ? 'orange' : '#d9534f') : '#27272a'} />
          </UiInputIconWrapper>) }
            <UiInputField
              isInvalid={mail.isInvalid}
              isFocus={mail.isFocus}
              hasPrefixIcon={mail.isInvalid}
              hasSuffixIcon
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setMail({ ...mail, value: e.target.value });
                onHandleChange(e, 'mail')
              }}
              onBlur={(e: FocusEvent<HTMLInputElement>) => {
                setMail({ ...mail, value: e.target.value});
                onHandleChange(e, 'mail')
              }}
              onFocus={() => {
                setMail({ ...mail, isFocus: true })
              }}
            />
          <UiInputIconWrapper position="suffix">
            <FaMailBulk color={mail.isInvalid ? (mail.isFocus ? 'orange' : '#d9534f') : '#27272a'} />
          </UiInputIconWrapper>
        </UiInputContainer>
        {mail.message && mail.isInvalid && (<UiInputErrorText isFocus={mail.isFocus}>{mail.message}</UiInputErrorText>)}
      </UiInputWrapper>
      <UiInputWrapper>
        <UiInputLabel
          isFocus={pass.isFocus}
          isInvalid={pass.isInvalid}
        >Senha</UiInputLabel>
        <UiInputContainer>
          { pass.isInvalid && (<UiInputIconWrapper position={'prefix'}>
            <FiAlertCircle color={pass.isInvalid ? (pass.isFocus ? 'orange' : '#d9534f') : '#27272a'} /></UiInputIconWrapper>)}
            <UiInputField
              isInvalid={pass.isInvalid}
              isFocus={pass.isFocus}
              hasPrefixIcon={pass.isInvalid}
              hasSuffixIcon
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPass({ ...pass, value: e.target.value })
                onHandleChange(e, 'password')
              }}
              onBlur={(e: FocusEvent<HTMLInputElement>) => {
                setPass({ ...pass, value: e.target.value })
                onHandleChange(e, 'password')
              }}
              onFocus={() => {
                setPass({ ...pass, isFocus: true })
              }}
              type={isPasswordVisible ? 'text' : 'password'}
            />
          { isPasswordVisible ? (
            <UiInputIconWrapper position="suffix" onClick={() => setIsPasswordVisible(false)}>
              <FiEye color={pass.isInvalid ? (pass.isFocus ? 'orange' : '#d9534f') : '#27272a'} />
            </UiInputIconWrapper>
          ) : (
            <UiInputIconWrapper position="suffix" onClick={() => setIsPasswordVisible(true)}>
              <FiEyeOff color={pass.isInvalid ? (pass.isFocus ? 'orange' : '#d9534f') : '#27272a'} />
            </UiInputIconWrapper>
          )}
        </UiInputContainer>
        {pass.message && pass.isInvalid && (<UiInputErrorText isFocus={pass.isFocus}>{pass.message}</UiInputErrorText>)}
      </UiInputWrapper>
      <UiButton onClick={onValidateFields}>Entrar</UiButton>
    </UiForm>
  </LoginContainer>)
}

export default Login