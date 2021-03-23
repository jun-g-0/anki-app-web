import React from 'react';
import Button from '@material-ui/core/Button';

export default function AnkiQuesList(props) {
  return (
    <React.Fragment>
      <ul>
        {props.questions.map((questions) => (
          <ul key={questions.id || questions.question}>
            <h5>{questions.question}</h5>
            <p>{questions.desc || 'no desc'}</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => console.log(e.target)}
            >
              詳細
            </Button>
          </ul>
        ))}
      </ul>
    </React.Fragment>
  );
}
