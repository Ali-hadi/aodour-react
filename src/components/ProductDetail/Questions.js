import React from 'react'
import { Link } from 'react-router-dom'
import Question from './Question';

export default function Questions({ questions }) {
  const productQuestions = questions || []
  return (
    <div className="tab-element">
      <div className="commit_blog">
        <div className="row">
          <div className="col-md-12">
            <ul className="commite-blog">
              {
                productQuestions.map((question) => (<Question productQuestion={question} />))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
