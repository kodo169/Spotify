import clsx from 'clsx'
import React,{useEffect} from 'react'
import styled from './StyledBody.module.scss'
import { FaPlay  } from 'react-icons/fa'
import {useStateProvider} from '../utils/StateProvider'
import { reducerCases } from '../utils/Contants'
import { CgProfile } from 'react-icons/cg'
import axios from 'axios'


export default function BodySpotify({headerBackground}) {
  const [{token,selectionPlaylistID , selectPlaylist}, dispatch] = useStateProvider();
  useEffect(() => {
    const getInitPlayList = async () => {
      if (token) {

        try{
          const Url =`https://api.spotify.com/v1/playlists/${selectionPlaylistID}`;
          const response = await fetch(Url,{
            headers: {
              Authorization: `Bearer ${token}`
            },
          })

          if(!response.ok){
            throw new Error('Network response was not ok ' + response.statusText);
          }

          const data = await response.json();
          const selectPlaylist = {
            id: data.id,
            name: data.name,
            describe : data.description,
            image : data.images[0].url,
            owner_name : data.owner.display_name,
            tracks: data.tracks.items.map((track) => ({
              id: track.track.id,
              name: track.track.name,
              artists : track.track.artists.map((artists)=> artists.name),
              image : track.track.album.images[2].url,
              duration : track.track.duration_ms,
              album: track.track.album.name,
              context_uri : track.track.uri,
              track_number : track.track.track_number
            })),
          }
          dispatch({type: reducerCases.SELECT_PLAYLIST,selectPlaylist});          
        }catch(error){
          console.error('Error fetching playlist data:', error.response || error.message);
        }
      }
    }
    getInitPlayList();
  },[token,selectionPlaylistID, dispatch]);

  const msToMinutesAndSecons = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10? '0' : ''}${seconds}`;
  }

  const playTrack = async (id,name,artists,image,context_uri,track_number) => {
    const urlGet = `https://api.spotify.com/v1/me/player/play`;
    await axios.put(urlGet, 
      {
        context_uri,
        offset :{
          position: track_number - 1,
        },
        position_ms: 0
      }, 
      {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  return (
    <>
      <div className= {clsx(styled.container, {
        [styled.headerBackground]: headerBackground})} 
      >
      {
        selectPlaylist && (
          <>
            <div className={clsx(styled.playlist)}>
              <div className={clsx(styled.image)}>
                  <img src= {selectPlaylist.image} alt="" />
              </div>
              <div className={clsx(styled.detail)}>
                <span className={clsx(styled.type)}>PlayList</span>
                <h1 className={clsx(styled.title)}>{selectPlaylist.name}</h1>
                <p className={clsx(styled.describe)}>{selectPlaylist.describe}</p>
                <div className={clsx(styled.avatar)}>
                  <a href="#">
                    <CgProfile />
                    <span>{selectPlaylist.owner_name ?? "No Name"}</span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )
      }
      </div>
      <div className={clsx(styled.listMusic)}>
        <div className={clsx(styled.header__row)}>
          <div className={clsx(styled.col)}>
            <span>#</span>
          </div>
          <div className={clsx(styled.col)}>
            <span>TITLE</span>
          </div>
          <div className={clsx(styled.col)}>
            <span>ALBUM</span>
          </div>
          <div className={clsx(styled.col)}>
            <span className={clsx(styled.iconPlay)}><FaPlay/></span>
          </div>
        </div>
        <div className={clsx(styled.tracks)}>
          {
            selectPlaylist && selectPlaylist.tracks.map(({id,name,artists,image,duration,album,context_uri,track_number},index) => {
                return (
                  <div key={id} className={clsx(styled.row)} onClick={() => playTrack(id,name,artists,image,context_uri,track_number)}>
                    <div className={clsx(styled.col)}>
                      <span>{index+1}</span>
                    </div>
                    <div className={clsx(styled.col__detail)}>
                      <div className={clsx(styled.image)}>
                        <img src={image} alt="tracks" />
                      </div>
                      <div className={clsx(styled.infor)}>
                        <p className={clsx(styled.name)}>{name}</p>
                        <p className={clsx(styled.artists)}>{artists.join(", ")}</p>
                      </div>
                    </div>
                    <div className={clsx(styled.col)}>
                      <span>{album}</span>
                    </div>
                    <div className={clsx(styled.col)}>
                      <span>{msToMinutesAndSecons(duration)}</span>
                    </div>
                  </div>
              )
            })}          
        </div>
      </div>
    </>

  )
}
