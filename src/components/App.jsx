import React from "react";
import MovieItem from "./MovieItem";
import {API_KEY_3, API_URL} from "../utils/api";
import MoviesTabs from "./MoviesTabs";


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            moviesWillWatch: [],
            sort_by: 'popularity.desc'

        }
        //если у нас  removeMovies (movie) {} то используем
        // this.removeMovies=this.removeMovies.bind(this);
        //но мы применяем стрелочную функцию
        console.log('constructor')
    }

    componentDidMount() {
        this.getMovies();
    };

    componentDidUpdate(prevProps, prevState) {
        console.log('didUpdate');
        console.log('prevProps', prevProps, prevState);
        console.log('this', this.props, this.state);
        if (prevState.sort_by !== this.state.sort_by) {
            console.log('api');
            this.getMovies();
        }
    }

    getMovies = () => {
        const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`;
        fetch(link)
            .then(r => r.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    movies: data.results
                })
            })
    }

    removeMovies = (movie) => {
        // const updateMovies = this.state.movies.filter((item) => {
        //         return item.id !== movie.id
        //     }
        // )
        //аналогичное примеру выше
        const updateMovies = this.state.movies.filter(item => item.id !== movie.id)
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

    updateSortBy = value => {
        this.setState({
            sort_by: value
        })
    }

    render() {
        console.log('render')
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-9">
                        <div className="row mb-4">
                            <div className="row">
                                <div className="col-12">
                                    <MoviesTabs
                                        sort_by={this.state.sort_by}
                                        updateSortBy={this.updateSortBy}
                                    />
                                </div>
                            </div>

                            {this.state.movies.map(movie => {
                                return (<div className='col-6 mb-4' key={movie.id}>
                                    <MovieItem
                                        data={movie}
                                        removeMovies={this.removeMovies}
                                        removeMoviesFromWillWatch={this.removeMoviesFromWillWatch}
                                        addMovieToWillWatch={this.addMovieToWillWatch}
                                    />
                                </div>)
                            })}
                        </div>
                    </div>
                    <div className="col-3">
                        <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
                        <ul className="list-group">
                            {this.state.moviesWillWatch.map(movie => (
                                <li key={movie.id} className="list-group-item">
                                    <div className="d-flex justify-content-between">
                                        <p>{movie.title}</p>
                                        <p>{movie.vote_average}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>)
    }
};

