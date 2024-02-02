'use client'
import React, { useState } from 'react'
import Modal from './modal';
import './product.css'
const Product = (props) => {

    const[showDetails,setShowDetails]= useState(false)
    const handleShowDetails = () => {
      setShowDetails(true)
    }
    
    return (
      <div className="product-container">
        <div className="product-image">
          <img src={props.product.thumbnail} alt={props.product.title} />
        </div>
        <div className="product-info">
          <h2>Product Details:</h2>
          <p>{props.product.title}</p>
          <p>Price: ${props.product.price}</p>
          <p>Discount Percentage: {props.product.discountPercentage}%</p>
          <p>Rating: {props.product.rating}</p>
          <p>Stock: {props.product.stock}</p>
          <p>Brand: {props.product.brand}</p>
          <p>Category: {props.product.category}</p>
          <button onClick={handleShowDetails}>Show More Details</button>

          {showDetails && <Modal setShowDetails={setShowDetails}> 
            <h2>{props.product.description}</h2>
            <div className="image-container">
              {props.product.images.map((image, index) => (
                <img key={index} src={image} alt={`Product Image ${index + 1}`} />
              ))}
            </div>
            </Modal>}
        </div>
      </div>
    )
  };
export default Product
