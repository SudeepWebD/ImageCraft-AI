import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'

function ImageGenerator() {

    const[image_url, setImage_url] = useState("/");
    const[loading,setLoading] = useState(false); 

    let inputRef = useRef(null);

    

    const imageGenerator = async() => {
        if(inputRef.current.value===""){
            return 0;
        }

        setLoading(true);
        
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",  
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    `Bearer ${process.env.REACT_APP_API_KEY}`,
                    "User-Agent" : "Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
        );
        let data = await response.json();

        if (!data || !data.data || data.data.length === 0) {
            alert("Image generation failed. Please check API key or try again.");
            setLoading(false);
            return;
            }

        setImage_url(data.data[0].url);


    }



  return (
    <div className='ai-image-generator'>
        <div className="header">
            ImageCraft <span>AI</span>
        </div>
        <div className="img-loading">
            <div className="image">
                <img src={image_url==="/"?default_image:image_url} alt="" />
            </div>
            <div className="loading">
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
                <div className={loading?"loading-text":"display-none"}>Loading....</div>
            </div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className="search-input" placeholder="Describe what you want to see" />
            <div className="generate-btn" onClick={() => {imageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}


export default ImageGenerator
