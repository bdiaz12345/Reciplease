import React, { useState } from 'react';
import '../styles/search.scss';
import axios from 'axios';
import { StarOutlined, StarFilled, Loading3QuartersOutlined } from '@ant-design/icons';
import ReactHtmlParser from 'react-html-parser';

function Search() {
    const [results, setResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    const submitSearch = (e) => {
        e.preventDefault()
        setLoading(true)

        axios
            .post('https://reciplease-backend.vercel.app/recipe', {recipe: searchValue})
            .then(res => {
                const likedRecipe = res.data.map(recipe => {
                    recipe.open = false;
                    recipe.liked = false;
                    return recipe
                })
                setResults(likedRecipe)
                console.log(likedRecipe)
            })
            .catch(err => {
                console.log({err})
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const moreInfoHandler = (id) => {
        setResults(
            results.map(recipe => {
                if (recipe.id === id) {
                    recipe.open = !recipe.open
                }
                return recipe
            })
        )
    }

    // Ant Design Styles
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
    
    return (
        <div className="search-content">
            <form onSubmit={submitSearch} className="search-form">
                <input
                    placeholder="Search by Recipe Name, Ingredient"
                    type="text"
                    className="search-input"
                    value={searchValue}
                    onChange={(e) => {setSearchValue(e.target.value)}}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="cards-wrapper">
                { loading && <Loading3QuartersOutlined spin style={loadingIconStyle} />}
                { results && results.map(recipe => {
                    const { id, image, title, readyInMinutes, servings, spoonacularScore, vegan, vegetarian, pricePerServing } = recipe
                    // const description = recipe.summary.replaceAll('<b>', '').replaceAll('</b>', '').replaceAll('<a href="', '').replaceAll('>', '').replaceAll('</a', '').replaceAll('"', ' ')
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
                                            <p>{ ReactHtmlParser (description)}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="learn-more">
                                    {recipe.liked ? (<StarFilled style={starIconStyle} />) : (<StarOutlined style={starIconStyle} /> ) }
                                    <button onClick={() => moreInfoHandler(id)}>{ !recipe.open ? 'More Info' : 'Less Info'}</button>
                                </div>
                            </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Search