import React from 'react'
import clsx from 'clsx'
import styled from './StyledFooter.module.scss'
import CurrentTracks from './CurrentTracks'
import PlayerControl from './PlayerControl'
import Volumn from './Volumn'

export default function FooterSporify() {
  return (
    <div className={clsx(styled.container)}>
      <CurrentTracks />
      <PlayerControl />
      <Volumn />
    </div>
  )
}
