import React, {useEffect, useState} from 'react';
import RestaurantDataService from "../services/restaurant";
import {Link} from "react-router-dom";


export default function Restaurant(props) {
    const initialRestaurantState={
        id: null,
        name: "",
        address:{},
        cuisine: "",
        reviews: []
    }
    const [restaurant, setRestaurant]=useState(initialRestaurantState);

    const getRestaurantById=id=>{
        RestaurantDataService.get(id)
            .then(response=>{
                setRestaurant(response.data);
                console.log(response.data)
            })
            .catch(e=>{
                console.log(e);
            });
    };

    useEffect(() => {
       getRestaurantById(props.match.params.id);
    }, [props.match.params.id])

    const deleteReview=(reviewId, index)=>{
        RestaurantDataService.deleteReview(reviewId, props.user.id)
            .then(response=>{
                setRestaurant((prevState)=>{
                    prevState.reviews.splice(index, 1);
                    return ({
                            ...prevState
                    })
                })
            })
            .catch(e=>{
                console.log(e)
            })
    }

    return (
        <div>
            {restaurant ? (
                <>
                <div>
                    <h5>{restaurant.name}</h5>
                    <p>
                        <strong>Cuisine:</strong> {restaurant.cuisine} <br />
                        <strong>Address:</strong>  {restaurant.address.building} {restaurant.address.street} {restaurant.address.zipcode}
                    </p>
                </div>
                <Link to={`/restaurants/${props.match.params.id}/review`} className="btn btn-primary">
                    Add Review
                </Link>
                <h4>Reviews</h4>
                <div className="row">
                    {restaurant.reviews.length >0 && 
                        restaurant.reviews.map((review, index)=>{
                            return (
                                <div className="col-lg-4 pb-1" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text">
                                            <strong>User:</strong> {review.name} <br />
                                            <strong>Date:</strong> {review.date} <br />
                                            <strong>Review:</strong> {review.text} 
                                            </p>
                                            {props.user && props.user.id===review.user_id &&
                                                <div className="row">
                                                    <a onClick={()=>deleteReview(review._id, index)} className="btn btn-priarmy col-lg-5 mx-1 mb-1">Delete</a>
                                                    <Link to={{
                                                        pathname: `/restaurants/${props.match.params.id}/review`,
                                                        state:{
                                                            currentReview: review
                                                        }
                                                    }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                </>
            ) : (
                <div>
                    <br />
                    <p>No restaurant selected.</p>
                </div>
            )
        } 
        </div>
    )
}
