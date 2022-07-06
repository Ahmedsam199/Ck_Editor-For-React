import { Ref,useRef,useState } from "react";
const Sign = ({setName}) => {
    const val1=useRef()
    const Add=()=>{
          let data=val1.current.value
            setName(data)
console.log(data);
      }
    return (  <div className="s">
      Enter Name  <input ref={val1} type="text" name="" id="" />
      <button onClick={Add}>Set The Name</button>
    </div> );
}
 
export default Sign;