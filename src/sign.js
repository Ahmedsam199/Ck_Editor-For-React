import { Ref,useRef,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

const Sign = ({setName}) => {
  const dispatch=useDispatch()
    const val1=useRef()
    const Add=()=>{
      const newData = token2.Data.replace(">@Name<",">"+val1.current.value+"<");
      
console.log(newData)
      }
        const token2 = useSelector((state) => state);

    return (
      <div className="s">
        Enter Name <input ref={val1} type="text" name="" id="" />
        <button onClick={Add}>Set The Name</button>
        <Link to="/ck">GO to CK Page</Link>
        
        {token2.Data}
      </div>
    );
}
 
export default Sign;