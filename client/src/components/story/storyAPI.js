import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createStoryRequest,
  createStorySuccess,
  createStoryFailure,
  getStoriesRequest,
  getStoriesSuccess,
  getStoriesFailure,
  getBookmarksRequest,
  getBookmarksSuccess,
  getBookmarksFailure,
  fetchStoryRequest,
  fetchStorySuccess,
  fetchStoryFailure,
  bookmarkRequest,
  bookmarkSuccess,
  bookmarkFailure,
  likeSuccess,
  likeFailure,
  getStoryByUserRequest,
  getStoryByUserSuccess,
  getStoryByUserFailure,
  getCategoryStoriesSuccess,
  getCategoryStoriesFailure,
  getCategoryStoriesRequest,
} from "./storySlice.js";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
axios.defaults.withCredentials = true;

// ================================================= CREATE STORY =================================================

export const createStory = (values) => async (dispatch) => {
  try {
    dispatch(createStoryRequest());
    const { data } = await axios.post("/api/story/create", values);
    dispatch(createStorySuccess(data));
    toast.success("Story created successfully", { position: "top-center" });
  } catch (error) {
    dispatch(createStoryFailure());
    toast.error(error.response.data, { position: "top-center" });
  }
};

// ================================================= FETCH STORIES =================================================

export const getStories = (page, catLimit, cat) => async (dispatch) => {
  try {
    if (page === null) {
      page = 1;
    }
    if (catLimit === null) {
      catLimit = 4;
    }
    if (cat === null) {
      cat = "All";
    }
    dispatch(getStoriesRequest());
    const { data } = await axios.get(
      `/api/story/getAll?category=All&page=${page}&catLimit=${catLimit}&cat=${cat}`
    );
    console.log(data);
    dispatch(getStoriesSuccess(data));
  } catch (error) {
    dispatch(getStoriesFailure());

    toast.error(error.response.data);
  }
};

// ====================================================== FETCH STORY =====================================================

export const getStory = (storyId, userId) => async (dispatch) => {
  try {
    dispatch(fetchStoryRequest());
    if (userId == null) {
      //get story for not authenicated users
      const { data } = await axios.get(`/api/story/getById/${storyId}`);
      dispatch(fetchStorySuccess(data));
    } else {
      // get story for authenticated users to check liked/bookmarked or not
      const { data } = await axios.get(
        `/api/story/getById/${storyId}?userId=${userId}`
      );
      dispatch(fetchStorySuccess(data));
    }
  } catch (error) {
    dispatch(fetchStoryFailure());
    toast.error(error);
  }
};

// ================================================={ FETCH STORY | USER   }=================================================

export const getStoriesByUser =
  (userId, userStoriesPage) => async (dispatch) => {
    try {
      if (userStoriesPage === null) {
        userStoriesPage = 1;
      }
      dispatch(getStoryByUserRequest());
      const { data } = await axios.get(
        `/api/story/getAll?userId=${userId}&page=${userStoriesPage}`
      );
      dispatch(getStoryByUserSuccess(data));
    } catch (error) {
      dispatch(getStoryByUserFailure());
      toast.error(error.response.data);
    }
  };

// ================================================={ FETCH STORY | CATEGORY  }=================================================

export const getStoriesByCategory = (category, page) => async (dispatch) => {
  try {
    if (page === null) {
      page = 1;
    }
    dispatch(getCategoryStoriesRequest());
    const { data } = await axios.get(
      `/api/story/getAll?category=${category}&page=${page}`
    );
    dispatch(getCategoryStoriesSuccess(data));
  } catch (error) {
    console.log("error", error);
    dispatch(getCategoryStoriesFailure());
    toast.error(error.response.data);
  }
};

// ================================================= LIKE STORY =====================================================

export const likeStory = (id, userId) => async (dispatch) => {
  try {
    // dispatch(likeRequest());
    const data = await axios.put(`/api/story/like/${id}`, { userId: userId });
    console.log("data", data);
    dispatch(likeSuccess(data.story));
    toast.success("Story liked successfully", { position: "top-center" });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(likeFailure());
    toast.error(error.response.data.message, { position: "top-center" });
  }
};

// export const unlikeStory = (id) => async (dispatch) => {
//   try {
//     const { data } = await axios.post(`/api/story/${id}/unlike`);
//     toast.success("Story unliked successfully", { position: "top-center" });
//   } catch (error) {
//     toast.error(error.response.data);
//   }
// };

// ================================================= FETCH  BOOKMARKS =================================================

export const getBookmarks = (userId) => async (dispatch) => {
  try {
    dispatch(getBookmarksRequest());
    const { data } = await axios.get(`/api/user/bookmarks/${userId}`);
    dispatch(getBookmarksSuccess(data.bookmarks));
  } catch (error) {
    dispatch(getBookmarksFailure());
    toast.error(error.response.data);
  }
};

// ================================================= BOOKMARK STORY =================================================

export const bookmarkStory = (id, userId) => async (dispatch) => {
  try {
    dispatch(bookmarkRequest());
    const { data } = await axios.post(`/api/user/bookmark/${id}`, {
      userId: userId,
    });
    dispatch(bookmarkSuccess(data.story));
    toast.success("Story bookmarked successfully", { position: "top-center" });
  } catch (error) {
    dispatch(bookmarkFailure());
    toast.error(error.response.data.message, { position: "top-center" });
  }
};
//________________________________________________________________________________________________________________________________________
