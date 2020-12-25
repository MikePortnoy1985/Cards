import React from 'react'
import { ErrorMessage, Field, Form } from 'formik'
import s from './LoginPage.module.scss'

type PropsType = {
   error: string
   isSubmitting: boolean
}

const LoginPage: React.FC<PropsType> = ({ error, isSubmitting }) => {
   return (
      <div className={s.login_wrapper}>
         <h2 className={s.title}>Sign up</h2>
         <Form className={s.form_wrap}>
            <label htmlFor='email'>Email</label>
            <Field className={s.field} id='email' name='email' type='email' />
            <ErrorMessage component='span' name='email' />
            <label htmlFor='password'>Password</label>
            <Field className={s.field} id='password' name='password' type='password' />
            <ErrorMessage component='span' name='password' />
            <button type='submit' disabled={isSubmitting}>
               Submit
            </button>
            {error && <span>{error}</span>}
         </Form>
      </div>
   )
}

export default React.memo(LoginPage, (prevProps, nextProps) => {
   return prevProps.isSubmitting === nextProps.isSubmitting && nextProps.error === prevProps.error
})
