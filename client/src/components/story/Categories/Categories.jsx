import React from "react";
import styles from "./Categories.module.css";
import foodImg from "../../../assets/categories/food.jpg";
import healthImg from "../../../assets/categories/health.jpg";
import travelImg from "../../../assets/categories/travel.jpg";
import movieImg from "../../../assets/categories/movie.jpg";
import educationImg from "../../../assets/categories/education.jpg";
import allImg from "../../../assets/categories/all.jpg";

const Categories = ({ handleCategoryClick, categories, selectedCategory }) => {
  const images = {
    food: foodImg,
    health: healthImg,
    travel: travelImg,
    movie: movieImg,
    education: educationImg,
  };

  return (
    <div className={styles.categories}>
      <div
        className={styles.category}
        onClick={() => handleCategoryClick("All")}
        style={{
          backgroundImage: `linear-gradient(#00000099, #00000099),url(${allImg})`,
          border: "All" === selectedCategory ? "0.3rem solid #73abff" : "none",
        }}
      >
        <h3 className={styles.categoryName}>All</h3>
      </div>

      {categories &&
        categories.map((category, index) => (
          <div
            className={styles.category}
            key={index}
            onClick={() => handleCategoryClick(category)}
            style={{
              backgroundImage: `linear-gradient(#00000099, #00000099),${
                category === "food"
                  ? `url(${images.food})`
                  : category === "travel"
                  ? `url(${images.travel})`
                  : category === "movie"
                  ? `url(${images.movie})`
                  : category === "education"
                  ? `url(${images.education})`
                  : `url(${images.health})`
              }`,
              border:
                category === selectedCategory ? "0.3rem solid #73abff" : "none",
            }}
          >
            <h3 className={styles.categoryName}>{category}</h3>
          </div>
        ))}
    </div>
  );
};

export default Categories;
