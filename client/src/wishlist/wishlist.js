import React, { Component } from 'react';
import './wishlist.js';
import ProductCondensed from '../product-condensed/product-condensed';
import DataService from '../services/data-service';
import NotificationService from '../services/notification-service';

class WishList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wishList: [
                {
                    title: "Bologna Killer",
                    price: 23.99,
                    _id: "sdlfkj2k3"
                },
                {
                    title: "Bologna Killer",
                    price: 23.99,
                    _id: "aslkdjal"
                },
                {
                    title: "Bologna Killer",
                    price: 23.99,
                    _id: "s1233asdf"
                }
            ]
        }
        //Bind functions
        this.createWishList = this.createWishList.bind(this);
    }

    createWishList = () => {
        const list = this.state.wishList.map((product) =>
            <ProductCondensed product={product} key={product._id} />
        );

        return (list);
    }

    render() {
        return (
            <div className='card'>
                <div className='card-block'>
                    <h4 className='card-title'>Wish List</h4>
                    <ul className='list-group'>
                        {this.createWishList()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default WishList;

