import React, { useState } from 'react';
import '../styles/search.scss';
import axios from 'axios';
import { StarOutlined, StarFilled, ArrowRightOutlined } from '@ant-design/icons'

function Search() {
    const [results, setResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageRendered, setPageRendered] = useState(false);

    const submitSearch = (e) => {
        e.preventDefault()
        setLoading(true)

        axios
            .post('https://reciplease-backend.vercel.app/recipe', {recipe: searchValue})
            .then(res => {
                const likedProp = res.data.map(recipe => {
                    recipe.open = false;
                    recipe.liked = false;
                    return recipe;
                })
                setResults(likedProp);
                console.log(likedProp)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false);
                setPageRendered(true);
            })
    }

    const starIconStyle = {
        fontSize: '2.5rem', 
        height: '5vh',
        cursor: 'pointer'
    }
    
    return (
        <div>
                {pageRendered ? <div className="search-content">
                    <form onSubmit={submitSearch} className="search-form">
                        <div className="search-bar">
                            <input
                                placeholder="Search by Recipe Name, Ingredient"
                                className="search-input"
                                value={searchValue}
                                onChange={(e) => {setSearchValue(e.target.value)}}
                            />
                            <button id="search-button">Search</button>
                        </div>
                    </form>
                    <div className="cards-wrapper" id={loading ? 'cards-wrapper-loading' : ''}>
                            {!results ? console.log('nothin to see here') : results && !loading ? results.map(recipe => {
                                let recipeName = recipe.title
                                let recipeDescription = recipe.summary.replaceAll('<b>', '').replaceAll('</b>', '').replaceAll('<a href="', '').replaceAll('>', '').replaceAll('</a', '').replaceAll('"', ' ')
                                let vegetarian = recipe.vegetarian
                                let vegan = recipe.vegan
                                let recipeImage = recipe.image
                                let cheap = recipe.cheap
                                let recipeId = recipe.id
                                let liked = recipe.liked
                                
                                return (
                                    <div className="card" key={recipe.id}>
                                        <img className="recipe-image" src={recipeImage} alt="recipe"/>
                                        <div className="card-content">
                                            <h2 className="recipe-title">{recipeName}</h2>
                                            <div className="recipe-info">
                                                <p>Prep-time < br />{recipe.readyInMinutes}</p>
                                                <p>Servings < br />{recipe.servings}</p>
                                                <p>score < br />{recipe.spoonacularScore}</p>
                                            </div>
                                            <div className="learn-more">
                                                <StarOutlined style={starIconStyle} /> 
                                                <button>More Info <ArrowRightOutlined /></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : null}
                        </div>
                </div>
                :
                <div className="search-content">
                <form onSubmit={submitSearch} className="search-form">
                    <div className="search-bar">
                        <input
                            placeholder="Search by Recipe Name, Ingredient"
                            type="text"
                            className="search-input"
                            value={searchValue}
                            onChange={(e) => {setSearchValue(e.target.value)}}
                        />
                        <button type="submit" id="search-button">Search</button>
                    </div>

                </form>
                </div>
                }
        </div>
    )
}

export default Search