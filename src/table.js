
import { useState,useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
const Table = () => {

         
    return (
      <div className="table">
        <Editor
          initialValue={"A"}
        />
      </div>
    );
}
 
export default Table;