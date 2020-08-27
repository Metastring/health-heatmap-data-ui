import Head from "next/head";
import * as api from "../utils/api";
import Link from "next/link";

const DataFileListItem = ({ name }) => {
  return (
    <div>
      {name} -{" "}
      <Link href={{ pathname: "/datafiles", query: { name } }}>
        <a>Edit</a>
      </Link>
    </div>
  );
};

export default function DataFiles({ data, fileData, fileName }) {
  return (
    <div>
      <Head>
        <title>Data files</title>
      </Head>
      <main style={{ display: "flex", flexDirection: "row" }}>
        <div>
          {data.map((name) => (
            <DataFileListItem name={name} />
          ))}
        </div>
        <div>
            {fileName}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({query}) {
  const { name } = query;
  const res = await api.getDatafiles();
  const data = await res.json();

  const fileRes = name === undefined ? undefined : await api.getDatafile(name);
  const fileData = fileRes === undefined ? undefined : await fileRes.json();

  return { props: { data, fileData, fileName: name } };
}
