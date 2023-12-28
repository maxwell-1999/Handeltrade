import React from 'react';
import yt_sm from "../assets/socialPlatforms/yt_sm.png";
import tw_sm from "../assets/socialPlatforms/tw_sm.png";

export default function SocialStamp({ name }: { name: string; }) {
  return (<>
    {name == 'youtube' ? (
      <span className='p-2 bg-pink-200 rounded-[5px]'>
        <img height={25} width={25} src={yt_sm} alt="youtube_logo" />
      </span>) : name == 'twitter' ? (
        <span className=' bg-blue-200 rounded-[5px]'>
          <img height={30} width={30} src={tw_sm} alt="twitter_logo" />
        </span>) : null
    }
  </>
  );
}
