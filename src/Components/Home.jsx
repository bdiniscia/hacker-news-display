import React from 'react';
import './Home.css';
import NewsCard from './NewsCard';

const Home = () => {
    return (
        <div className='homeContainer'>
            <div className='insideHomeContainer'>
                <div className='sorter'>
                    <div class="toggle">
                        <input type="radio" name="sizeBy" value="all" id="allPosts" checked="checked" />
                        <label for="allPosts">All</label>
                        <input type="radio" name="sizeBy" value="faves" id="favesPosts" />
                        <label for="favesPosts">My Faves</label>
                    </div>
                    {/* <div className='buttonSorter'>
                        <div>All</div>
                        <div>My Faves</div>
                    </div> */}
                </div>
                <div id="select-box">
                    <input type="checkbox" id="options-view-button" />
                    <div id="select-button" class="brd">
                            <div id="selected-value">
                                <span>Select your news</span>
                            </div>
                            <div id="chevrons">
                                    <i class="fas fa-chevron-down"></i>
                            </div>
                    </div>
                    <div id="options">
                            <div class="option">
                                    <input class="s-c top" type="radio" name="platform" value="angular" />
                                    <input class="s-c bottom" type="radio" name="platform" value="angular"/>
                                    <i class="fab fa-angular"></i>
                                    <span class="label">Angular</span>
                                    <span class="opt-val">Angular</span>
                            </div>
                            <div class="option">
                                    <input class="s-c top" type="radio" name="platform" value="react" />
                                    <input class="s-c bottom" type="radio" name="platform" value="react" />
                                    <i class="fab fa-react"></i>
                                    <span class="label">React.js</span>
                                    <span class="opt-val">React.js</span>
                            </div>
                            <div class="option">
                                    <input class="s-c top" type="radio" name="platform" value="vuejs" />
                                    <input class="s-c bottom" type="radio" name="platform" value="vuejs"/>
                                    <i class="fab fa-vuejs"></i>
                                    <span class="label">Vue.js</span>
                                    <span class="opt-val">Vue.js</span>
                            </div>
                            <div id="option-bg"></div>
                    </div>
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
        </div>
    )
}

export default Home
