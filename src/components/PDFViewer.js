"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function LazyPage({ pageNumber, width }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "200px", threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: 16, minHeight: 800 }}>
      {isVisible ? (
        <Page
          pageNumber={pageNumber}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      ) : (
        <div>Loading page {pageNumber}...</div>
      )}
    </div>
  );
}

export default function PDFViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const containerRef = useRef();
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    handleResize(); // initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: "100%",
        width: "100%",
        height: "80vh", // fixed height for internal scrolling
        margin: "auto",
        padding: "1rem",
        overflowY: "auto", // enable scroll inside this container
        border: "1px solid #ccc",
        boxSizing: "border-box",
      }}
    >
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages &&
          Array.from(new Array(numPages), (_, index) => (
            <LazyPage
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={containerWidth}
            />
          ))}
      </Document>
    </div>
  );
}
