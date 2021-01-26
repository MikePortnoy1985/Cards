import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute } from '../06-utils/PublicRoute'
import { PrivateRoute } from '../06-utils/PrivateRoute'
import { useSelector, useDispatch } from 'react-redux'
import { LearnPageContainer } from '../02-features/01-learning/LearnPageContainer'
import { LoginPageContainer } from '../02-features/02-login/LoginPageContainer'
import { AppType } from '../04-store/store'
import { ReactComponent as Spinner } from '../05-assets/Spinner.svg'
import { authChecker } from '../06-utils/authChecker'

export const App: React.FC = () => {
   const { isLogged, loading } = useSelector((state: AppType) => state.loginPage)
   const dispatch = useDispatch()

   React.useEffect(() => {
      dispatch(authChecker())
   }, [dispatch])

   return (
      <div>
         {(!loading && (
            <Switch>
               <PrivateRoute path={'/learn'} isLogged={isLogged} component={LearnPageContainer} />
               <PublicRoute path={'/'} isLogged={isLogged} component={LoginPageContainer} />
            </Switch>
         )) || <Spinner />}
      </div>
   )
}
