import React from "react";
import { ISong } from "../../../redux/types/songs";
import './SongCard.css';

interface SongCardProp {
    song: ISong
}

function SongCard({ song }: SongCardProp ) {
    return (
        <div className="song-card">
            <div className="song-image-container">
                <img
                    src={song.previewImage}
                    alt={song.title}
                    className="song-preview-image"
                />
            </div>
            <div className="song-information">
                <h2 className="song-title"> {song.title}</h2>
                <p className="song-artist">By: {song.User?.username}</p>
                <p className="song-duration">Duration: {song.duration}s</p>
                <div className="song-audio">
                    <audio controls>
                        <source src={song.filepath} type="audio/mpeg" />
                    </audio>
                </div>
            </div>
        </div>
    )
}

export default SongCard;