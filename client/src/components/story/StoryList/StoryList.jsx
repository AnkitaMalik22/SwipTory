import React, { useEffect} from "react";
import styles from "./StoryList.module.css";
import Story from "../StoryCard/StoryCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getStories,
  getStoriesByCategory,
  getStoriesByUser,
} from "../storyAPI";
import StoryLoader from "../../common/Loader/StoryLoader";
import Button from "../../common/Button/Button";

const Stories = ({ category }) => {
  const dispatch = useDispatch();
  const {
    stories,
    categoryStories,
    userStories,
    newStory,
    userStoriesPage,
    categoryLoading,
    storiesLoading,
  } = useSelector((state) => state.story);
  const { isSmallScreen } = useSelector((state) => state.layout);
  let catLimit = {
    food: 4,
    travel: 4,
    health: 4,
    movie: 4,
    education: 4,
  };

  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const page = useSelector((state) => state.story.page) || 1;

  //  FETCH STORIES ON PAGE LOAD

  useEffect(() => {
    if (!stories && category === "All") {
      dispatch(getStories(page));
    }
    if (!stories && category !== "All") {
      dispatch(getStoriesByCategory(page));
    }
  }, []);

  //  IF NEWLY ADDED STORY, GET STORIES AGAIN

  useEffect(() => {
    if (newStory) {
      dispatch(getStories(page));
    }
  }, [newStory]);

  // GET MY STORIES IF USER IS AUTHENTICATED

  useEffect(() => {
    if (isAuthenticated && !userStories && userId) {
      dispatch(getStoriesByUser(userId, userStoriesPage));
    }
  }, [isAuthenticated, userId, userStories, userStoriesPage, dispatch]);

  // {============================================================{    RENDER STORIES  }================================================================}

  const renderStories = (storyArray, isLoading, pageFunction) => (
    <>
      <div
        className={`${styles.stories} ${
          isSmallScreen ? styles.stories_mob : ""
        }`}
      >
        {storyArray &&
          storyArray.map((story) =>
            isLoading ? (
              <StoryLoader />
            ) : (
              <Story key={story._id} story={story} />
            )
          )}
      </div>
      {storyArray && storyArray.length > 0 && (
        <div
          style={{
            width: "100%",
            display: "inline-flex",
            justifyContent: "center",
          }}
        >
          <Button text="See more..." myFunction={pageFunction}></Button>
        </div>
      )}
      {/* <pre>{JSON.stringify(storyArray.length, null, 2)}</pre> */}
    </>
  );

  // {============================================={    RENDER MY STORIES  | AUTHENTICATED USERS   }=====================================================}

  const renderUserStories = () => (
    <>
      {userStories && userStories.length > 0 && (
        <h2 className={styles.storiesHeading}>Your Stories</h2>
      )}
      {renderStories(userStories, false, () =>
        dispatch(getStoriesByUser(userId, userStoriesPage + 1))
      )}
    </>
  );

  return (
    <div className={styles.storiesContainer}>
      {category === "All" && (
        <>
          {/*-------------------------  MY STORIES ------------------------------- */}

          {isAuthenticated && renderUserStories()}

          {/*------------------------------  ALL STORIES ------------------------------ */}
          <>
            {Object.keys(stories).map(
              (key) =>
                stories[key].length > 0 && (
                  <div key={key}>
                    <h2 className={styles.storiesHeading}>
                      Top Stories About {key}
                    </h2>
                    {renderStories(stories[key], storiesLoading, () =>
                      Object.keys(catLimit).forEach((cat) => {
                        if (cat === key) {
                          catLimit[cat] = catLimit[cat] + 4;
                          dispatch(getStories(page + 1, catLimit[cat], cat));
                        }
                      })
                    )}
                  </div>
                )
            )}
          </>
        </>
      )}

      {/* -------------------------{ SELECTED CATEGORY STORIES } ---------------------------- */}

      {category !== "All" && (
        <div>
          <h2 className={styles.storiesHeading}>
            Top Stories About {category}
          </h2>
          {renderStories(categoryStories, categoryLoading, () =>
            dispatch(getStoriesByCategory(category, page + 1))
          )}
          {categoryStories.length <= 0 && (
            <h1 className={styles.no_story}>No stories found!</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Stories;
