import React, { useState } from 'react';
import '../styles/cards.scss';

import { StarOutlined, StarFilled, Loading3QuartersOutlined } from '@ant-design/icons';

function Cards({recipes, loading, likedRecipeHandler, moreInfoHandler, showDrawer }) {
    
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
        if (input.length > 22) {
           return input.substring(0, 22) + '...';
        }
        return input;
     };

    return (
        <>
            <div className="cards-wrapper">
            { loading && <Loading3QuartersOutlined spin style={loadingIconStyle} />}
                { recipes && recipes.map(recipe => {
                    const { id, image, title, readyInMinutes, servings, spoonacularScore, vegan, vegetarian, pricePerServing, summary } = recipe
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

                                <div className="learn-more">
                                    {recipe.liked ? (
                                        <StarFilled style={starIconStyle} onClick={() => likedRecipeHandler(id)} />) : (
                                        <StarOutlined style={starIconStyle} onClick={() => likedRecipeHandler(id)} /> ) 
                                    }
                                    <button onClick={() => {moreInfoHandler(id); showDrawer(recipe)}}>More Info</button>
                                </div>
                            </div>
                    )
                })}
            </div>
        </>
    )
}

export default Cards;