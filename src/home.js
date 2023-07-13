import { useEffect, useState } from "react";
import axios from 'axios';
import "./home.css"

const Home = ({ userID, username }) => {
    const [recipes, setRecipes] = useState(null);
    useEffect(() => {
        axios.post('http://localhost:3001/recipes')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err.message)
            })
    })
    return (
        <div className="home">
            <div className="welcome_user">Welcome To YumYum <span>{username}</span></div>
            <div className="welcome_phrase">Place to find all mouthwatering recipes</div>

            <form className="search_form">
                <div>
                    <input type="search" placeholder="Search recipe" />
                </div>
            </form>

            <div className="popular">
                <div className="popular_title">Popular Recipes</div>

                <div className="popular_recipes">
                    <div className="recipe">recipe name</div>
                    <div className="recipe">recipe name</div>
                    <div className="recipe">recipe name</div>
                    <div className="recipe">recipe name</div>
                </div>
            </div>
        </div>
    );
}

export default Home;