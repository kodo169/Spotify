import React , {useEffect} from 'react'
import {useStateProvider} from '../utils/StateProvider'
import styled from './StyledCurrentTrack.module.scss'
import { reducerCases } from '../utils/Contants';
import axios from 'axios';
import clsx from 'clsx';

export default function CurrentTracks() {
  const [{ token,currentPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      if (token) {
        try {
          const url = 'https://api.spotify.com/v1/me/player/currently-playing';

          const response = await axios.get(url, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          if(response.data !== ""){
            const {item} = response.data;
            const currentPlaying = {
                id : item.id,
                name : item.name,
                arrtists : item.artists.map((artist) =>artist.name),
                image : item.album.images[2].url,
            }
            dispatch({type: reducerCases.SET_CURRENT_SONG,currentPlaying})
          }
          
          }catch (error) {
          console.error('Error fetching playlist data:', error.response || error.message);
        }
      }
    };
    getCurrentTrack();
  },[token, dispatch])
  
  
  return (
    <div>
      {
        currentPlaying && (
          <div className= {clsx(styled.track)}>
            <div className= {clsx(styled.track__image)}>
              <img src={currentPlaying.image} alt="currentPlaying" />
            </div>
            <div className= {clsx(styled.track__infor)}>
              <h4>{currentPlaying.name}</h4>
              <h6>{currentPlaying.arrtists.join(", ")}</h6>
            </div>
          </div>
        )
      }
    </div>
  )
}
