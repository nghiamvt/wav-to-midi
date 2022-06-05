import * as React from 'react';

import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Card } from './Card';

export default function AudioPlayer() {
  return (
    <Card>
      <Info />
      <Progress />
      <Controller />
      <Volumne />
    </Card>
  )
}

const Info = () => {
  const songName = "Hotel California"
  const author = "Eagles"
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: 350 }}>
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 2,
          backgroundColor: "rgba(0,0,0,0.08)",
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box sx={{ ml: 2, minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          Jun Pulse
        </Typography>
        <Typography noWrap>
          <b>{songName}</b>
        </Typography>
        <Typography noWrap letterSpacing={-0.25}>
          {author}
        </Typography>
      </Box>
    </Box>
  )
}

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
})

function formatDuration(value: number) {
  const minute = Math.floor(value / 60)
  const secondLeft = value - minute * 60
  return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`
}

const Progress = () => {
  const duration = 200 // seconds
  const [position, setPosition] = React.useState(32)
  return (
    <>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={(_, value) => setPosition(value as number)}
        sx={{
          color: "rgba(0,0,0,0.87)",
          height: 4,
          "& .MuiSlider-thumb": {
            width: 8,
            height: 8,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: -2,
        }}
      >
        <TinyText>{formatDuration(position)}</TinyText>
        <TinyText>-{formatDuration(duration - position)}</TinyText>
      </Box>
    </>
  )
}

const Controller = () => {
  const [paused, setPaused] = React.useState(false)
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: -1,
      }}
    >
      <IconButton>
        <FastRewindRounded fontSize="large" htmlColor="#000" />
      </IconButton>
      <IconButton onClick={() => setPaused(!paused)}>
        {paused ? (
          <PlayArrowRounded sx={{ fontSize: "3rem" }} htmlColor="#000" />
        ) : (
          <PauseRounded sx={{ fontSize: "3rem" }} htmlColor="#000" />
        )}
      </IconButton>
      <IconButton>
        <FastForwardRounded fontSize="large" htmlColor="#000" />
      </IconButton>
    </Box>
  )
}

const Volumne = () => {
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ mb: 1, px: 1 }}
      alignItems="center"
    >
      <VolumeDownRounded htmlColor="rgba(0,0,0,0.4)" />
      <Slider
        aria-label="Volume"
        defaultValue={30}
        sx={{
          color: "rgba(0,0,0,0.87)",
          "& .MuiSlider-track": {
            border: "none",
          },
          "& .MuiSlider-thumb": {
            width: 24,
            height: 24,
            backgroundColor: "#fff",
            "&:before": {
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible, &.Mui-active": {
              boxShadow: "none",
            },
          },
        }}
      />
      <VolumeUpRounded htmlColor="rgba(0,0,0,0.4)" />
    </Stack>
  )
}
