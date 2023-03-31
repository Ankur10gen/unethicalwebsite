import { remark } from 'remark';
import html from 'remark-html';
import * as matter from 'gray-matter';
import styles from '@/styles/Home.module.css'

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

  const fullPath = '../docs-content.md';
  const fileContents = fs.readFileSync('pages/website/docs-content.md', 'utf8');
  
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

export default function Docs({postData}) {
  console.log(postData)
  return (
    <div>
      <div className={styles.newdesc} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}