
import { ISong } from "../../../redux/types/songs";
import './SongDetailsCard.css';

interface SongDetailsCardProp {
    song: ISong | null;   
}


function SongDetailsCard({ song }: SongDetailsCardProp) {
    

    if (!song) {
        return <div>Song not found</div>
    }

    const formattedDate = (dateString: string | undefined ) => {
        if (!dateString) {
            return 'date not available'
        }
        const date = new Date(dateString);
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${year}`;
    }

    return (
      <div className="song-details-container">
        <div className="song-image">
          <img src={song.previewImage} alt={song.title} />
        </div>
        <div className="song-details-info">
          <h1 className="song-title">{song.title}</h1>
          <p className="song-artist">By: {song.User?.username}</p>
          <div className="song-player">
            <audio controls>
              <source src={song.filepath} type="audio/mpeg" />
            </audio>
          </div>
          <div className="song-details">
            <p>Uploaded: {formattedDate(song.createdAt)}</p>
          </div>
          <div className="song-description">
            <h3>Description</h3>
            <p>{song.description}</p>
          </div>
        </div>
      </div>
    );
}






















export default SongDetailsCard;