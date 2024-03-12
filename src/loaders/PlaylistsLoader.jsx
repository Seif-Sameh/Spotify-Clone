import React from 'react'
import ContentLoader from 'react-content-loader'

const TaskList = props => {
    return (
        <ContentLoader 
        speed={2}
        width={250}
        height={500}
        viewBox="0 0 250 500"
        backgroundColor="#171717"
        foregroundColor="#272727"
    {...props}
  >
    <rect x="64" y="8" rx="3" ry="3" width="185" height="53" /> 
    <rect x="1" y="8" rx="3" ry="3" width="51" height="53" /> 
    <rect x="64" y="91" rx="3" ry="3" width="185" height="53" /> 
    <rect x="1" y="91" rx="3" ry="3" width="51" height="53" /> 
    <rect x="64" y="178" rx="3" ry="3" width="185" height="53" /> 
    <rect x="1" y="178" rx="3" ry="3" width="51" height="53" /> 
    <rect x="64" y="261" rx="3" ry="3" width="185" height="53" /> 
    <rect x="1" y="261" rx="3" ry="3" width="51" height="53" /> 
    <rect x="64" y="345" rx="3" ry="3" width="185" height="53" /> 
    <rect x="1" y="345" rx="3" ry="3" width="51" height="53" />
    <rect x="64" y="428" rx="3" ry="3" width="185" height="53" /> 
    <rect x="1" y="428" rx="3" ry="3" width="51" height="53" />
  </ContentLoader>
    )
}

export default TaskList