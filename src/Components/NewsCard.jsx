import React from 'react';
import './NewsCard.css';

const NewsCard = ({time, author, title, liked, url }) => {
    return (
        <div className='rectangle'>
            <div className='contentInfo'> 
                <a href={url} target='_blank' rel="noopener noreferrer" className='linkInfo' >
                    <div className='createdDiv'>
                        <img alt='icon for the posted time' className='iconClock' src={require('../img/iconmonstr-time-2.svg')} />
                        <span>{time} by {author}</span>
                    </div>
                    <h3 className='titlePost'>{title}</h3>
                </a>
            </div>
            <div className='likedDiv'>
                { liked ?
                <img alt='liked' src={require('../img/iconmonstr-favorite-3.svg')} />
                :
                <img alt='not liked' src={require('../img/iconmonstr-favorite-2.svg')} />
                }
            </div>
        </div>
    )
}

export default NewsCard
