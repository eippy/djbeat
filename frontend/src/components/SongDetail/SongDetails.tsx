import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSongDetailsThunk } from '../../redux/songs'
import { RootState } from '../../redux/store'
import SongDetailsCard from './SongDetailsCard'
import OpenModalButton from '../OpenModalButton'
import UpdateSongFormModal from '../UpdateSongFormModal'
import DeleteSongModal from '../DeleteSongModal'
import CommentList from '../CommentList'
import './SongDetails.css'

function SongDetails() {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const song = useSelector((state: RootState) => state.songs.currentSong)
    const user = useSelector((state: RootState) => state.session.user)

    
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
            {user && song && user.id === song.User?.id && (
                <div className='modal-song-btns'>
                <OpenModalButton
                    buttonText="Edit Song"
                    modalComponent={<UpdateSongFormModal songId={song.id}/>}
                />
                <OpenModalButton
                    buttonText="Delete Song"
                    modalComponent={<DeleteSongModal songId={song.id}/>}
                    />
                    </div>
            )}
            <CommentList songId={song?.id}/>
            </div>
    )
}

export default SongDetails