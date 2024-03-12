import React from "react"
import ContentLoader from "react-content-loader"

const AlbumImageLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={200}
    height={200}
    viewBox="0 0 200 200"
    backgroundColor="#171717"
    foregroundColor="#272727"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="200" height="200" />
  </ContentLoader>
)

export default AlbumImageLoader

