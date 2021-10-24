import { Switch, useHistory, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { SET_HISTORY } from "./redux/constants/CyberBugs/CyberBugsConstants";
import { CyberBugsTemplate } from './templates/CyberBugsTemplate/CyberBugsTemplate'
import IndexCyberBugs from "./pages/CyberBugs/IndexCyberBugs"
import CreateProjectCyberBugs from "./pages/CyberBugs/CreateProjectCyberBugs/CreateProjectCyberBugs"
import ProjectManagementCyberBugs from "./pages/CyberBugs/ProjectManagementCyberBugs/ProjectManagementCyberBugs";
import DrawerEditProject from "./HOC/CyberBugs/DrawerEditProject/DrawerEditProject";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Loading from "./components/Loading/Loading";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import { UserLoginTemplate } from "./templates/UserLoginTemplate/UserLoginTemplate";



function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: SET_HISTORY,
      history: history
    })
  }, [])

  return (
    <>
      <Loading />
      <DrawerEditProject />
      <Switch>
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <CyberBugsTemplate exact path="/" Component={ProjectManagementCyberBugs} />
        <CyberBugsTemplate exact path="/cyberbugs" Component={IndexCyberBugs} />
        <CyberBugsTemplate exact path="/projectdetail/:projectId" Component={IndexCyberBugs} />
        <CyberBugsTemplate exact path="/createprojectcyberbugs" Component={CreateProjectCyberBugs} />
        <CyberBugsTemplate exact path="/projectmanagementcyberbugs" Component={ProjectManagementCyberBugs} />
        <CyberBugsTemplate exact path="*" Component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
