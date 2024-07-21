import React from 'react'
import Styled from './StyledVolumn.module.scss'
import clsx from 'clsx'
import {useStateProvider} from '../utils/StateProvider'
import axios from 'axios';

export default function Volumn() {
    const [{token}] = useStateProvider();

    const setVolumn = async (e) => {    
        const urlPost = 'https://api.spotify.com/v1/me/player/volume?volume_percent=50';

        await axios.put( urlPost,{},{
            params : {
                volume_percent : parseInt(e.target.value)
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }
    return (
    <div className={clsx(Styled.container)}>
        <input type="range" min={0} max={100} onMouseUp={(e)=> setVolumn(e)} />
    </div>
    )
}
