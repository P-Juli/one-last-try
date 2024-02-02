"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
const Piechart = () => {
  const [categories, setCategories] = useState([]); // contains all the available categories
  const [numberofproducts, setNumberOfProducts] = useState([]); // total number of products.
  // fetching the categories and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategories = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const dataCategories = await responseCategories.json();
        if (responseCategories.ok) {
          setCategories(dataCategories);
          const productCounts = [];
          for (const category of dataCategories) {
            // for (const category of categories) {
            const responseCategory = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );
            const dataCategory = await responseCategory.json();
            if (responseCategory.ok) {
              productCounts.push(dataCategory.total);
            } else {
              productCounts.push(0);
            }
          }
          setNumberOfProducts(productCounts);
        } else {
          console.error("Error fetching categories:", dataCategories);
        }
      } catch (error) {
        console.error("Error :", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Pie chart of product count per category</h1>
      <h6>(This may take a few seconds ......)</h6>
      <Pie
        data={{
          labels: categories,
          datasets: [
            {
              data: numberofproducts,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </>
  );
};
export default Piechart;
