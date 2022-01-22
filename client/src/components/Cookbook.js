import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { connect, useDispatch } from 'react-redux';
import '../styles/cookbook.scss'
import { SearchOutlined } from '@ant-design/icons'
import { getUser } from '../actions/index'

function Cookbook(state) {
    const dispatch = useDispatch();

    
    const [savedRecipes, setSavedRecipes] = useState([]);
    
    const history = useNavigate();
    
    useEffect(async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        dispatch(getUser({email: await user.email, username: await user.username}))
        axios.post('https://reciplease-backend.vercel.app/users/saved_recipes', {email: await user.email}).then(res => {
            setSavedRecipes(res.data)
        })
    }, [])

    const onDelete = (id) => {
        axios.delete(`https://reciplease-backend.vercel.app/users/saved_recipes/${state.email}/${id}`).then(res => {
            setSavedRecipes(res.data)
        })
    }

    const logout = () => {
        localStorage.clear();
    }

    return (
        <>
            <div className="cookbook-content">
                <div id="search-icon" onClick={() => {history('/search')}}>
                    <SearchOutlined />
                </div>
                <div className="card-container">
                <h1 className="cookbook-header">Saved Recipes</h1>
                    {savedRecipes.length > 0 ? savedRecipes.map(recipe => {
                        return (
                            <div className="card">
                                <img className="recipe-image" alt="recipe" src={recipe.image} />
                                <h1 className="recipe-title">{recipe.title}</h1>
                                <div className="tags">
                                    <div className="recipe-diets">
                                        <h6 className="category">Diets:</h6> {recipe.diets.map(diet => {
                                            return (
                                                <p className="category-tag">{diet}</p>
                                            )
                                        })}
                                    </div>
                                    <h6 className="category">Score: {recipe.spoonacularScore}</h6>
                                    <div className="recipe-dish-types">
                                        <h6 className="category">Dish types:</h6> {recipe.dishTypes.map(dish => {
                                            return (
                                                <p className="category-tag">{dish}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                                <h1 className="description">Description:<p className="description-data">{ReactHtmlParser(recipe.summary)}</p></h1>
                                <h1 className="instructions-header">Instructions:</h1>
                                <div className="recipe-instructions">
                                    {recipe.analyzedInstructions.map(step => {
                                        return (
                                            <div className="recipe-instruction-steps">
                                                <h6 className="category">{step.name}</h6> <br/>
                                                {step.steps.map(x => {
                                                    return (
                                                        <h6 className="category">{x.step}</h6>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                                <button className="cookbook-delete-button" onClick={() => {onDelete(recipe.id);}}>Remove from cookbook</button>
                            </div>
                        )
                    })
                    :
                    null
                    }
                </div>
                <div onClick={logout}>
                    <Link className="logout-link" to="/">Logout</Link>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Cookbook)