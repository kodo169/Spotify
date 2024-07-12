import React from 'react'
import clsx from 'clsx'
import styles from './StyledLogin.module.scss'


export default function StyledLogin() {
    const handleClick = () => {
        const clientID = '50e52e84dde74497ad6e3ce545b68182';
        const redirectURI = 'http://localhost:3000/';
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-position",
            "user-top-read",
        ];
        window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;
    };
    return (
        <div className= {clsx(styles.Container)}>
            <div className={clsx(styles.logo)}>
                <img src='https://static.vecteezy.com/system/resources/previews/018/930/579/non_2x/spotify-app-logo-spotify-icon-transparent-free-png.png' alt='Kodo Music'
                    className= {clsx(styles.img)}
                />
                <h1 className={clsx(styles.slogan)}>
                    Welcome to Kodo Music
                </h1>
            </div>
            <button 
                className={clsx(styles.button)}
                onClick={handleClick}
            >
                Login with Spotify
            </button>
        </div>
    )
}
