import Head from "next/head";
import * as api from "../utils/api";
import Link from "next/link";
import DataFileFieldsViewer from "../components/DataFileFieldsViewer";
import { Box, Collapse, Button } from "@chakra-ui/core";

const DataFileListItem = ({ name }) => {
  return (
    <div>
      {name} -{" "}
      <Link href={{ pathname: "/datafiles", query: { name } }}>
        <a>View Values</a>
      </Link>
    </div>
  );
};

export default function DataFiles({ data, fileData, fileName }) {
  const [showList, setShowList] = React.useState(true);
  const handleToggle = () => setShowList(!showList);
  return (
    <div>
      <Head>
        <title>Data files</title>
      </Head>
      <main style={{ display: "flex", flexDirection: "row" }}>
        <Collapse isOpen={showList}>
          <Box p={4} border={`1px solid black`}>
            {data.map((name) => (
              <DataFileListItem name={name} />
            ))}
          </Box>
        </Collapse>
        <Box p={4} border={`1px solid black`}>
          <Button onClick={handleToggle}>Toggle fileList</Button>
          <Box>
            {fileName}
            {fileData == null ? null : (
              <DataFileFieldsViewer fields={fileData.fields} />
            )}
          </Box>
        </Box>
      </main>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { name } = query;
  const res = await api.getDatafiles();
  const data = await res.json();

  const fileRes = name === undefined ? undefined : await api.getDatafile(name);
  const fileData = fileRes === undefined ? null : await fileRes.json();

  return { props: { data, fileData, fileName: name || null } };
}
