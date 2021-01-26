import { Redirect, Route } from 'react-router'
import { IAppRouteProps } from './PublicRoute'

export const PrivateRoute: React.FC<IAppRouteProps> = (props) => {
   return (
      <>{props.isLogged ? <Route {...props} path={props.path} component={props.component} /> : <Redirect to={'/'} />}</>
   )
}
