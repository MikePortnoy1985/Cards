import { Formik } from 'formik'
import React from 'react'
import LoginPage from './loginPage/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { appUserAuth } from './loginPageSlice'
import { AppType } from '../../04-store/store'
import { Redirect } from 'react-router-dom'

type ValuesErrors = {
   email: string
   password: string
   error: string
}

export const LoginPageContainer: React.FC = () => {
   const dispatch = useDispatch()
   const error = useSelector<AppType, string>((state) => state.loginPage.error)
   const isLogged = useSelector<AppType, boolean>((state) => state.loginPage.isLogged)

   if (isLogged) {
      return <Redirect to={'/learn'} />
   }

   return (
      <>
         <Formik
            initialValues={{
               email: '',
               password: '',
            }}
            validate={(values) => {
               const errors = {} as ValuesErrors
               if (!values.email) {
                  errors.email = 'Required'
               } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  errors.email = 'Invalid email address'
               }
               if (!values.password) {
                  errors.password = 'Required'
               }
               return errors
            }}
            onSubmit={async (values, { setSubmitting }) => {
               await dispatch(appUserAuth({ email: values.email, password: values.password }))
               setSubmitting(false)
            }}>
            {({ isSubmitting }) => <LoginPage error={error} isSubmitting={isSubmitting} />}
         </Formik>
      </>
   )
}
