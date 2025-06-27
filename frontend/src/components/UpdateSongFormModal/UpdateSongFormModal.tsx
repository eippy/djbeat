import React, { useState, useEffect } from "react"
import { Navigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { updateSongThunk, getSongDetailsThunk } from "../../redux/songs";
import { RootState } from "../../redux/store";
import "../SongForm/SongForm.css"
import { useModal } from "../../context/Modal";

interface ISongErrors {
  title?: string;
  description?: string;
  previewImage?: string;
  message?: string;
}

interface UpdateSongFormModalProps {
  songId: number;
}
function UpdateSongFormModal({ songId }: UpdateSongFormModalProps) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState<ISongErrors>({});
    const [isLoaded, setIsLoaded] = useState(false);

    const currentSong = useSelector((state: RootState) => state.songs.currentSong);
    const user = useSelector((state: RootState) => state.session.user)

    useEffect(() => {
        if (songId) {
            const loadSong = async () => {
                await dispatch(getSongDetailsThunk(songId))
                setIsLoaded(true);
            }
            loadSong();
        }
    }, [dispatch, songId])

    useEffect(() => {
        if (currentSong) {
            setTitle(currentSong.title)
            setDescription(currentSong.description)
            setPreviewImage(currentSong.previewImage)
        }
    }, [currentSong])

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
        }
    
        setErrors(newErrors);
      }, [title, description, previewImage]);
    
    
    
      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          
          if (!songId) return;
    
          const songData = {
            title: title,
            description: description,
            previewImage: previewImage,
          };
    
        try {
          const res = await dispatch(updateSongThunk(songId, songData));
          if (!res.errors) {
              closeModal();
          } else {
            setErrors(res.errors);
          }
        } catch (error) {
          setErrors({ message: "Failed to update song" });
        }
      };
    
    if (!isLoaded) {
        return <div>loading...</div>
    }
    if (!user) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <>
      <h1>Edit Song</h1>

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
            {errors.title && (<span className="song-form-error">{errors.title}</span>)}
          </div>
        </div>

        <div className="form-section">
          <h2>Describe your song</h2>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Please write at least 10 characters"
            maxLength={500}
            rows={4}
          />
          {errors.description && <span className="song-form-error">{errors.description}</span>}
        </div>

        <div className="form-section">
          <h2>Add a image</h2>
          <div className="form-group">
            <input
              type="text"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              placeholder="Preview Image URL"
              required
            />
            {errors.previewImage && (<span className="song-form-error">{errors.previewImage}</span>)}
          </div>
        </div>

        {errors.message && <span className="song-form-error">{errors.message}</span>}

        <div className="form-actions">
          <button type="submit" className="song-form-button"> Update Song </button>
          <button 
            type="button" 
            onClick={closeModal}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
    
}

export default UpdateSongFormModal;