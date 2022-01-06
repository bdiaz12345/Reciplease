import React from 'react';
import '../styles/cards.scss';

import { StarOutlined, StarFilled, Loading3QuartersOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { spinIndicator } from 'antd/lib/spin';
import ReactHtmlParser from 'react-html-parser';

function Cards({recipes, loading, likedRecipeHandler, moreInfoHandler }) {
    
    const starIconStyle = {
        fontSize: '2.5rem',
        height: '5vh',
        cursor: 'pointer',
        color: '#fcde7b',
    }

    const loadingIconStyle = {
        fontSize: '3rem',
        width: '100%'
    }

    function truncate(input) {
        if (input.length > 24) {
           return input.substring(0, 24) + '...';
        }
        return input;
     };

    return (
        <>
            <div className="cards-wrapper">
            { loading && <Loading3QuartersOutlined spin style={loadingIconStyle} />}
            {/* { loading && <Spin indicator={spinIndicator}  />} */}
                { recipes && recipes.map(recipe => {
                    const { id, image, title, readyInMinutes, servings, spoonacularScore, vegan, vegetarian, pricePerServing } = recipe
                    const description = recipe.summary
                    return (
                            <div className="card" key={id}>
                                <img className="recipe-image" src={image} alt="recipe"/>
                                <div className="card-content">
                                    <h2 className="recipe-title">{truncate(title)}</h2>
                                    <div className="recipe-info">
                                        <p>Prep-time < br />{readyInMinutes} Minutes</p>
                                        <p>Servings < br />{servings}</p>
                                        <p>Score < br />{spoonacularScore}</p>
                                    </div>
                                </div>

                                { recipe.open && (
                                    <div className='open'>
                                        <div className='description'>
                                            <h2>Description</h2>
                                            <p>{ ReactHtmlParser(description) }</p>
                                        </div>
                                    </div>
                                )}

                                <div className="learn-more">
                                    {recipe.liked ? (
                                        <StarFilled style={starIconStyle} onClick={() => likedRecipeHandler(id)} />) : (
                                        <StarOutlined style={starIconStyle} onClick={() => likedRecipeHandler(id)} /> ) 
                                    }
                                    <button onClick={() => moreInfoHandler(id)}>{ !recipe.open ? 'More Info' : 'Less Info'}</button>
                                </div>
                            </div>
                    )
                })}
            </div>
        </>
    )
}

export default Cards;