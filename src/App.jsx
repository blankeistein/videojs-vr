import { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Card, IconButton, Input, Typography } from '@material-tailwind/react'
import { AnimatePresence, motion } from "motion/react";
import { FastForward, Play, PlayIcon, Rewind } from 'lucide-react';
import VideoJS from './VideoJS';
// https://videojs-vr.netlify.app/samples/eagle-360.mp4

function App() {
  const [url, setUrl] = useState(null)
  const [projection, setProjection] = useState("AUTO");

  const playerRef = useRef(null);
  const options = {
    controls: true,
    responsive: true,
    fluid: true,
    plugins: {
      seekButtons: {
        forward: 10,
        back: 10
      }
    },
    sources: [
      {
        src: url,
        type: 'video/mp4',
      },
    ],
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });

    player.el().querySelector('video').setAttribute("crossorigin", 'anonymous')

    player.mediainfo = player.mediainfo || {};
    player.mediainfo.projection = '360'

    player.vr({ projection: projection, debug: true, forceCardboard: false});
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const element = e.target;
    const form = new FormData(element);
    const url = form.get("url")

    setUrl(url);
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='min-h-screen w-full '>
      <div className='px-4 mx-auto max-w-[1000px] py-5'>
        <Card className='min-h-[120px] w-full mb-5 overflow-hidden relative'>
          {
            (url && projection) && 
            <>
              <VideoJS options={options} onReady={handlePlayerReady} />
            </>
          }
          {/* <AFrameVideo /> */}
        </Card>
        <form onSubmit={handleSubmit} className='mb-8'>
          <div className='flex gap-2 w-full mb-4 flex-wrap'>
            <Input label='URL' name="url" size='lg' className='grow' />

              <Button color='red' className='flex items-center justify-center w-full gap-2' type="submit">
                <PlayIcon className='size-5' />
                Putar
              </Button>
          </div>
        </form>
        <Typography variant='h4' className='mb-4'>Jenis Proyeksi</Typography>
        <div className='flex gap-2 items-center flex-wrap'>
          <Button color="gray" onClick={() => setProjection('NONE')}>None</Button>
          <Button color="light-blue" onClick={() => setProjection('AUTO')}>Auto</Button>
          <Button color="light-blue" onClick={() => setProjection('180')}>180</Button>
          <Button color="light-blue" onClick={() => setProjection('180_LR')}>180 LR</Button>
          <Button color="light-blue" onClick={() => setProjection('180_MONO')}>180 Mono</Button>
          <Button color="red" onClick={() => setProjection('360')}>360</Button>
          <Button color="red" onClick={() => setProjection('360_LR')}>360 LR</Button>
          <Button color="red" onClick={() => setProjection('360_TB')}>360 TB</Button>
          <Button color="red" onClick={() => setProjection('CUBE')}>CUBE</Button>
        </div>
      </div>
    </div>
  )
}

export default App

