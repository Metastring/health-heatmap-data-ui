import { readRemoteFile, jsonToCSV } from "react-papaparse";
import { useState, useEffect, useRef } from "react";
import { Spreadsheet } from "dhx-spreadsheet";
import A1 from "@flighter/a1-notation";

import { getRowAsArray } from "../utils/listandmap";

const getA1Notation = ({ row, col }) => `${A1.toCol(col + 1)}${row + 1}`;
const A1ToRowCol = (reference) => ({
  row: A1.getRow(reference),
  col: A1.getCol(reference),
});

const max = (a, b) => (a > b ? a : b);

export default function CSVViewer({ fileUrl }) {
  const element = useRef(null);
  const [data, setData] = useState([{ cell: "A1", value: "Loading" }]);

  const parseDataToDHXStyle = ({ data }) =>
    data
      .map((row, rowindex) =>
        row.map((cellValue, colindex) => ({
          cell: getA1Notation({ row: rowindex, col: colindex }),
          value: cellValue,
        }))
      )
      .flat();

  const reverseDHXStyleToArrayOfArrays = (arrayOfCellValuePairs) => {
    const dereferenced = arrayOfCellValuePairs.map(({ cell, value }) => {
      return {
        ...A1ToRowCol(cell),
        value,
      };
    });
    const { maxRow, maxCol } = dereferenced.reduce(
      ({ maxRow, maxCol }, cell) => ({
        maxRow: max(maxRow, cell.row),
        maxCol: max(maxCol, cell.col),
      }),
      { maxRow: 0, maxCol: 0 }
    );
    const mapped = arrayOfCellValuePairs.reduce((mapagg, cvp) => {
        mapagg.set(cvp.cell, cvp.value)
        return mapagg;
    }, new Map());
    const result = [];
    [...Array(maxRow).keys()].forEach(row => {
      const thisRow = [];
      [...Array(maxCol).keys()].forEach(col => {
          const value = mapped.get(getA1Notation({row, col})) || "";
          thisRow.push(value)
      })
      result.push(thisRow);
    })
    return result;
  };

  const parseDataAndSave = (data) => setData(parseDataToDHXStyle(data));

  useEffect(() => {
    readRemoteFile(fileUrl, {
      complete: parseDataAndSave,
    });
  }, [fileUrl]);

  const saveDataOnServer = (data) => {
    const converted = reverseDHXStyleToArrayOfArrays(data);
    const csv = jsonToCSV(converted, { quotes: true, newline: "\n" }) + "\n";
    fetch(fileUrl, {
      method: "POST",
      body: csv,
    });
  };

  useEffect(() => {
    const s = new Spreadsheet(element.current, {
      autoFormat: false,
      toolbarBlocks: ["undo", "rows", "columns", "file"],
    });
    s.parse(data);
    s.toolbar.data.add(
      {
        type: "button",
        id: "save-to-server",
        tooltip: "save file on server",
        icon: "dxi-vault",
      },
      -1
    );
    const saveHandler = (id) => {
      if (id === "save-to-server") {
        saveDataOnServer(s.serialize());
      }
    };
    s.toolbar.events.on("click", saveHandler);
    return () => {
      s.destructor();
    };
  }, [data]);

  return (
    <div ref={element} className="widget-box" style={{ height: `100vh` }}></div>
  );
}
