import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { ImCross } from "react-icons/im";

// Set the workerSrc to the provided CDN
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const PDFViewer = ({ pdfUrl, setShowDoc }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);     

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber(pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1);

  return (
    <div className='pdf-viewer'>
      <div className="relative wrapper h-[60vh] scrollbar overflow-y-auto">
        <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            <Page pageNumber={pageNumber} />
        </Document>

        <div onClick={() => setShowDoc(false)} className="absolute right-0 top-0 bg-blue-500 text-white text-[1.05rem] p-[.6rem] rounded-bl-[50%] cursor-pointer">
            <ImCross />
        </div>
      </div>
      <nav className='flex items-center justify-between text-white text-[.9rem] px-[1.2rem] py-[.1rem]'>
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          Prev
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          Next
        </button>
      </nav>
    </div>
  );
};

export default PDFViewer;
