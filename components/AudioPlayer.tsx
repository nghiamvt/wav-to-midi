import * as React from 'react';
import { DropzoneState } from 'react-dropzone';
import { useAudioPlayer, useAudioPosition } from 'react-use-audio-player';

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

export default function AudioPlayer(props: any) {
  const { file } = props;

  const audioPlayer = useAudioPlayer({
    src: "/ckgmdt.mp3",
    autoplay: false,
    html5: true,
    format: ["mp3"],
  });

  return (
    <Card>
      <Info />
      <Progress />
      <Controller />
      <Volumne />
    </Card>
  );
}

const Info = () => {
  const songName = "Hotel California";
  const author = "Eagles";
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
  );
};

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const formatTime = (seconds: number) => {
  const floored = Math.floor(seconds);
  let from = 14;
  let length = 19;

  //mvtnhan said: 'if second > 3600 and your want to show only MM:SS'
  if (floored >= 3600) {
    from = 11;
    length = 16;
  }

  return new Date(floored * 1000).toISOString().substring(from, length);
};

const Progress = () => {
  const { duration, position, seek, percentComplete } = useAudioPosition({
    highRefreshRate: true,
  });
  if (duration === Infinity) return null;

  const goToPosition = (event: Event, value: number | number[] | any) => {
    if (!!value) {
      const endDistance = duration - value;
      const newPosition = duration - endDistance;
      seek(newPosition);
    }
  };

  return (
    <>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={0.01}
        max={duration}
        onChange={goToPosition}
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
        <TinyText>{formatTime(position)}</TinyText>
        <TinyText>-{formatTime(duration - position)}</TinyText>
      </Box>
    </>
  );
};

const Controller = () => {
  const { togglePlayPause, playing } = useAudioPlayer();

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
      <IconButton onClick={togglePlayPause}>
        {!playing ? (
          <PlayArrowRounded sx={{ fontSize: "3rem" }} htmlColor="#000" />
        ) : (
          <PauseRounded sx={{ fontSize: "3rem" }} htmlColor="#000" />
        )}
      </IconButton>
      <IconButton>
        <FastForwardRounded fontSize="large" htmlColor="#000" />
      </IconButton>
    </Box>
  );
};

const Volumne = () => {
  const { volume } = useAudioPlayer();
  const handleChange = (event: Event, newValue: number | number[]) => {
    volume(newValue);
  };

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
        onChange={handleChange}
        defaultValue={100}
        min={0}
        max={1}
        step={0.01}
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
  );
};
