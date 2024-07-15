import React , {useEffect} from 'react'
import {useStateProvider} from '../utils/StateProvider'
import { reducerCases } from '../utils/Contants';
import styled from './StyledPlaylist.module.scss'
import clsx from 'clsx';


export default function PlayList() {
    const [{ token,playlist }, dispatch] = useStateProvider();
    const handeClick = (selectionPlaylistID) => {
      console.log(selectionPlaylistID)
      dispatch({type: reducerCases.SET_SELECTION_PLAYLIST_ID,selectionPlaylistID})
      console.log('ID sau khi click'+ selectionPlaylistID)
    }
    useEffect(() => {
      const getPlayListData = async () => {
        if (token) {
          try {
            const url = 'https://api.spotify.com/v1/me/playlists';

            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            const item = data.items;
            const playlist = item.map(({name , id,images}) => {
              return {name,id,imageUrl: images[0].url};
            });
            
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
              <div onClick={()=> handeClick(id)}  key={id} className={clsx(styled.body_playlist)}>
                {imageUrl && <img src={imageUrl} alt={name} />} 
                <li>{name}</li>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}
