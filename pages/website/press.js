import { remark } from 'remark';
import html from 'remark-html';
import * as matter from 'gray-matter';
import styles from '@/styles/Home.module.css'
import { useState, useRef } from 'react';
import React from "react";
import YouTube from "react-youtube";
import {useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'

export function RunJoke(){
    const [showMe, setShowMe] = useState(false);

    setTimeout(() => {
        setShowMe(true)
    }, 7000)

    return (
        <div style={{display: showMe?"block":"none"}} className={styles.newdesc}>
            {"If you have already read the entire text and still trying to make sense of what we do, I guess you have been April Fooled."}
            {"Unfortunately you can't do much about the time you wasted here. But"}
            {"You might enjoy wasting your friend's time. Hit that Like button on the social media post that sent you here so that your friends fall for the same prank."}
        </div>
    );
}

export function YoutubeVideo(){
    
    const [play, setPlay] = React.useState(false);
    const [showMe, setShowMe] = useState(false);
    
    const opts = {
        height: "390",
        width: "640",
        data:showMe?1:0,
        playerVars: {
          autoplay: play,
        }}
  
    setTimeout(() => {
        setShowMe(true)
        console.log("executed timeout")
    }, 7000)

    function _onReady(event) {
        showMe ? event.target.playVideo() : event.target.pauseVideo()
    }

    return (

      <div>
        <button onClick={() => {setPlay(true); setShowMe(true)}} style={{ width: "100%", height: "50px", backgroundColor: '#98fb98', cursor: 'pointer'}} ><b>Learn More About Dollar Ventures and Our Initiatives in APAC</b></button>
        <br/>
        <div style={{display: showMe?"block":"none"}}>
        <YouTube videoId="EkKl6IwFTms" 
            opts={opts} onReady={_onReady} />

        </div>
      </div>
    );
  
//   _onReady(event) {
//     event.target.pauseVideo();
//   }
}


export function App() {
    const [play, setPlay] = React.useState(false);
    const url = play
      ? `https://www.youtube.com/embed/EkKl6IwFTms?autoplay=1`
      : `https://www.youtube.com/embed/EkKl6IwFTms`;

    const [showMe, setShowMe] = useState(false);

    return (
      <div className={styles.newdesc}>
        <button onClick={() => setPlay(true)} style={{ width: "100%", height: "50px", backgroundColor: '#98fb98', cursor: 'pointer'}} ><b>Learn More About Dollar Ventures and Our Initiatives in APAC</b></button>
        <br/>
        <div style={{display: showMe?"block":"none"}}>
        <iframe
          width="560"
          height="315"
          src={url}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        </div>
      </div>
    );
  }

export async function getStaticProps({ params }) {

  const postData = JSON.parse(JSON.stringify( await getPostData()));
  console.log("getStaticProps", postData)
  return {
    props: {
      postData,
    },
  };
}

export async function getPostData() {

  const fs = require('fs');

  const fileContents = fs.readFileSync('pages/website/press-content.md', 'utf8');
  
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);    
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  console.log("processed",processedContent)
  return {contentHtml, ...matterResult.data}

} 

export default function Press({postData}) {
  console.log(postData)

  const [showMe, setShowMe] = useState(false);

  function handleClick() {
    setShowMe(!showMe)
  }

  return (
        <div>

        <Head>
        <title>Unethical</title>
        <meta name="description" content="Take Risks, Break Rules" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
        <br/>
        <br/>
        <YoutubeVideo/>
        {/* <App/> */}
        <br/>
          <div className={styles.newdesc} dangerouslySetInnerHTML={{ __html: postData.contentHtml }}>
          </div>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {/* <App/> */}
          <div className={styles.center}>
          <img src="https://drive.google.com/uc?id=1IkWrw78yQum-h0K8Cvq--zOrXOjuRlWy" width="200" height="200" align="center"></img>
          </div>
          <RunJoke/>
          <br/>
        </div>
        
  );
}