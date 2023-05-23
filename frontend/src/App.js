import Layout from "./components/UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import Posts from "./containers/Posts/Posts";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewPost from "./containers/NewPost/NewPost";
import SinglePost from "./containers/SinglePost/SinglePost";

function App() {
  return (
      <Layout>
          <Switch>
              <Route path="/" exact component={Posts}/>
              <Route path="/posts/new" component={NewPost}/>
              <Route path="/post/:id" component={SinglePost}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
          </Switch>
      </Layout>
  );
}

export default App;