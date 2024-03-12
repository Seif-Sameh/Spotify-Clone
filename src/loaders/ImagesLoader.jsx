import React from "react"
import ContentLoader from "react-content-loader"

const ImagesLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={152}
    height={152}
    viewBox="0 0 152 152"
    backgroundColor="#171717"
    foregroundColor="#272727"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="152" height="152" />
  </ContentLoader>
)

export default ImagesLoader

