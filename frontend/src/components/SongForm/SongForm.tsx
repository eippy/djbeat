import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSongThunk, getAllSongsThunk } from "../../redux/songs";
import "./SongForm.css";

interface ISongErrors {
  title?: string;
  description?: string;
  previewImage?: string;
  songUrl?: string;
  message?: string;
}

function SongForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState<ISongErrors>({});

  useEffect(() => {
    const newErrors: ISongErrors = {};

    if (!title) {
      newErrors.title = "Song title is required";
    } else if (title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!description) {
      newErrors.description = "Description is required";
    } else if (description.length < 10) {
      newErrors.description = "Description needs 10 or more characters";
    } else if (description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (!previewImage) {
      newErrors.previewImage = "Preview image is required";
    } else if (!isUrl(previewImage)) {
      newErrors.previewImage = "Please enter a valid URL";
    }

    if (!songUrl) {
      newErrors.songUrl = "Song URL is required";
    } else if (!isUrl(songUrl)) {
      newErrors.songUrl = "Please enter a valid URL";
    }
  

    setErrors(newErrors);
  }, [title, description, previewImage, songUrl]);

  const isUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      const songData = {
          title,
          description,
          previewImage,
          songUrl
    }

    try {
      const res = await dispatch(createSongThunk(songData));
        if (!res.error) {
          await dispatch(getAllSongsThunk());
          navigate(`/songs/${res.id}`);
        } else {
          setErrors({ message: "Failed to create song" });
        }
    } catch (error) {
      setErrors({ message: "Failed to create song" });
    }
  };

  return (
    <div className="create-song-container">
      <h1>Upload a Song</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-group">
            <label>Song Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter song title"
              required
            />
            {errors.title && (
              <span className="song-form-error">{errors.title}</span>
            )}
          </div>
        </div>

        <div className="form-section">
          <h2>Describe your song</h2>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 10 characters"
            maxLength={500}
            rows={4}
          />
          {errors.description && (
            <span className="song-form-error">{errors.description}</span>
          )}
        </div>
        <div className="form-section">
          <h2>Add a image</h2>
          <div className="form-group">
            <input
              type="text"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              placeholder="Image Url"
              required
            />
            {errors.previewImage && (
              <span className="song-form-error">{errors.previewImage}</span>
            )}
          </div>
        </div>
        <div className="form-section">
          <h2>Upload your song file</h2>
          <div className="form-group">
            <input
              type="url"
              value={songUrl}
              onChange={(e) => setSongUrl(e.target.value)}
              placeholder="https://example.com/song.mp3"
              required
            />
            {errors.songUrl && (
              <span className="song-form-error">{errors.songUrl}</span>
            )}
          </div>
        </div>
        <button type="submit" className="song-form-button">
          Upload Song
        </button>
      </form>
    </div>
  );
}

export default SongForm;