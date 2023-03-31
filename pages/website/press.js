import { remark } from 'remark';
import html from 'remark-html';
import * as matter from 'gray-matter';
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import React from "react";
import YouTube from "react-youtube";
import {useEffect } from 'react';

export function App() {
    const [play, setPlay] = React.useState(false);
    const url = play
      ? `https://www.youtube.com/embed/EkKl6IwFTms?autoplay=1`
      : `https://www.youtube.com/embed/EkKl6IwFTms`;

    const [showMe, setShowMe] = useState(false);

    function handleClick() {
    setShowMe(!showMe)
    }

    return (
      <div className={styles.newdesc}>
        <button onClick={() => setPlay(true)} style={{ width: "100%", height: "50px", backgroundColor: '#98fb98'}} ><b>Learn More About Dollar Ventures</b></button>
        <br/>
        <div style={{display: showMe?"block":"none"}}>
        <iframe
          width="560"
          height="315"
          src={url}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
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
        <br/>
        <App/>
        <br/>
          <div className={styles.newdesc} dangerouslySetInnerHTML={{ __html: postData.contentHtml }}>
          </div>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <App/>
        </div>
        
  );
}