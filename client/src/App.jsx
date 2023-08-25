import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { REGISTER, ADD_STORY, EDIT_STORY, LOGIN } from "./constants";
import { loadUser } from "./components/auth/authAPI";

import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks.jsx";
import Loader from "./components/common/Loader/Loader";
import UserStories from "./pages/UserStories";
import Auth from "./components/auth/Auth";
import Navbar from "./components/common/Navbar/Navbar";
import Modal from "./components/common/Modal/Modal.jsx";
import NotFound from "./components/common/NotFound/NotFound";
import AddStory from "./components/story/StoryForm/StoryAdd.jsx";
import EditStory from "./components/story/StoryForm/StoryEdit.jsx";
import ViewStory from "./components/story/StoryDetail/StoryDetail.jsx";

const App = () => {
  const dispatch = useDispatch();
  const { modalContent } = useSelector((state) => state.modal);
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <>
      <Navbar />

      {modalContent === REGISTER && (
        <Modal>
          <Auth />
        </Modal>
      )}
      {modalContent === LOGIN && (
        <Modal>
          <Auth />
        </Modal>
      )}
      {modalContent === ADD_STORY && (
        <Modal>
          <AddStory />
        </Modal>
      )}
      {modalContent === EDIT_STORY && (
        <Modal>
          <EditStory />
        </Modal>
      )}

      <ToastContainer></ToastContainer>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/story/:id"
          element={
            <Modal>
              <ViewStory />
            </Modal>
          }
        />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/my/stories" element={<UserStories />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
