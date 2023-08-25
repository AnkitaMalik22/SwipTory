const Story = require("../models/storyModel");
const User = require("../models/userModel");

const likeStory = async (req, res) => {
  const storyId = req.params.id;
  const userId = req.body.userId;

  try {
    const story = await Story.findById(storyId);
    const user = await User.findById(userId);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has already liked the story
    if (user.likes.includes(storyId)) {
      return res.status(400).json({
        message: "You have already liked this story",
        liked: true,
        story: story,
      });
    }

    // save the user id to the story's likes array
    story.likes.push(userId);
    await story.save();

    //  save the story id to the user's likes array
    user.likes.push(storyId);
    await user.save();

    story.totalLikes = story.likes.length;
    res.json({
      message: "Story liked successfully",
      totalLikes: story.totalLikes,
      story: story,
      liked: true,
      likes: story.likes,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  likeStory,
};
