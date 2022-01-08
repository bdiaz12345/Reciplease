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
        console.log(JSON.parse(localStorage.getItem('user')))
        const user = JSON.parse(localStorage.getItem('user'))
        dispatch(getUser({email: await user.email, username: await user.username}))
        console.log(state)
        axios.post('https://reciplease-backend.vercel.app/users/saved_recipes', {email: await user.email}).then(res => {
            console.log('saved recipes', res.data)
            setSavedRecipes(res.data)
        })
    }, [])

    const onDelete = (id) => {
        axios.delete(`https://reciplease-backend.vercel.app/users/saved_recipes/${state.email}/${id}`).then(res => {
            console.log(res)
            setSavedRecipes(res.data)
        })
    }

    const logout = () => {
        localStorage.clear();
    }

    return (
        <>
            <div className="cookbook-content">
                <div onClick={() => {history('/search')}}>
                    <SearchOutlined style={window.matchMedia("(min-width: 768px").matches ? {fontSize: '48px', color: '#FCDE7B', cursor: 'pointer', position: 'fixed', marginLeft: '3rem', marginTop: '1rem'} : {fontSize: '30px', color: '#FCDE7B', cursor: 'pointer', position: 'fixed', top: '3.5%'}}/>
                </div>
                <div className="card-container">
                <h1 className="cookbook-header">Saved Recipes</h1>
                    {savedRecipes.length > 0 ? savedRecipes.map(recipe => {
                        return (
                            <div className="card">
                                <img className="recipe-image" src={recipe.image} />
                                <h1 className="recipe-title">{recipe.title}</h1>
                                <div className="tags">
                                    <div className="recipe-diets">
                                        Diets: {recipe.diets.map(diet => {
                                            return (
                                                <p>{diet}</p>
                                            )
                                        })}
                                    </div>
                                    <h6>Score: {recipe.spoonacularScore}</h6>
                                    <div className="recipe-dish-types">
                                        Dish types: {recipe.dishTypes.map(dish => {
                                            return (
                                                <p>{dish}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                                <h1 className="description">Description:<p className="description-data">{ReactHtmlParser(recipe.summary)}</p></h1>
                                <div className="recipe-instructions">
                                    <h1 className="instructions-header">Instructions:</h1> {recipe.analyzedInstructions.map(step => {
                                        return (
                                            <div className="recipe-instruction-steps">
                                                {step.name} <br/>
                                                Steps: {step.steps.map(x => {
                                                    return (
                                                        <p>{x.step}</p>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                                <button className="cookbook-delete-button" onClick={() => {onDelete(recipe.id)}}>Remove from cookbook</button>
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