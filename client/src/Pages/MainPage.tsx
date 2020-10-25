import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Filtermenu from "../components/Filtermenu/Filtermenu";
import "../App.css";
// import {RestaurantList} from '../components/RestaurantList/RestaurantList';
import Restaurants from '../components/RestaurantList/Restaurants';
import Pagination from '../components/Pagination/Pagination';
import Searchbar from "../components/Searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../store/ducks/restaurantDuck";

function MainPage() {

  const dispatch = useDispatch()
  const restaurant = useSelector((state: any)  => state.restaurant)
  const filter = useSelector((state: any)  => state.filter)
  const search = useSelector((state: any)  => state.search)
  const sortBy = useSelector((state: any)  => state.sorting)


  useEffect(() => {
    dispatch(
        fetchRestaurants(0, filter, search, sortBy.sortBy, sortBy.ascending)
    );
}, [fetchRestaurants])


  return (
    <div className="App">
      <Header></Header>
      <section id="search" className="section section-search #b2ebf2 cyan lighten-4">       
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h5>Search restaurants:</h5>
                        <Searchbar></Searchbar>
                    </div>
                </div>
            </div>
        </section>
      <div className="content">
          <Filtermenu></Filtermenu>
          <div className="container">
            {/* <RestaurantList></RestaurantList> */}
            <Restaurants></Restaurants>
            <Pagination></Pagination>
          </div>
      </div>
    </div>
  );
}

export default MainPage;
