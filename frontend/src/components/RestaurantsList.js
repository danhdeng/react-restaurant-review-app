import React, {useEffect, useState} from 'react'

import RestaurantDataService from "../services/restaurant";
import {Link} from "react-router-dom";
import Bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from 'react-bootstrap';


export default function RestaurantsList() {
    const [restaurants, setRestaurants] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchZip, setSearchZip] = useState("");
    const [searchCuisine, setSearchCuisine] = useState("");
    const [cuisines, setCuisines] = useState(["ALl Cuisines"]);

    useEffect(() => {
       retrieveRestaurants();
       retrieveCuisines();
    }, []);

    const onChangeSearchName=e=>setSearchName(e.target.value);
    const onChangeSearchZip=e=>setSearchZip(e.target.value);
    const onChangeSearchCuisine=e=>setSearchCuisine(e.target.value);
    
    const retrieveRestaurants=()=>{
        RestaurantDataService.getAll()
            .then(response=>{
                console.log(response.data);
                setRestaurants(response.data.restaurants);
            })
            .catch(
                e=>{
                    console.log(e);
                }
            );
    }

    const retrieveCuisines=()=>{
        RestaurantDataService.getCuisines()
            .then(response=>{
                console.log(response.data);
                setCuisines(["All Cuisines"].concat(response.data));
            })
            .catch(
                e=>{
                    console.log(e);
                }
            );
    }

    const refreshList=()=>{
        retrieveRestaurants();
    }

    const find=(query, by)=>{
        RestaurantDataService.find(query, by)
            .then(response=>{
                console.log(response.data);
                setRestaurants(response.data.restaurants);
            })
            .catch(
                e=>{
                    console.log(e);
                }
            );
    }

    const findByName=()=>{
        find(searchName, "name");
    }

    const findByZip=()=>{
        find(searchZip, "zipcode");
    }

    const findByCuisine=()=>{
        if(searchCuisine==="All Cuisines"){
            refreshList();
        }else{
            find(searchCuisine, "cuisine");
        }
    }

    return (
        <div>
            {/* Search Area */}
            <div className="row">
                <Container><Row><Col>
                {/* Search By Name */}
                <div className="input-group col-md-4">
                    <input 
                        type="text"
                        className="form-control input-sm"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary"
                            type="button" onClick={findByName}>
                                search
                        </button>
                    </div>
                </div>
                </Col>
                {/* End Search By Name */}

                {/* Search By Zip */}
                <Col>
                <div className="input-group col-md-4">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="search by zip"
                        value={searchZip}
                        onChange={onChangeSearchZip}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByZip}
                        >
                            search
                        </button>
                    </div>
                </div>
                </Col>
                {/* Endc Search By Zip */}
                {/* select cuisine */}
                <Col>
                <div className="input-group col-md-4">
                    <select onChange={onChangeSearchCuisine}>
                        {cuisines.map((cuisine, index)=>{
                            return(
                                <option value={cuisine} key={index}>{cuisine.substr(0,20)}</option>
                            )
                        })

                        }
                    </select>
                    <div className="input-group-append">
                    <button className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByCuisine}
                    >
                        Search
                    </button>
                </div>
                </div>
                </Col>
                  {/* end select cuisine */}
                  </Row>
             </Container>
            </div>
            {/* end Search Area */}

            {/* Restaurant List View */}
            <div className="row">
                {restaurants.map((restaurant)=>{
                    const address =`${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}`;
                    return (
                        <div className="col-lg-4 pb-1" key={restaurant._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-context">
                                        <strong>Cuisine:</strong> {restaurant.cuisine} <br />
                                        <strong>Address:</strong> {address}
                                    </p>
                                    <div className="row">
                                        <Link to={`/restaurants/${restaurant._id}`} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            View Reviews
                                        </Link>
                                        <a target="_blank" href={`http://www.google.com/maps/place/${address}`} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            View Map
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })

                }

            </div>
             {/* End Restaurant List View */}
        </div>
    )
}
