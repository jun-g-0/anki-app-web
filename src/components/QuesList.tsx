import React from 'react';
import Button from '@material-ui/core/Button';
import { Container, Typography, Box } from '@material-ui/core';
import { Question } from '../App'

type Props = {
  questions: Question[];
}

export default function AnkiQuesList(props: Props) {
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <ul>
          {props.questions.map((question) => (
            <ul key={question.questionId}>
              <p style={{ whiteSpace: 'pre-line' }}>
                {question.questionText.replaceAll('\\n', '\n')}
              </p>
              <p style={{ whiteSpace: 'pre-line' }}>
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
      </Container>
    </React.Fragment>
  );
}
