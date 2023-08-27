import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/story/Categories/Categories";
import Stories from "../components/story/StoryList/StoryList.jsx";
import { getStoriesByCategory,getStories,getStoriesByUser } from "../components/story/storyAPI";
import { categories } from "../constants";
import Loader from "../components/common/Loader/Loader";
import { endRequest } from "../components/story/storySlice";


const Home = () => {
  const dispatch = useDispatch();

 const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const [category, setCategory] = useState("All");
  const { storiesLoading ,categoryLoading ,newStory,userStories,userStoriesPage,newLike} = useSelector((state) => state.story);

  useEffect(() => {
if(category!=='All'){
  dispatch(getStoriesByCategory(category, 1));
}
else{
  dispatch(getStories(1));
}


  }, []);

  useEffect(() => {
if(category!=='All'){
  dispatch(getStoriesByCategory(category, 1));
}else{
  dispatch(getStories(1));
}
  
  }, [category]);


  useEffect(() => {
    if (newStory) {
      dispatch(getStories(1));

      dispatch(getStoriesByUser(userId, userStoriesPage));
      dispatch(endRequest())
    }
    console.log('New Story: ', newStory);
  }, [newStory]);


  useEffect(() => {
    if(newLike){
      dispatch(endRequest())
    }
  }, [newLike]);

  const handleCategoryClick = (category) => {
    setCategory(category);

  };

   
  return (
    <>
      <Categories
        categories={categories}
        handleCategoryClick={handleCategoryClick}
        selectedCategory={category}
      />
      {!storiesLoading && <Stories category={category} />}
      {storiesLoading && <Loader></Loader>}
      {categoryLoading && <Loader></Loader>}
      
    </>
  );
};

export default Home;
