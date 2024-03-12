import React from "react"
import ContentLoader from "react-content-loader"

const PlayerImageLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={60}
    height={60}
    viewBox="0 0 60 60"
    backgroundColor="#171717"
    foregroundColor="#272727"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="60" height="60" />
  </ContentLoader>
)

export default PlayerImageLoader

