import { Request, Response } from "express";
import config from "./../../config/default";
import { Item } from "./interface";
const feed = require("feed-read-parser");

const xmlURL = config.xmlURL as string;

// @route GET api/items
// @desc Get all items
// @access public
export default async (req: Request, res: Response) => {
  const q: any = req.query.q;

  feed(xmlURL, function (err: string, feeds: Item[]) {
    if (err) throw err;

    let items: Item[] = feeds;

    if (q) {
      items = feeds.filter((item: Item) => {
        return (
          item.title.toLowerCase().includes(q.toLowerCase()) ||
          item.author.toLowerCase().includes(q.toLowerCase())
        );
      });
    }

    items = items.map((item: Item) => {
      delete item.feed;
      delete item.link;

      return {
        ...item,
        edited: item.published,
        created: item.published,
      };
    });

    res.status(200).json(items);
  });
};
