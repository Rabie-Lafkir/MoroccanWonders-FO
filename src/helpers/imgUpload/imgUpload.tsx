import React, { useState } from "react";
import axios from "axios";
import './imgUpload.css'

interface ImgUploadProps {
  onImageUpload: (fileKey: string) => void;
}

const ImgUpload: React.FC<ImgUploadProps> = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_URL}/storage/save_file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileKey } = response.data;
      onImageUpload(fileKey);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  return (
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload">
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" />
        ) : (
          <div className="placeholder">Upload an image</div>
        )}
      </div>
      <input id="photo-upload" type="file" onChange={handleImageChange} />
    </label>
  );
};

export default ImgUpload;
