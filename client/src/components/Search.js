import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/search.scss';
import axios from 'axios';
import { Drawer } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import ReactHtmlParser from 'react-html-parser';

import Cards from './Cards';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getUser } from '../actions';
import { useDispatch } from 'react-redux'

function Search(state) {
    const dispatch = useDispatch();

    useEffect(async () => {
        if (!state.username || !state.email) {
            const user = JSON.parse(localStorage.getItem('user'))
            dispatch(getUser({email: await user.email, username: await user.username}))
        }
    }, [state])

    let openRecipe = {
        id: '',
        image: '',
        title: '',
        readyInMinutes: '',
        servings: '',
        spoonacularScore: '',
        vegan: '',
        vegetarian: '',
        pricePerServing: '',
        description: ''
    }

    const [results, setResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [drawerRecipe, setDrawerRecipe] = useState(openRecipe);

    const history = useNavigate();

    const showDrawer = (e) => {
        console.log(e)
        setDrawerRecipe({
            id: e.id,
            image: e.image,
            title: e.title,
            readyInMinutes: e.readyInMinutes,
            servings: e.servings,
            spoonacularScore: e.spoonacularScore,
            vegan: e.vegan,
            vegetarian: e.vegetarian,
            pricePerServing: e.pricePerServing,
            description: e.summary
        })
        setVisible(true);
        
      };
      const onClose = () => {
        setVisible(false);
      };

    const submitSearch = (e) => {
        e.preventDefault()
        setLoading(true)

        axios
            .post('https://reciplease-backend.vercel.app/recipe', {recipe: searchValue})
            .then(async (res) => {
                let likedRecipe = res.data.map(recipe => {
                    recipe.open = false;
                    recipe.liked = false;
                    return recipe
                })
                const user = JSON.parse(localStorage.getItem('user'))
                axios.post('https://reciplease-backend.vercel.app/users/saved_recipes', {email: await user.email}).then(response => {
                    setSavedRecipes(response.data)
                    response.data.map(recipe => {
                        likedRecipe = likedRecipe.filter(x => {
                            return x.id !== recipe.id
                        })
                    })
                    setResults(likedRecipe);
                })
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

    const likedRecipeHandler = (id) => {

        let recipeResults = results
        
        results.map(recipe => {
            if (recipe.id === id) {
                recipe.liked = !recipe.liked
                axios.put('https://reciplease-backend.vercel.app/users/saved_recipes', 
                {
                    email: state.email, 
                    recipe: recipe
                })
                .then(() => {
                    console.log('success!');
                })
            }

            return recipe
        })

        recipeResults = recipeResults.filter(recipe => {
            return recipe.id !== id
        })

        setResults(recipeResults)

        
    }

    const logout = () => {
        localStorage.clear();
    }

    return (
        <>
            <Drawer
                className="tablet"
                placement="right"
                onClose={onClose}
                visible={visible}
                width={window.matchMedia("(max-width:850px)").matches ? '100vw' : '50vw'}
            >
                <div className="drawer-container">
                    <img className="drawer-recipe-image" src={drawerRecipe.image} alt="recipe"/>
                    <div className="drawer-card-content">
                        <h2 className="drawer-recipe-title">{drawerRecipe.title}</h2>
                        <div className="drawer-recipe-info">
                            <p>Prep-time < br />{drawerRecipe.readyInMinutes} Minutes</p>
                            <p>Servings < br />{drawerRecipe.servings}</p>
                            <p>Score < br />{drawerRecipe.spoonacularScore}</p>
                        </div>
                    </div>
                    <div className='open'>
                        <div className="description">
                            <h2 className="description-header">Description</h2>
                            <h3 className="description-summary">{ ReactHtmlParser(drawerRecipe.description) }</h3>
                        </div>
                    </div>
                </div>
            </Drawer>
        <div className="search-content">
            <div className="search-header">
                <div onClick={() => {history('/cookbook')}}>
                    <BookOutlined />
                </div>
                <h1 className="landing-title">Reciplease</h1>
                <div className="logout-div" onClick={logout}>
                    <Link className="logout-link" to="/">Logout</Link>
                </div>
            </div>
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

            <Cards showDrawer={showDrawer} recipes={results} loading={loading} likedRecipeHandler={likedRecipeHandler} moreInfoHandler={moreInfoHandler} />
        </div>
    </>
    )
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Search)