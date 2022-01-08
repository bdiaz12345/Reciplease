import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/search.scss';
import axios from 'axios';
import { Drawer } from 'antd'
import ReactHtmlParser from 'react-html-parser';
import { BookOutlined } from '@ant-design/icons';
import Cards from './Cards';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Search(state) {

    console.log('user', state)

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
    const [drawerRecipe, setDrawerRecipe] = useState(openRecipe);

    const history = useNavigate();

    const showDrawer = (e) => {
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
            .then(res => {
                const likedRecipe = res.data.map(recipe => {
                    recipe.open = false;
                    recipe.liked = false;
                    return recipe
                })
                setResults(likedRecipe)
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
        setResults(
            results.map(recipe => {
                if (recipe.id === id) {
                    recipe.liked = !recipe.liked
                    axios.put('https://reciplease-backend.vercel.app/users/saved_recipes', 
                    {
                        email: state.email, 
                        recipe: recipe
                    })
                    .then(res => {
                        console.log(res);
                    })
                }

                return recipe
            })
        )
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
                width="50vw"
            >
                <div className="drawer-container">
                    <img className="drawer-recipe-image" src={drawerRecipe.image} alt="recipe"/>
                    <div className="drawer-card-content">
                        <h1 className="drawer-recipe-title">{drawerRecipe.title}</h1>
                        <div className="drawer-recipe-info">
                            <h3>Prep-time < br />{drawerRecipe.readyInMinutes} Minutes</h3>
                            <h3>Servings < br />{drawerRecipe.servings}</h3>
                            <h3>Score < br />{drawerRecipe.spoonacularScore}</h3>
                        </div>
                    </div>
                    <div className='open'>
                        <div className='description'>
                            <h2>Description</h2>
                            <h3>{ ReactHtmlParser(drawerRecipe.description) }</h3>
                        </div>
                    </div>
                </div>
            </Drawer>
        <div className="search-content">
            <div className="search-header">
                <div onClick={() => {history('/cookbook')}}>
                    <BookOutlined style={{fontSize: '48px', color: 'coral', cursor: 'pointer', marginLeft: '3rem', marginTop: '1rem'}}/>
                </div>
                <h1 className="landing-title" style={{position: 'relative'}}>Reciplease</h1>
                <div onClick={logout}>
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

const mapStateToProps = state => ({
    username: state.username,
    email: state.email
})

export default connect(mapStateToProps)(Search)