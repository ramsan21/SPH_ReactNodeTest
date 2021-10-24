import { Request, Response } from "express";
import config from "../../config/default";
import { Item } from "./interface";
const feed = require("feed-read-parser");

const xmlURL = config.xmlURL as string;

// @route   GET api/item/:title
// @desc    Get item
// @access  public
export default async (req: Request, res: Response) => {
  const { title } = req.params;

  feed(xmlURL, function (err: string, feeds: Item[]) {
    if (err) throw err;

    let items: Item[] = feeds;

    items = feeds.filter((item: Item) => {
      return item.title.toLowerCase() === title.toLowerCase();
    });

    items = items.map((item: Item) => {
      delete item.feed;
      delete item.link;

      return {
        ...item,
        edited: item.published,
        created: item.published,
      };
    });

    res.status(200).json({ ...items["0"] });
  });
};
