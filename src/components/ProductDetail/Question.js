import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Answer from './Answer';

const Question = ({ productQuestion }) => {

  const { answers, date, question, userName } = productQuestion;


  return (
    <>
      <li className="">
        <div className="post_review">
          <ol className="meta_bold">
            <li>
              <span>
                <b>By:</b>{ userName }
              </span>
            </li>
          </ol>
          <ol className="meta_bold">
            <li>
              <span>
                <b>Submitted:</b>{ moment(date).format('LL') }
              </span>
            </li>
          </ol>
          <p>
            Q: { question }
          </p>
          <div className="like_unlike">
            <Link to='/' >
              <i
                className="fa fa-comments-o"
                aria-hidden="true"
              ></i>
              Answers ({ answers.length })
            </Link>
          </div>
        </div>
        <span></span>
        <ul className="commit_submenu">

          {
            answers.map((answer) => <Answer ans={answer} />)
          }

        </ul>
      </li>
    </>
  )
}

export default Question;
