import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSongThunk } from "../../redux/songs";
import { useModal } from "../../context/Modal";
import "./DeleteSongModal.css";

interface DeleteSongModalProps {
  songId: number;
}

const DeleteSongModal: React.FC<DeleteSongModalProps> = ({ songId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await dispatch(deleteSongThunk(songId));
      closeModal();
      navigate("/")
  };

  

  return (
    <div className="review-form-container">
        <h1 id="heading">Confirm Delete</h1>
        <div>Are you sure you want to delete this song?</div>
        <button onClick={handleDelete} className="delete-review-button">
            Yes
        </button>
        <button onClick={closeModal} className="keep-review-button">
            No
        </button>
    </div>
);
};
export default DeleteSongModal; 