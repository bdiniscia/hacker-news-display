import React from 'react';
import './Home.css';
import NewsCard from './NewsCard';

const Home = () => {
    return (
        <div className='homeContainer'>
            <div className='sorter'>
                <div class="toggle">
                    <input type="radio" name="sizeBy" value="weight" id="sizeWeight" checked="checked" />
                    <label for="sizeWeight">All</label>
                    <input type="radio" name="sizeBy" value="dimensions" id="sizeDimensions" />
                    <label for="sizeDimensions">My Faves</label>
                </div>
                {/* <div className='buttonSorter'>
                    <div>All</div>
                    <div>My Faves</div>
                </div> */}
            </div>
            <div className='postsContainer'>
                <NewsCard
                time='2 hours'
                author='author'
                title='Event-driven state management in React using Storeon' 
                liked = {true} />
                <NewsCard
                time='3 hours'
                author='James John'
                title='All the fundamental React.js concepts, jammed into this single Medium article (updated August 2019)' 
                liked = {false} />
                <NewsCard
                time='4 hours'
                author='author'
                title='Yes, React is taking over front-end development. The question is why.' 
                liked = {true} />
            </div>
        </div>
    )
}

export default Home
