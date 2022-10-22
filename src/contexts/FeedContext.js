import { createContext } from "react";

const FeedContext = createContext({
  feeds: null,
  setFeeds: null,
});

export default FeedContext;
