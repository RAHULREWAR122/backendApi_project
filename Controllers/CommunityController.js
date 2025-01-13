import { Community } from "../Schema/community.js";

export const addNewCommunity = async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newCommunity = new Community({
      title,
      desc,
    });

    await newCommunity.save();

    res
      .status(201)
      .json({
        message: "Community created successfully",
        community: newCommunity,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating community", error });
  }
};

export const allCommunitiesPosts = async (req, res) => {
  try {
    const { communityId } = req.params;
    const community = await Community.findById(communityId).populate(
      "posts.createdBy",
      "username email"
    );
    if (!community)
      return res.status(404).json({ message: "Community not found" });
    res.json(community.posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
export const addNewPost = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { userId, title, desc, username } = req.body;

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const post = {
      title,
      desc,
      createdBy: userId,
      username,
    };

    community.posts.push(post);

    await community.save();

    res.status(201).json({ message: "Post added successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error adding post", error });
  }
};

export const allCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching communities", error });
  }
};
