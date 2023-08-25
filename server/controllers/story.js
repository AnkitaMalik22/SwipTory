const Story = require("../models/storyModel");
const User = require("../models/userModel");
const errorHandler = require("../middlewares/errorHandler");

const createStory = async (req, res, next) => {
  try {
    const { slides, addedBy } = req.body;
    if (!slides || !addedBy) {
      return res.status(400).json("Please provide all the required fields");
    }
    const story = new Story({ slides, addedBy });
    await story.save();
    res.status(201).json({ success: true, story });
  } catch (error) {
    next(new Error("Error creating story"));
  }
};

const getStories = async (req, res, n) => {
  const categories = [
    "food",
    "health and fitness",
    "travel",
    "movie",
    "education",
  ];
  const { userId, category, catLimit, cat } = req.query;

  let page = parseInt(req.query.page) || 1;
  let limit = 4 * page;
  let skip = 0;

  try {
    let stories = [];

    // ----------------------- GET MY STORIES -----------------------
    if (userId) {
      stories = await Story.find({ addedBy: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    // ----------------------- GET ALL STORIES -----------------------
    else if (category && category.toLowerCase() === "all") {
      // GROUP STORIES BY CATEGORY
      const groupedStories = {};

      for (const c of categories) {
        const categoryStories = await Story.find({
          slides: { $elemMatch: { category: c } },
        })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(cat === c ? catLimit : 4);

        groupedStories[c] = categoryStories;
      }

      return res
        .status(200)
        .json({ success: true, stories: groupedStories, page });
    }
    // ----------------------- GET STORIES BY CATEGORY -----------------------
    else {
      stories = await Story.find({
        slides: { $elemMatch: { category: category } },
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      return res.status(200).json({ success: true, stories, page });
    }

    res.status(200).json({ success: true, stories, page });
  } catch (error) {
    next(new Error("Error getting stories"));
  }
};

const getStoryById = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const { userId } = req.query;

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    let totalLikes = story.likes.length;

    if (userId) {
      const user = await User.findById(userId);

      if (user) {
        // check if user has liked/bookmarked the story
        const liked = user.likes.includes(storyId);
        const bookmarked = user.bookmarks.includes(storyId);

        return res.status(200).json({
          success: true,
          story,
          liked: liked,
          bookmarked: bookmarked,
          totalLikes,
        });
      }
    } else {
      return res.status(200).json({ success: true, story, totalLikes });
    }
  } catch (error) {
    console.log(error);
    next(new Error("Error getting story"));
  }
};

const updateStory = async (req, res, next) => {
  try {
    const { slides, addedBy } = req.body;

    if (!slides || !addedBy) {
      res.status(400).json("Please provide all the required fields");
    }
    const story = await Story.findById(req.params.id);

    if (!story) {
      res.status(404).json({ error: "Story not found" });
    }
    // update story
    story.slides = slides;
    story.addedBy = addedBy;
    await story.save();
    res.status(200).json({ success: true, story });
  } catch (error) {
    next(new Error("Error updating story"));
  }
};

module.exports = {
  createStory,
  getStories,
  getStoryById,
  updateStory,
};
