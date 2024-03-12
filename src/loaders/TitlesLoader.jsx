import React from "react"
import ContentLoader from "react-content-loader"

const TitlesLoader = (props) => (
<ContentLoader 
    speed={2}
    width={154}
    height={24}
    viewBox="0 0 154 24"
    backgroundColor="#171717"
    foregroundColor="#272727"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="154" height="24" />
  </ContentLoader>
)

export default TitlesLoader
