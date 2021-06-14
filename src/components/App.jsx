import React from "react";
import {moviesData} from "../moviesData"
import MovieItem from "./MovieItem";



export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: moviesData,
            moviesWillWatch: []

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
        })
    }
    removeMoviesFromWillWatch = (movie) => {
        const updateMoviesWillWatch = this.state.moviesWillWatch.filter((item) => {
                return item.id !== movie.id
            }
        )
        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        })
    }


    addMovieToWillWatch = (movie) => {
        // console.log(movie)
        const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];
        //ES6
        // updateMoviesWillWatch.push(movie)
        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        })
    }

    render() {
        return (<div className='container'>
            <div className="row">
                <div className="col-9">
                    <div className="row">
                        {this.state.movies.map(movie => {
                            return (<div className='col-6 mb-4' key={movie.id}>
                                <MovieItem
                                    movie={movie}
                                    removeMovies={this.removeMovies}
                                    removeMoviesFromWillWatch={this.removeMoviesFromWillWatch}
                                    addMovieToWillWatch={this.addMovieToWillWatch}
                                />
                            </div>)
                        })}
                    </div>
                </div>
                <div className="col-3">

                    <p> Will watch: {this.state.moviesWillWatch.length}</p>
                </div>
            </div>

        </div>)
    }


};

