import Viewer, { Worker } from "@phuocng/react-pdf-viewer";

export default function PDFViewer({fileUrl}) {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
      <div style={{height: `100vh`}}>
        <Viewer fileUrl={fileUrl}></Viewer>
        </div>
    </Worker>
  );
}
