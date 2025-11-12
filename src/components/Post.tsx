import axios from 'axios'
import { useEffect, useState } from 'react'

const Post =()=>{
    //const [postContent, setPostContent] = useState('');
    const[frontMatter, setFrontMatter] = useState(['']);
    const[contentMatter, setContentMatter] = useState(['']);
    const owner = 'suka712';
    const repo = 'sukaseven.com';
    const path = 'posts/1.first-post.md';
    const linkToContent = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    let rawMD: string;
    useEffect(() => {
       const getContent = async () => {
          try {
             const response = await axios.get(linkToContent);      
             rawMD =atob(response.data.content);
             setFrontMatter(parseFrontfatter(rawMD));
             setContentMatter( parseContentfatter (rawMD));
             //setPostContent(rawMD);
             
            } catch (error) {
                console.error('Error fetching post content:', error);
            }
        }
        
        getContent();

    });



    const parseFrontfatter = (rawMD: string) => {
        return rawMD.split('---')[1].trim().split('\n');
        
    }
    const parseContentfatter = (rawMD: string) => {
        return rawMD.split('---')[2].split('\n');
    }
    return (
    <>
    {frontMatter.map((fm)=>{
        return <li>{fm}</li>
    })}
        <p>{contentMatter}</p>
    </>
    );
};
export default Post