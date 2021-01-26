import { Redirect, Route, RouteProps } from 'react-router'

export interface IAppRouteProps extends RouteProps {
   isLogged: boolean
   path: string
   component: React.FC
}

export const PublicRoute: React.FC<IAppRouteProps> = (props) => {
   return (
      <>
         {props.isLogged ? (
            <Redirect to={'/learn'} />
         ) : (
            <Route {...props} path={props.path} component={props.component} />
         )}
      </>
   )
}
