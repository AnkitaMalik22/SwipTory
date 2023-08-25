import React, { useEffect } from "react";
import styles from "./StoryDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../common/Modal/modalSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { likeStory, bookmarkStory, getStory } from "../storyAPI";
import StorySlider from "../StorySlider/StorySlider";
import Loader from "../../common/Loader/Loader";
import shareIcon from "../../../assets/share.svg";

const ViewStory = () => {
  const dispatch = useDispatch();
  const { story, storyLoading, liked, bookmarked, totalLikes, newLike } = useSelector((state) => state.story);

  const { isAuthenticated, userId, loading } = useSelector( (state) => state.auth);

  const { id } = useParams();
  const storyId = id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      handleFetchStory();
    }
    dispatch(openModal("VIEW_STORY"));
    return () => dispatch(closeModal());
  }, [isAuthenticated, dispatch, loading]);

  const handleFetchStory = async () => {
    dispatch(getStory(storyId, userId));
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate("/");
      dispatch(openModal("LOGIN"));
    } else {
      dispatch(likeStory(storyId, userId));
    }
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      navigate("/");
      dispatch(openModal("LOGIN"));
    } else {
      dispatch(bookmarkStory(storyId, userId));
    }
  };

  const handleShareStory = () => {
    const url = window.location.href;
    window.navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Copied to clipboard successfully!", {
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error("Failed to copy to clipboard:", { position: "top-center" });
      });
  };

  if (storyLoading || loading) {
    return <Loader></Loader>;
  }

  return (
    <div className={`${styles.view_story_container}`}>
      <div className={`${styles.view_story} `}>

        <div className={`${styles.story_btns} ${styles.story_btns_1}`}>
          {/* --------------------------CLOSE STORY  ICON ------------------------------- */}

          <div className={styles.close_btn} onClick={() => navigate("/")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 17L-1 -1M17 -1L-1 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* -------------------------- SHARE ICON ------------------------------------- */}

          <div className={styles.share_btn} onClick={handleShareStory}>
            <img src={shareIcon} alt="share" />
          </div>
        </div>

        {/* ------------------------------------------- | STORY IMAGE SLIDER | ------------------------------------------- */}

        <StorySlider slides={story && story.slides} />

        {/* -------------------------------------------------------------------------------------------------------------- */}

        <div className={`${styles.story_btns} ${styles.story_btns_2}`}>
          {/* --------------------------BOOKMARK ICON -------------------------- */}
          <div className={styles.bookmark}>
            <svg
              onClick={() => handleBookmark()}
              width="20"
              height="25"
              viewBox="0 0 20 25"
              fill={bookmarked ? "blue" : "white"}
              xmlns="http://www.w3.org/2000/svg"
              key={bookmarked ? "bookmarked" : "not-bookmarked"}
            >
              <path
                d="M19.1795 24.5071L9.58974 17.3148L0 24.5071V0H19.1795V24.5071Z"
                fill={bookmarked ? "blue" : "white"}
              />
            </svg>
          </div>
          {/* --------------------------LIKE ICON ------------------------------- */}
          <div className={styles.like}>
            <svg
              onClick={() => handleLike()}
              width="36"
              height="27"
              viewBox="0 0 36 27"
              fill={liked ? "red" : "white"}
              xmlns="http://www.w3.org/2000/svg"
              key={liked ? "liked" : "not-liked"}
            >
              <path
                d="M14.207 26.0699L12.147 24.1946C4.83039 17.5599 0 13.1699 0 7.81387C0 3.42389 3.4381 0 7.81386 0C10.2859 0 12.6585 1.15077 14.207 2.95506C15.7556 1.15077 18.1282 0 20.6002 0C24.976 0 28.4141 3.42389 28.4141 7.81387C28.4141 13.1699 23.5837 17.5599 16.267 24.1946L14.207 26.0699Z"
                fill={liked ? "red" : "white"}
              />
            </svg>
            <p className={styles.totalLikes}>
              {story && console.log(story.likes.length)}
              {totalLikes + (newLike ? 1 : 0)}
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ViewStory;
