import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import addToCart from 'src/graphql/queries/add_to_cart.gql';

import css from './gridwall.scss';


@connect(state => ({ productList: state.productList }))
@graphql(addToCart)
export default class GridWall extends React.PureComponent {
  static defaultProps = {
    productList: [],
  }
  /**
   * @name addToCart
   * @desc Triggers the mutation to add product to cart
   * @param product {Object}
   */
  addToCart = (product) => {
    this.props.mutate({ variables: product})
      .then((resp) => {
        console.log('Added to cart', resp);
      });
  }
  /*
   * @name renderProductTiles
   * @desc Iterates over the product list and renders the product tiles
   */
  renderProductTiles = () => {
    const reference = this;
    return this.props.productList.map(function(item, index) {
      const url = require(`../main/images/${item.imageUrl}`);
      return <div className={`card col-xs-6 col-sm-6 col-md-4 col-lg-3 ${css.productTile}`} key={index}>
        <img className="card-img-top" src={url} alt={item.name} />
        <div className="card-block">
          <h4 className="card-title">{item.name}</h4>
          {
            item.discountPrice?<p className="card-text">Discounted Price: {item.discountPrice}</p>
              :<p className="card-text">Price: {item.price}</p>
          }
        </div>
        <button className="btn btn-primary" onClick={() => {reference.addToCart(item)}}>
          Add to cart
        </button>
      </div>;
    });
  };
  render() {
    return (
      <div className={`flex-row row ${css.productContainer}`}>
        {this.renderProductTiles()}
      </div>
    );
  };
}

