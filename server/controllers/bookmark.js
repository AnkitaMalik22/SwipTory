const User = require("../models/userModel");
const Story = require("../models/storyModel");

const bookmarkStory = async (req, res) => {
  try {
    let storyId = req.params.id;
    const { userId } = req.body;


//  get user and story
    const user = await User.findById(userId);
    const story = await Story.findById(storyId);

// return error if user or story not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

// return error if story already bookmarked
    if (user.bookmarks.includes(storyId)) {
      return res
        .status(400)
        .json({ message: "Story already bookmarked", bookmarked: true });
    }



    // Add the story to the user's bookmarks | user bookmarked story
    user.bookmarks.push(storyId);
    await user.save();

    // Add the user to the story's bookmarks | story bookmarked by 
    story.bookmarks.push(userId);
    await story.save();

    res.status(200).json({
      message: "Story bookmarked successfully",
      bookmarks: user.bookmarks,
      bookmarked: true,
      story,
    });
  } catch (error) {

    res.status(500).json({ message: "Error bookmarking story", error: error.message });
  }

};




// ================================================= FETCH  BOOKMARKS =================================================

const getAllBookmarks = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   //  get all stories bookmarked by user
    const bookmarks = await Story.find({ _id: { $in: user.bookmarks } }).sort({
      createdAt: -1,
    });

    res.status(200).json({ bookmarks });

  } catch (error) {
    res.status(500).json({ message: "Error retrieving bookmarks", error });
  }
};


const removeBookmark = async (req, res) => {};

module.exports = {
  bookmarkStory,
  getAllBookmarks,
};
