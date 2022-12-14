import express from "express";
import request from "request";

const router = express.Router();

router.get("/me", (req: express.Request, res: express.Response) => {
  const access_token = req.query.access_token || null;

  if (access_token || access_token !== "undefined") {
    var options = {
      url: "https://api.spotify.com/v1/me",
      headers: { Authorization: "Bearer " + access_token },
      json: true,
    };

    request.get(options, (error, _response, body) => {
      if (error) {
        res.status(500).json({ error: "An error has occurred" });
      } else if (body.error) {
        res.status(body.error.status).json({ error: body.error.message });
      } else {
        res.status(200).json(body);
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

//get top tracks
router.get("/tracks", (req: express.Request, res: express.Response) => {
  const access_token = req.query.access_token || null;
  const time_range = req.query.time_range || "short_term";

  if (access_token || access_token !== "undefined") {
    var options = {
      url: `https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=${time_range}`,
      headers: { Authorization: "Bearer " + access_token },
      json: true,
    };

    request.get(options, (error, _response, body) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "An error has occurred" });
      } else {
        const data = body.items;
        res.status(200).json(data);
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

router.get("/artists", (req: express.Request, res: express.Response) => {
  const access_token = req.query.access_token || null;
  const time_range = req.query.time_range || "short_term";

  if (access_token || access_token !== "undefined") {
    var options = {
      url: `https://api.spotify.com/v1/me/top/artists?limit=5&time_range=${time_range}`,
      headers: { Authorization: "Bearer " + access_token },
      json: true,
    };

    request.get(options, (error, _response, body) => {
      if (error) {
        res.status(500).json({ error: "An error has occurred" });
      } else {
        const data = body.items;
        res.status(200).json(data);
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

router.get("/top-genres", (req: express.Request, res: express.Response) => {
  const access_token = req.query.access_token || null;

  if (access_token || access_token !== "undefined") {
    var options = {
      url: "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      headers: { Authorization: "Bearer " + access_token },
      json: true,
    };

    request.get(options, (error, _response, body) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "An error has occurred" });
      } else {
        res.status(200).json(body);
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

export default router;
