import Loader from 'react-loader-spinner';
import Pagination from '@material-ui/lab/Pagination';

import React, {useEffect, useState} from 'react';
import './Home.css';
import NewsCard from './NewsCard';

const Home = () => {

    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [likedPosts, setLikedPosts] = useState('');
    const [likedInfo, setLikedInfo] = useState('');
    const [statusToggle, setStatusToggle] = useState('all');

    useEffect(() => {
        // Get the liked id from LocalStorage if any
        let localLiked = localStorage.getItem('liked');
        if (localLiked !== null) {
            localLiked = localLiked.split(',');
        } else {
            localLiked = [];
        }
        setLikedPosts(localLiked);

        // If there is a filter saved in the localstorage, get the posts.
        let localParam = localStorage.getItem('param');
        if (localParam) {
            getNews(localParam, 0);
        }

        // Get and save in a state the info of the faves posts
        let infoLiked = [];
        infoLiked = localLiked.map(id => {
            return getFaves(id);
        });
        Promise.all(infoLiked).then((posts) => {
            setLikedInfo(posts);
        });      
      }, []);


    // Handle the click on the Select menu
    const handleClickNews = (e) => {
        const param = e.target.value;

        localStorage.setItem('param', param);
        getNews(param, 0);
    }

    // Function to fetch the posts from the API with parameters
    const getNews = (param, page) => {
        setIsLoading(true);
        const url = `https://hn.algolia.com/api/v1/search_by_date?query=${param}&page=${page}`;
        console.log(`> query: ${url}`);
        fetch(url)
            .then(data => data.json())
            .then(posts => {
                console.log('>>>Posts:', posts)
                let postRender = [];
                let existing = localStorage.getItem('liked');
                existing ? existing = localStorage.getItem('liked') : existing = [];
                posts.hits.forEach(post => {
                    if (post.author && post.story_title && post.story_url ) {
                        const info = {};
                        info.id = `${post.story_id}:${post.objectID}`;
                        info.key = post.objectID;
                        info.created_at = post.created_at;
                        info.author = post.author;
                        info.story_title = post.story_title;
                        info.story_url = post.story_url;
                        postRender.push(info)
                    }
                });

                setPosts(postRender);
                setIsLoading(false);
            })
    }

    // Function to fetch the posts from the API with parameters
    const getFaves = (id) => {
        setIsLoading(true);
        let [story_id, object_id] = id.split(':');
        const url = `https://hn.algolia.com/api/v1/items/${story_id}`;
        return fetch(url)
            .then(data => data.json())
            .then(post => {
                const info = {};
                info.id = id;
                info.created_at = post.created_at;
                info.author = post.author;
                info.story_title = post.title;
                info.story_url = post.url;

                let comment = post.children.find((comment) => {
                    return comment.id === +object_id;
                });

                if (comment) {
                    info.created_at = comment.created_at;
                    info.author = comment.author;
                    info.key = comment.id;
                }
                setIsLoading(false);
                return info;
            });
    }

    // Function that handles the clicks on the hearts
    const handleLike = (id) => {
        // Get the existing data
        let existing = localStorage.getItem('liked');
        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? existing.split(',') : [];
        console.log('pre foreach', existing);
        if (existing.includes(`${id}`)) {
            for (let i = 0; i < existing.length; i++) {
                if (existing[i] === `${id}`) {
                    existing.splice(i, 1);
                    setLikedPosts(existing);
                    return localStorage.setItem('liked', existing.toString());
                }
            }
        }
        // Add new data to localStorage Array
        existing.push(`${id}`);
        setLikedPosts(existing);
        // Save back to localStorage
        localStorage.setItem('liked', existing.toString());
    }

    // Function for changes in pagination
    const renderNewPage = (event, page) => {
        console.log('The page:', page)
        let localParam = localStorage.getItem('param');
        getNews(localParam, page)
    }

    // Change the statusToggle to render All or Faves
    const renderToggle = (e) => {
        let value = e.target.value;
        // Get and save in a state the info of the faves posts
        let localLiked = localStorage.getItem('liked');
        if (localLiked !== null) {
            localLiked = localLiked.split(',');
        } else {
            localLiked = [];
        }
        setLikedPosts(localLiked);
        let infoLiked = [];
        infoLiked = localLiked.map(id => {
            return getFaves(id);
        });
        Promise.all(infoLiked).then((posts) => {
            setLikedInfo(posts);
        }); 
        setStatusToggle(value)
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
                z-index={99}
            />
            <div className='insideHomeContainer'>
                <div className='sorter'>
                    <div className='toggle'>
                        <input type='radio' name='sizeBy' value='all' id='allPosts' defaultChecked onClick={e => renderToggle(e)}/>
                        <label htmlFor='allPosts'>All</label>
                        <input type='radio' name='sizeBy' value='faves' id='favesPosts' onClick={e => renderToggle(e)} />
                        <label htmlFor='favesPosts'>My Faves</label>
                    </div>
                </div>
                <div id='select-box'>
                    <input type='checkbox' id='options-view-button' />
                    <div id='select-button' className='brd'>
                            <div id='selected-value'>
                                { localStorage.getItem('param') ? 
                                <span>{localStorage.getItem('param')}</span>
                                :
                                <span>Select your news</span>
                                }
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
                <div>
                    { statusToggle === 'all' ? 
                        <div>
                            { posts ?
                                <div className='allContainer'>
                                <div className='postsContainer'>
                                    {posts.map(post => {
                                        return (
                                            <NewsCard
                                                key = {post.key}
                                                id = {post.id}
                                                time={post.created_at}
                                                author={post.author}
                                                title={post.story_title}
                                                liked = {likedPosts}
                                                url={post.story_url} 
                                                functionLike = {() => handleLike(post.id)}
                                            />
                                        )
                                    })
                                    }
                                    </div>
                                    <div className='divPagination'>
                                        <Pagination count={50} variant="outlined" shape="rounded" color='primary' onChange={(event, page) => renderNewPage(event,page)} />
                                    </div>
                                </div>
                                :
                                <h3 className='titleHome'>Select a category of news</h3>
                                }
                        </div>
                    :
                    <div className='postsContainer'>
                    { likedInfo !== '' ?
                        likedInfo.map(post => {
                            return (
                                <NewsCard
                                    key = {post.key}
                                    id = {post.id}
                                    time={post.created_at}
                                    author={post.author}
                                    title={post.story_title}
                                    liked = {likedPosts}
                                    url={post.story_url} 
                                    functionLike = {() => handleLike(post.id)}
                                />
                            )
                        })
                        :
                        <h3 className='titleHome'>There's no favorites posts saved</h3>
                        }
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
