import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSongDetailsThunk } from '../../redux/songs'
import { RootState } from '../../redux/store'
import SongDetailsCard from './SongDetailsCard'

function SongDetails() {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const song = useSelector((state: RootState) => state.songs.currentSong)


    useEffect(() => {
        if (songId) {
            const getSongDetails = async () => {
                await dispatch(getSongDetailsThunk(parseInt(songId)))
                setIsLoaded(true)
            }
            getSongDetails();
        }
    }, [dispatch, songId])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <div className="song-details-container">
            <SongDetailsCard song={song} />
        </div>
    )
}

export default SongDetails