import React from "react";
import {moviesData} from "../moviesData"
import MovieItem from "./MovieItem";



export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: moviesData,

        }
        //если у нас  removeMovies (movie) {} то используем
        // this.removeMovies=this.removeMovies.bind(this);
        //но мы применяем стрелочную функцию
    }

    removeMovies = (movie) => {
        const updateMovies = this.state.movies.filter((item) => {
                return item.id !== movie.id
            }
        )
        this.setState({
            movies: updateMovies
        });
    }

    render() {
        return (<div>
            {this.state.movies.map(movie => {
                return <MovieItem
                    key={movie.id}
                    movie={movie}
                    removeMovies={this.removeMovies}
                />
            })}
        </div>)
    }


};

