const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

/* u ovom ruteru cu raditi sve funkcionalnosti sto se tice korisnika*/

/*USER REQUEST*/


//UPDATE USER

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id /* param predstavlja /:id u parametrima metode*/ || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.getSalt(15);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return req.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }); //$set:req.body znaci da ce sve inpute staviti u taj body
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account");
    }
});

//DELETE  USER

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account");
    }
});


//GET A USER

router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET A FRIENDS
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });

//FOLLOW A USER

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })//koristim push jer cu pushati id u followers
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You already follow this person");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't follow yourself.")
    }
})

//UNFOLLOW A USER

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })//koristim pull jer cu pullati id iz followers
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You dont follow this person");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't unfollow yourself.")
    }
})

module.exports = router
