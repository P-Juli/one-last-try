"use client";
import React from "react";
import './categories.css'



const Categories = (props) => {
  const categorySelector = () => {
    props.setSelectedCategory(props.category);
    
   // props.setCategoriesButtonClicked(true)//this will hide the list of categories.
  };

  return (
    <>
      <button className="green-button"  onClick={categorySelector}>{props?.category}</button>
    </>
  );
};

export default Categories;
