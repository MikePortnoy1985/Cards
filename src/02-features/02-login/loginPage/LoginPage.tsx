import React from 'react'
import { ErrorMessage, Field, Form } from 'formik'
import s from './LoginPage.module.scss'

type PropsType = {
   error: string
   isSubmitting: boolean
   isValid: boolean
}

const RawLoginPage: React.FC<PropsType> = ({ error, isSubmitting, isValid }) => {
   return (
      <div className={s.login_wrapper}>
         <h2 className={s.title}>Sign up</h2>
         <Form className={s.form_wrap}>
            <label htmlFor='email'>Email</label>
            <Field className={s.field} id='email' name='email' type='email' />
            <label htmlFor='password'>Password</label>
            <Field className={s.field} id='password' name='password' type='password' />
            <button type='submit' disabled={isSubmitting || !isValid}>
               Submit
            </button>
         </Form>
         {<ErrorMessage component='span' name='email' /> || <ErrorMessage component='span' name='password' />}
         {error && <span>{error}</span>}
      </div>
   )
}

export const LoginPage = React.memo(RawLoginPage, (prevProps, nextProps) => {
   return (
      prevProps.isSubmitting === nextProps.isSubmitting &&
      nextProps.error === prevProps.error &&
      prevProps.isValid === nextProps.isValid
   )
})
