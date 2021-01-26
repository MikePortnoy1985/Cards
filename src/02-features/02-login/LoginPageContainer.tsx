import { Formik } from 'formik'
import { LoginPage } from './loginPage/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { appUserAuth } from './loginPageSlice'
import { AppType } from '../../04-store/store'

type ValuesErrors = {
   email: string
   password: string
   error: string
}

export const LoginPageContainer: React.FC = () => {
   const dispatch = useDispatch()
   const { error } = useSelector<AppType, { error: string }>((state) => state.loginPage)

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
                  errors.email = 'Email is required'
               } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  errors.email = 'Invalid email address'
               }
               if (!values.password) {
                  errors.password = 'Password is required'
               }
               return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
               dispatch(appUserAuth({ email: values.email, password: values.password }))
               setSubmitting(false)
            }}>
            {({ isSubmitting, isValid }) => <LoginPage error={error} isSubmitting={isSubmitting} isValid={isValid} />}
         </Formik>
      </>
   )
}
