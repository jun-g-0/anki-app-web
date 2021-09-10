import React, { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Box, Container, TextField } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  Question,
  selectQuestions,
  updateQuestion,
} from '../features/questions/questionsSlice';

export default function AnkiAdmin() {
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();

  const [questionState, setQuestionState] = useState(questions);

  const handleUpdate = (selectedId: number) => {
    const question = questionState.filter(
      (e) => e.questionId === selectedId
    )[0];
    dispatch(updateQuestion(question));
  };

  const handleQuestionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // Stateを最新状況に更新
    const newQuestionState: Question[] = [];
    for (let i = 0; i < questionState.length; i++) {
      const question = questionState[i];
      if (String(question.questionId) === e.target.id) {
        newQuestionState.push({
          ...question,
          questionText: e.target.value,
        });
      } else {
        newQuestionState.push(question);
      }
    }
    setQuestionState(newQuestionState);
  };

  return (
    <>
      <Container>
        {questionState.map((question) => (
          <Box key={question.questionId}>
            <TextField
              id={`${question.questionId}`}
              label="問題"
              multiline
              value={question.questionText.replaceAll('\\n', '\n')}
              onChange={handleQuestionChange}
            />

            <TextField
              id={`${question.questionId}.desc`}
              label="解説"
              multiline
              defaultValue={question.desc.replaceAll('\\n', '\n')}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdate(question.questionId)}
            >
              更新
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                console.log('test console.');
              }}
            >
              削除
            </Button>
          </Box>
        ))}
      </Container>
    </>
  );
}
