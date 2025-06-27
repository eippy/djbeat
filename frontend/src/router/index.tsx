import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import SongList from '../components/SongList/SongList';
import SongDetails from '../components/SongDetail';
import SongForm from '../components/SongForm/SongForm';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SongList/>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "songs/:songId",
        element: <SongDetails />
      },
      {
        path: "songs/new",
        element: <SongForm />
      },
    
    ],
  },
]);
