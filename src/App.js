import ReactHtmlParser from "react-html-parser";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Hola from "./ll";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build";
import Sign from "./sign";
import SC from './ck'
function App() {
const [name,setName]=useState("")
  return (
    <div className="all">
 
        <Router>
          <Switch>
            <Route path='/ck'>
              <SC name={name}/>
            </Route>
            <Route path="/sign">
              <Sign setName={setName} />
            </Route>
<Route path="Hola">
  <Hola />
</Route>


            
          </Switch>
        </Router>
    
    </div>
  );
}

export default App;
