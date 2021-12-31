import React from 'react';
import '../styles/cards.scss';
import { Spin } from 'antd';
import { StarOutlined, StarFilled, LoadingOutlined } from '@ant-design/icons';
import ReactHtmlParser from 'react-html-parser';

function Cards({recipes, loading, likedRecipeHandler, moreInfoHandler }) {
    
    const starIconStyle = {
        fontSize: '2.5rem', 
        height: '5vh',
        cursor: 'pointer',
        color: '#fcde7b',
    }

    const loadingIconStyle = {
        fontSize: '4.5rem',
        width: '100%',
        marginTop: 50
    }

    const spinIndicator = <LoadingOutlined spin style={loadingIconStyle} />

    return (
        <>
            <div className="cards-wrapper">
            { loading && <Spin indicator={spinIndicator}  />}
                { recipes && recipes.map(recipe => {
                    const { id, image, title, readyInMinutes, servings, spoonacularScore, vegan, vegetarian, pricePerServing } = recipe
                    const description = recipe.summary
                    return (
                            <div className="card" key={id}>
                                <img className="recipe-image" src={image} alt="recipe"/>
                                <div className="card-content">
                                    <h2 className="recipe-title">{title}</h2>
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

                                        <div className="steps">
                                            <h2>Steps</h2>
                                            { recipe.analyzedInstructions[0].steps ? (
                                                recipe.analyzedInstructions[0].steps.map(step => 
                                                    <ol>
                                                        <li>{step.step}</li>
                                                    </ol>
                                                )
                                            ) : <Spin indicator={spinIndicator}  /> }
                                        </div>
                                    </div>
                                )}

                                <div className="learn-more">
                                    {recipe.liked ? (
                                        <StarFilled style={starIconStyle} onClick={() => likedRecipeHandler(id)} /> 
                                    ) : (
                                        <StarOutlined style={starIconStyle} onClick={() => likedRecipeHandler(id)} /> 
                                    )}
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