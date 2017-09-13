import React from 'react';
import { graphql } from 'react-apollo';

import cart from 'src/graphql/queries/cart.gql';
import removeFromCart from 'src/graphql/queries/remove_from_cart.gql';

import css from './cart.scss';


@graphql(cart)
@graphql(removeFromCart)

export default class Cart extends React.PureComponent {
  static defaultProps = {
    data: {
      cartList: [],
    },
  }
  // Refetches the cart list to keep it updated
  componentDidMount() {
    if (this.props.data.cartList) {
      this.props.data.refetch();
    }
  }
  // Triggers the mutation to remove product from cart
  removeItemFromCart = (id) => {
    this.props.mutate({ variables: { id } })
      .then((resp) => {
        console.log('Added to cart', resp);
        this.props.data.refetch()
      });
  }
  renderProductTiles = () => {
    const reference = this;
    return (this.props.data.cartList.length > 0 ?
      this.props.data.cartList.map((item, index) => {
        const url = require(`../main/images/${item.imageUrl}`);
        return <div key={index} className={css.cartItem}>
          <img className={css.cartImage} src={url} alt={item.name} height="200" width="200"/>
          <div className={css.cartBlock}>
            <h4 className="card-title">NAME:{item.name}</h4>
            <p className="card-text">{item.description}</p>
            <button className="btn btn-primary" onClick={() => reference.removeItemFromCart(item._id)}>Remove
            </button>
          </div>
        </div>
      }):<div>Your cart is empty.</div>
    );
  };
  render() {
    return (
      this.props.data.loading?<div>Loading...</div>:
        <div className={`flex-row row ${css.productContainer}`}>
          {this.renderProductTiles()}
        </div>
    );
  };
}

