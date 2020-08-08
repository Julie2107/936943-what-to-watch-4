import NameSpace from "../name-space";
import {getGenresList} from "../../utils";

export const getMovies = (state) => state[NameSpace.DATA].movies;

export const getPromoMovie = (state) => state[NameSpace.DATA].promoMovie;

export const getGenres = (state) => getGenresList(getMovies(state));

export const getLoadingState = (state) => state[NameSpace.DATA].isLoading;

export const getErrorStatus = (state) => state[NameSpace.DATA].isError;

export const getReviews = (state) => state[NameSpace.DATA].reviews;
