"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "../app/page.module.css";

const PDFViewer = dynamic(() => import("../components/PDFViewer"), {
  ssr: false,
});

export default function Home() {
  const pdfFiles = [
    { label: "التنمية والتخطيط الاقتصادي", path: "/sample1.pdf" },
    { label: "قواعد الفقه المالي ومققاصده", path: "/sample2.pdf" },
    { label: "الأسواق المالية", path: "/sample3.pdf" },
    { label: "اقتصاديات الوقف والعمل الخيري", path: "" },
    { label: "مناهج البحث الاقتصادي", path: "" },
    { label: " تمويل ومصارف إسلامية", path: "" },
  ];

  const [selectedPdf, setSelectedPdf] = useState(pdfFiles[0].path);

  return (
    <main className={styles.container}>
      <nav className={styles.navLinks}>
        {pdfFiles.map(({ label, path }) => (
          <a
            key={path}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSelectedPdf(path);
            }}
            className={styles.link}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className={styles.pdfContainer}>
        <PDFViewer file={selectedPdf} />
      </div>
    </main>
  );
}
