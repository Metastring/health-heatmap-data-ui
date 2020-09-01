import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Box, Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/core";
import PDFViewer from "../components/PDFViewer";
const CSVViewer  = dynamic(
  () => import("../components/CSVViewer"),
  {ssr: false}
)

const getpdfurlfrombase = (base, number) => `/api/file?name=${encodeURIComponent(base)}${number}.pdf`;
const getcsvurlfrombase = (base, number) => `/api/file?name=${encodeURIComponent(base)}${number}.csv`;

export default function SynchronousViewer({}) {
  const [pdfbaseurl, setpdfbaseurl] = useState("src/github/Metastring/data-wrangling-scripts/idsp/data/2018/");
  const [csvbaseurl, setcsvbaseurl] = useState("src/github/Metastring/data-wrangling-scripts/idsp/data/2018/clean/");
  const [filenumber, setfilenumber] = useState(1);
  const [pdfurl, setpdfurl] = useState(
    getpdfurlfrombase(pdfbaseurl, filenumber)
  );
  const [csvurl, setcsvurl] = useState(
    getcsvurlfrombase(csvbaseurl, filenumber)
  );
  const handlecsvchange = (e) => {
    setcsvbaseurl(e.target.value);
  };
  const handlepdfchange = (e) => {
    setpdfbaseurl(e.target.value);
  };
  useEffect(() => {
    setpdfurl(getpdfurlfrombase(pdfbaseurl, filenumber));
  }, [pdfbaseurl, filenumber]);
  useEffect(() => {
    setcsvurl(getcsvurlfrombase(csvbaseurl, filenumber));
  }, [csvbaseurl, filenumber]);

  return (
    <>
      <Head>
        <title>Health Heatmap Data Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex direction="row">
          <Flex flex="1">
            <input value={pdfbaseurl} onChange={handlepdfchange}></input>
          </Flex>
          <Flex flex="1">
            <label htmlFor="filenumber">File number: </label>
            <NumberInput value={filenumber} onChange={setfilenumber}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Flex flex="1">
            <input value={csvbaseurl} onChange={handlecsvchange}></input>
          </Flex>
        </Flex>
        <Flex direction="row" wrap="wrap">
          <Flex flex="1 0 300px" direction="column">
            {pdfurl}
            <PDFViewer fileUrl={pdfurl} />
          </Flex>
          <Flex flex="1 0 300px" direction="column">
            {csvurl}
            <CSVViewer fileUrl={csvurl} />
          </Flex>
        </Flex>
      </main>
    </>
  );
}
