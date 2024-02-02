"use client";
/*
atuny0
9uQFF1Lh
*/
import React, { useEffect, useState } from "react";
import Product from "./product";
import "./products.css";
import Categories from "./categories";
import Piechart from "./piechart";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); //page no 1 ie. 1-10

  const [categories, setCategories] = useState([]);
  const [hideProducts, setHideProducts] = useState(false);
  // this is used when we click the categories button.
  const [categoriesButtonClicked, setCategoriesButtonClicked] = useState(false);

  // my focus today is here.
  // we will use this to fetch all the products in that category.


  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log("what we selected is ",selectedCategory)
 
  //this state is for the categories product .
  const [categoryProducts, setCategoryProducts] = useState([]);//unused right now.

  // up to here

// pie chart state
const[showPieChart, setShowPieChart]=useState(false);
// pie chart state

  const [apiUrl, setApiUrl] = useState(
    `https://dummyjson.com/products?limit=10&skip=${pageNumber}`
  );
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${pageNumber}`);
      const data = await response.json();

      if (response.ok) {
        // setProducts((prev) => {
        //   return data.products;
        // });
        setProducts(data.products)
        console.log("hello", products);
      }
    };
    fetchData();
  // }, [pageNumber, apiUrl, hideProducts]);
}, [pageNumber,apiUrl,hideProducts]);

  // this hides the products mapping over and the buttons at the end.
  const showCategories = () => {
    setApiUrl((prev) => {
      return "https://dummyjson.com/products/categories";
    });
    setHideProducts(true);
    setCategoriesButtonClicked(false);
    setShowPieChart(false)

  };

  const showAllProductsButtonHandler = () => {
    setHideProducts(false);
    setShowPieChart(false)
    setApiUrl((prev) => {
      return `https://dummyjson.com/products?limit=10&skip=${pageNumber}`;
    });
  };

  // we are fetching the categories..........................
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();

      if (response.ok) {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);
  // up to here useEffect..............................

  // ..................................

  // we are fetching the categories product data here..............
  useEffect(() => {
    if (selectedCategory) {
      const fetchProductsByCategory = async () => {
        const response = await fetch(
          `https://dummyjson.com/products/category/${selectedCategory}`
        );
        const data = await response.json();

        if (response.ok) {
          setCategoryProducts(data.products);
        }
      };

      fetchProductsByCategory();
    }
  }, [selectedCategory]);

  // up to here .............................
// pie chart handler
const pieChartHandler = () => {
  // set state to shoe ie true
  setShowPieChart(true)
  setHideProducts(true)
  setCategoriesButtonClicked(true)
}

// pie chart handler


  return (
    <div className="products-container">
      <div className="user-info">
        <div className="user-header">
          <h2>Name: {props.name}</h2>
          <h2>Email: {props.email}</h2>
        </div>
        <h1>Happy Shopping</h1>
        <h4>Don't miss out on great deals</h4>

      </div>
      <button className="green-button" onClick={pieChartHandler}>Show Pie Chart</button>
      
      <button className="green-button"  onClick={showAllProductsButtonHandler}>
        Show all the products
      </button>
      
      <div className="categories">
        <button className="green-button"  onClick={showCategories}>Show All Categories</button>
        
      </div>
      
      
      

      {/* this is where we map over the products */}
      {/*  */}
      {/*  */}
      {!hideProducts && (
        <>
          <ol className="product-list">
            {products?.map((product) => (
              <li key={product.id}>
                <Product product={product} key={product.id} />
              </li>
            ))}
          </ol>
          <div className="buttons-container">
            <button className="button" onClick={() => setPageNumber(0)}>
              1-10
            </button>
            <button className="button" onClick={() => setPageNumber(10)}>
              11-20
            </button>
            <button className="button" onClick={() => setPageNumber(20)}>
              21-30
            </button>
            <button className="button" onClick={() => setPageNumber(30)}>
              31-40
            </button>
            <button className="button" onClick={() => setPageNumber(40)}>
              41-50
            </button>
            <button className="button" onClick={() => setPageNumber(50)}>
              51-60
            </button>
            <button className="button" onClick={() => setPageNumber(60)}>
              61-70
            </button>
            <button className="button" onClick={() => setPageNumber(70)}>
              71-80
            </button>
            <button className="button" onClick={() => setPageNumber(80)}>
              81-90
            </button>
            <button className="button" onClick={() => setPageNumber(90)}>
              91-100
            </button>
          </div>
        </>
      )}
      {/*  */}
      {/*  */}
      {/* up to here we are mapping */}

      {hideProducts && !categoriesButtonClicked && (
        <>
          <h3>The Categories of products we sell are:</h3>
          <ul >
            {categories?.map((category) => {
              return (
                <li key={category} className="categories ">
                  <Categories
                    category={category}
                    setSelectedCategory={setSelectedCategory}
                    setCategoriesButtonClicked={setCategoriesButtonClicked}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}


{/* we are rendering the products fron the category the user chooses */}
{categoryProducts.length > 0 && !categoriesButtonClicked && hideProducts && (
      <>
        <h3>Products in the selected category: {selectedCategory}</h3>
        <ol className="product-list">
          {categoryProducts.map((product) => (
            <li key={product.id}>
              <Product product={product} key={product.id} />
            </li>
          ))}
        </ol>
      </>
    )}
{/*we are rendering the products fron the category the user chooses   */}


{/* pie chart starts from here */}
{showPieChart && <Piechart/>}

{/* pie chart ends here */}
    </div>
  );
};

export default Products;