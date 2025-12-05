import { IFileAfterUpload } from "@/types/globalType";
import fileObjectToLink from "@/utils/fileObjectToLink";
import { FileText } from "lucide-react"; // better pdf icon
import React from "react";

export default function PdfListShow({ files }: { files: IFileAfterUpload[] }) {
  // Only PDF files allowed
  const pdfFiles = files?.filter(
    (f) => f?.mimetype === "application/pdf" || f?.filename?.endsWith(".pdf")
  );

  // Pretty filename reducer
  const prettyName = (name?: string) => {
    if (!name) return "Unknown File";
    if (name.length <= 30) return name;
    return name.slice(0, 25) + "..." + name.slice(-7);
  };

  return (
    <div className="flex flex-col gap-2 max-w-sm">
      {pdfFiles?.length > 0 ? (
        pdfFiles.map((file: IFileAfterUpload, index: number) => (
          <a
            key={index}
            href={fileObjectToLink(file)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1 border rounded hover:bg-gray-50 transition text-xs"
          >
            {/* PDF Icon */}
            <FileText className="h-4 w-4 text-red-600" />

            {/* Filename */}
            <span className="truncate max-w-[200px]">
              {prettyName(file.filename)}
            </span>
          </a>
        ))
      ) : (
        <span className="text-gray-500 text-xs">No PDF files available</span>
      )}
    </div>
  );
}
