import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export function ImageUpload({ onUpload }: { onUpload: (file: File) => void }) {
  const [preview, setPreview] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxSize: 5242880,
    onDrop: ([file]) => {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="Preview" className="max-w-full h-auto" />
      ) : (
        <p className="text-center text-gray-500">
          Drag & drop an image here, or click to select one
        </p>
      )}
    </div>
  );
}