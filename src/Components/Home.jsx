import Loader from 'react-loader-spinner';

import React, {useEffect, useState} from 'react';
import './Home.css';
import NewsCard from './NewsCard';

const Home = () => {

    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [likedPosts, setLikedPosts] = useState('')

    // If there is a filter saved in the localstorage, get the posts.
    useEffect(() => {
        setLikedPosts(localStorage.getItem('liked'));
        let localParam = localStorage.getItem('param');
        if (localParam) {
            getNews(localParam, 0);
        }
      }, [])

    // Handle the click on the Select menu
    const handleClickNews = (e) => {
        const param = e.target.value;
        localStorage.setItem('param', param);
        getNews(param, 0);
    }

    // Function to fetch the posts from the API with parameters
    const getNews = (param, page) => {
        setIsLoading(true)
        fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${param}&page=${page}`)
            .then(data => data.json())
            .then(posts => {
                console.log('>>>Posts:', posts)
                let postRender = [];
                let existing = localStorage.getItem('liked');
                posts.hits.forEach(post => {
                    if (post.author && post.story_title ) {
                        const info = {};
                        info.created_at = post.created_at;
                        info.author = post.author;
                        info.story_title = post.story_title;
                        info.story_url = post.story_url;
                        info.liked = existing.includes(post.objectID);
                        info.key = post.objectID;
                        postRender.push(info)
                    }
                });
                setPosts(postRender);
                setIsLoading(false);
            })
    }

    const handleLike = (info) => {
        // Get the existing data
        let existing = localStorage.getItem('liked');
        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? existing.split(',') : [];
        console.log('pre foreach', existing);
        if (existing.includes(info)) {
            for (let i = 0; i < existing.length; i++) {
                if (existing[i] == info) {
                    existing.splice(i, 1);
                    setLikedPosts(existing)
                    return localStorage.setItem('liked', existing.toString());
                }
            }
        }
        // Add new data to localStorage Array
        existing.push(info);
        setLikedPosts(existing)
        // Save back to localStorage
        localStorage.setItem('liked', existing.toString());
    }

    return (
        <div className='homeContainer'>
            <Loader
                style={{position: 'absolute', top: '50%', left: '50%'}}
                type='Grid'
                color='#333'
                height={100}
                width={100}
                visible={isLoading} 
            />
            <div className='insideHomeContainer'>
                <div className='sorter'>
                    <div className='toggle'>
                        <input type='radio' name='sizeBy' value='all' id='allPosts' defaultChecked/>
                        <label htmlFor='allPosts'>All</label>
                        <input type='radio' name='sizeBy' value='faves' id='favesPosts' />
                        <label htmlFor='favesPosts'>My Faves</label>
                    </div>
                    {/* <div className='buttonSorter'>
                        <div>All</div>
                        <div>My Faves</div>
                    </div> */}
                </div>
                <div id='select-box'>
                    <input type='checkbox' id='options-view-button' />
                    <div id='select-button' className='brd'>
                            <div id='selected-value'>
                                <span>Select your news</span>
                            </div>
                            <div id='chevrons'>
                                <i className='fas fa-chevron-down'></i>
                            </div>
                    </div>
                    <div id='options'>
                            <div className='option'>
                                    <input className='s-c top' type='radio' name='platform' value='angular' onClick={(e) => handleClickNews(e)} />
                                    <input className='s-c bottom' type='radio' name='platform' value='angular' onClick={(e) => handleClickNews(e)} />
                                    <i className='fab fa-angular'></i>
                                    <span className='label'>Angular</span>
                                    <span className='opt-val'>Angular</span>
                            </div>
                            <div className='option'>
                                    <input className='s-c top' type='radio' name='platform' value='reactjs' onClick={(e) => handleClickNews(e)} />
                                    <input className='s-c bottom' type='radio' name='platform' value='reactjs' onClick={(e) => handleClickNews(e)} />
                                    <i className='fab fa-react'></i>
                                    <span className='label'>React.js</span>
                                    <span className='opt-val'>React.js</span>
                            </div>
                            <div className='option'>
                                    <input className='s-c top' type='radio' name='platform' value='vuejs' onClick={(e) => handleClickNews(e)}   />
                                    <input className='s-c bottom' type='radio' name='platform' value='vuejs' onClick={(e) => handleClickNews(e)} />
                                    <i className='fab fa-vuejs'></i>
                                    <span className='label'>Vue.js</span>
                                    <span className='opt-val'>Vue.js</span>
                            </div>
                            <div id='option-bg'></div>
                    </div>
                </div>
                <div className='postsContainer'>
                    { posts ?
                    posts.map(post => {
                        return (
                            <NewsCard
                                key = {post.key}
                                id = {post.key}
                                time={post.created_at}
                                author={post.author}
                                title={post.story_title}
                                liked = {likedPosts}
                                url={post.story_url} 
                                functionLike = {() => handleLike(post.key)}
                            />
                        )
                    })
                    :
                    <h3 className='titleHome'>Select a category of news</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
