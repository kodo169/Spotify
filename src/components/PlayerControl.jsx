import React from 'react'
import styled from './StyledPlayerControl.module.scss'
import { BsFillPlayCircleFill,BsFillPauseCircleFill, BsShuffle  } from 'react-icons/bs'
import { CgPlayTrackNext,CgPlayTrackPrev } from 'react-icons/cg'
import { FiRepeat } from 'react-icons/fi'
import clsx from 'clsx'
import {useStateProvider} from '../utils/StateProvider'
import { reducerCases } from '../utils/Contants';
import axios from 'axios';


export default function PlayerControl() {
    const [{token, playerState}, dispatch] = useStateProvider();
    const changeTrack = async (type) =>{
        const urlPost = `https://api.spotify.com/v1/me/player/${type}`;

        await axios.post( urlPost,{},{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
              }
        });

        const urlGet = 'https://api.spotify.com/v1/me/player/currently-playing';
        const response = await axios.get(urlGet, {
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
        else{
            dispatch({type: reducerCases.SET_CURRENT_SONG,currentPlaying :null})
        }
    }

    const changeState = async() => {
        const state = playerState ? "pause" : "play";
        const urlGet = `https://api.spotify.com/v1/me/player/${state}`;
        await axios.put(urlGet, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        dispatch({type: reducerCases.SET_PLAYER_STATE,playerState: !playerState})
    }
    return (
    <div className={clsx(styled.container)}>
        <div className={clsx(styled.shuffle)}>
            <BsShuffle />
        </div>
        <div className={clsx(styled.TrackPrev)}>
            <CgPlayTrackPrev onClick={()=>changeTrack("previous")} />
        </div>
        <div className={clsx(styled.state)}>
            {playerState ? <BsFillPauseCircleFill onClick={changeState}/> : <BsFillPlayCircleFill onClick={changeState}/>}
        </div>
        <div className={clsx(styled.next)}>
            <CgPlayTrackNext onClick={()=>changeTrack("next")} />
        </div>
        <div className={clsx(styled.repeat)}>
            <FiRepeat />
        </div>
    </div>
  )
}
