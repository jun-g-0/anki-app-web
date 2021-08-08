import React from 'react';
import Button from '@material-ui/core/Button';

export default function AnkiQuesList(props) {
  return (
    <React.Fragment>
      <ul>
        {props.questions.map((question) => (
          <ul key={question.id}>
            <p style={{ whiteSpace: 'pre-line' }}>
              {question.questionText.replaceAll('\\n', '\n')}
            </p>
            <p  style={{ whiteSpace: 'pre-line' }}>
              {question.desc.replaceAll('\\n', '\n') || 'no desc'}
            </p>
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
