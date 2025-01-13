import express from 'express';

const router = express.Router();

import { login , register , searchUser } from '../Controllers/AuthController.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';
import { addNewCommunity, addNewPost, allCommunitiesPosts , allCommunities } from '../Controllers/CommunityController.js';



router.post("/api/register", register);
router.post("/api/login", login);
router.get("/api/search/:query", searchUser);
router.post("/api/addPost/:communityId", authenticateToken ,addNewPost);
router.post("/api/addCommunity", authenticateToken ,addNewCommunity);
router.get("/api/communities/:communityId", allCommunitiesPosts);
router.get("/api/communities", allCommunities);


router.get("/", (req, res) => {
  res.send("<h2>Welcome to the Backend food Management System.</h2>");
});


export default router;
