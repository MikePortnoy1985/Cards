import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { LearnPageContainer } from '../02-features/01-learning/LearnPageContainer'
import { LoginPageContainer } from '../02-features/02-login/LoginPageContainer'

export const App: React.FC = () => {
   return (
      <Switch>
         <Route exact path={'/'} render={() => <LoginPageContainer />} />
         <Route path={'/learn'} render={() => <LearnPageContainer />} />
      </Switch>
   )
}
