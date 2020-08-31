import { readRemoteFile } from "react-papaparse";
import { useState, useEffect, useRef } from "react";
import {Spreadsheet} from "dhx-spreadsheet";

export default function CSVViewer({ fileUrl }) {
  const element = useRef(null);
  const [data, setData] = useState([]);
 
  useEffect(() => {
    readRemoteFile(fileUrl, {
      complete: setData,
    });
  }, [fileUrl]);

  useEffect(() => {
    const s = new Spreadsheet(element.current, {

    })
    return () => s.destructor()
  }, [data])

  return <div ref={element} className="widget-box" style={{height: `100vh`}}></div>
}
