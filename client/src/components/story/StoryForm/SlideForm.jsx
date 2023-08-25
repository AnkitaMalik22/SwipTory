import React from "react";
import styles from "./StoryForm.module.css";

import { categories } from "../../../constants";

const SlideForm = ({ slide, slideIndex, handleChange }) => {
  return (
    <div className={styles.slideForm}>
       {/* <div className={styles.slideForm__remove}>
      {slideIndex > 2 && <svg
        className={styles.slide_remove}
        onClick={() => handleRemoveSlide(slideIndex)}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0C5.38341 0 0 5.38341 0 12C0 18.6166 5.38341 24 12 24C18.6166 24 24 18.6166 24 12C24 5.38341 18.6166 0 12 0ZM12 1.84615C17.6178 1.84615 22.1538 6.38221 22.1538 12C22.1538 17.6178 17.6178 22.1538 12 22.1538C6.38221 22.1538 1.84615 17.6178 1.84615 12C1.84615 6.38221 6.38221 1.84615 12 1.84615ZM8.50962 7.18269L7.18269 8.50962L10.6731 12L7.18269 15.4904L8.50962 16.8173L12 13.3269L15.4904 16.8173L16.8173 15.4904L13.3269 12L16.8173 8.50962L15.4904 7.18269L12 10.6731L8.50962 7.18269Z"
          fill="#FF0000"
        />
      </svg>}

        </div> */}
      <div className={styles.slideForm__content}>
        <div className={styles.input_container}>
          <label className={styles.slideForm__label}>Heading : </label>
          <input
            className={styles.slideForm__input}
            type="text"
            name={`heading`}
            value={slide.heading}
            placeholder="Your Heading"
            onChange={(e) => handleChange(e, slideIndex)}
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.slideForm__label}>Description : </label>
          <input
            className={styles.slideForm__input}
            type="text"
            name={`description`}
            value={slide.description}
            placeholder="Story Description"
            onChange={(e) => handleChange(e, slideIndex)}
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.slideForm__label}>Image URL : </label>
          <input
            className={styles.slideForm__input}
            type="text"
            name={`imageUrl`}
            value={slide.imageUrl}
            placeholder="Add Image URL"
            onChange={(e) => handleChange(e, slideIndex)}
          />
        </div>

        <div className={styles.input_container}>
          <label className={styles.slideForm__label}>Category : </label>

          <select
            className={styles.slideForm__input}
            name="category"
            onChange={(e) => handleChange(e, slideIndex)}
            value={slide.category}
          >
            <option value="" style={{color: '#847c7c'}}>Select Category</option>
            {categories.map((category) => (
              <option key={category + slideIndex} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
            </div>
  );
};

export default SlideForm;
