import React, { useEffect, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import Button from '../ktnButton';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  onError: (fileRejections: FileRejection[]) => void;
  allowedTypes: { [mimeType: string]: string[] };
  maxFileSize: number;
  initialFiles?: FileType[];
  maxFiles?: number;
  name: string;
  label?: string;
  [key: string]: any;
}
interface FileType {
  name: string;
  file: File;
}
const FileUpload: React.FC<FileUploadProps> = React.forwardRef(
  (
    {
      onUpload,
      onError,
      allowedTypes,
      maxFileSize,
      initialFiles,
      maxFiles = 1, // Default value is 1 file
      name,
      label,
      ...otherProps
    },
    ref: any
  ) => {
    const [previews, setPreviews] = useState<any>();
    const [Files, setFiles] = useState<FileType[]>(initialFiles || []);

    const privewItem = (file: any) => {
      return (
        <div
          key={file.name}
          style={{
            position: 'relative',
            padding: '10px',
            paddingRight: '38px',
          }}
        >
          <Button
            onClick={() => handleDelete(file)}
            icon="pi pi-times"
            className="p-button-rounded p-button-danger p-button-text"
            style={{ position: 'absolute', top: 0, right: 0 }}
          />
          <p>{file.name}</p>
          {file.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ maxWidth: '50px', maxHeight: '50px' }}
            />
          ) : (
            <p>File type: {file.type}</p>
          )}
        </div>
      );
    };
    useEffect(() => {
      if (Files) {
        const previewElements = Files.map((file) => privewItem(file.file));
        setPreviews(previewElements);
        onUpload(Files.map((file) => file.file));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Files]);

    const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        onError(fileRejections);
      } else {
        const previewElements = acceptedFiles.map((file) => privewItem(file));
        setPreviews((prevPreviews: any) => [
          ...prevPreviews,
          ...previewElements,
        ]);
        setFiles((prevFiles: any) => [
          ...prevFiles,
          ...acceptedFiles.map((file) => {
            return { name: file.name, file: file };
          }),
        ]);
      }
    };

    const handleDelete = (fileToDelete: File) => {
      setPreviews((prevPreviews: any) =>
        prevPreviews.filter((preview: any) => preview.key !== fileToDelete.name)
      );
      setFiles((prevFiles: any) =>
        prevFiles.filter((file: any) => file.file.name !== fileToDelete.name)
      );
    };

    const acceptedMimeTypes = allowedTypes;

    const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone(
      {
        onDrop,
        accept: acceptedMimeTypes,
        maxFiles: maxFiles,
        maxSize: maxFileSize,
      }
    );
    return (
      <div className={otherProps.parentClasses}>
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'active' : ''}`}
        >
          <input {...getInputProps()} ref={inputRef} />
          <p>
            {label ? label : 'Drag &amp; drop files here, or click to select'}
          </p>
        </div>
        <div className="previews flex">{previews}</div>
        {otherProps.error && (
          <small id={otherProps.id} className="p-error">
            {otherProps.error.message}
          </small>
        )}
      </div>
    );
  }
);
export default FileUpload;
