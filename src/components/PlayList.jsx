import React , {useEffect} from 'react'
import {useStateProvider} from '../utils/StateProvider'
import axios from "axios";
import { reducerCases } from '../utils/Contants';
import styled from './StyledPlaylist.module.scss'
import clsx from 'clsx';


export default function PlayList() {
    const [{ token,playlist }, dispatch] = useStateProvider();
    useEffect(() => {
      const getPlayListData = async () => {
        if (token) {
          try {
            const url = 'https://api.spotify.com/v1/me/playlists';
            const response = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            const item = response.data.items;
            console.log(response);
            const playlist = item.map(({name , id,images}) => {
              return {name,id,imageUrl: images[0].url};
            });
            console.log(playlist)
            dispatch({type: reducerCases.SET_PLAYLIST,playlist})
          } catch (error) {
            console.error('Error fetching playlist data:', error.response || error.message);
          }
        }

      };
      getPlayListData();
    },[token, dispatch])
  return (
    <div className={clsx(styled.container)}>
      <ul>
        {
          playlist.map(({name, id,imageUrl}) =>{
            return (
              <div className={clsx(styled.body_playlist)}>
                {imageUrl && <img src={imageUrl} alt={name} />} 
                <li key={id}>{name}</li>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}
