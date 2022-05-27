import React from 'react'
import { Link } from 'react-router-dom';
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";

const transform = (node, index) => {
  if (node.type === "tag" && node.name === "pre") {
    node.name = "div";
    // console.log(node);
    return convertNodeToElement(node, index, transform);
  }
};

const Answer = ({ ans }) => {

  return (
    <>
      <li>
        <div className="post_review">
          <ol className="meta_bold">
            <li>
              <span className="clr1">
                <b>By:</b> Aodour
              </span>
            </li>
          </ol>
          <p>
            A: { ReactHtmlParser(ans, { transform }) }
          </p>
          {/* <div className="like_unlike">
            <small>Was this Review Helpful?</small>
            <Link to='/' >
              <i
                className="fa fa-thumbs-up"
                aria-hidden="true"
              ></i>
              0
            </Link>
            <Link to='/' >
              <i
                className="fa fa-thumbs-down"
                aria-hidden="true"
              ></i>
              0
            </Link>
          </div> */}
        </div>
      </li>

    </>
  )
}

export default Answer;