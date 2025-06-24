import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongsThunk } from "../../redux/songs";
import { RootState } from "../../redux/store";
import { ISong } from "../../redux/types/songs";
import SongCard from "./SongCard";

function SongList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const songs = useSelector((state: RootState) => state.songs.allSongs);

  useEffect(() => {
    const getSongs = async () => {
      await dispatch(getAllSongsThunk());
      setIsLoaded(true);
    };

    if (!isLoaded) {
      getSongs();
    }
  }, [isLoaded, dispatch]);

  const goToSongDetail = (e: React.MouseEvent, song: ISong) => {
    e.preventDefault();
    navigate(`/songs/${song.id}`);
    
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <div className="card-list-container">
        {songs.map((song, idx) => (
          <div
            className="card-container"
            key={`${idx}-${song.id}`}
            onClick={(e) => goToSongDetail(e, song)}
          >
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongList;
