import React, { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Box, Container, TextField } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteQuestion,
  fetchQuestions,
  Question,
  selectQuestions,
  updateQuestion,
} from '../features/questions/questionsSlice';

export default function AnkiAdmin() {
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();

  const [questionState, setQuestionState] = useState(questions);

  const refreshQuestions = async () => {
    const response = await dispatch(fetchQuestions());
    setQuestionState(response.payload as Question[]);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const targetId = e.target.id.split('.')[0];
    const targetProperty = e.target.id.split('.')[1];
    const targetValue = e.target.value;

    // 新規の問題の配列を作成し、特定のID/プロパティのみ更新する
    const newQuestionState: Question[] = [];
    for (let i = 0; i < questionState.length; i++) {
      const question = questionState[i];
      if (String(question.questionId) === targetId) {
        if (targetProperty === 'questionText') {
          newQuestionState.push({
            ...question,
            questionText: targetValue,
          });
        } else if (targetProperty === 'desc') {
          newQuestionState.push({
            ...question,
            desc: targetValue,
          });
        }
      } else {
        newQuestionState.push(question);
      }
    }
    setQuestionState(newQuestionState);
  };

  const handleUpdate = (selectedId: number) => {
    const question = questionState.filter(
      (qeustion) => qeustion.questionId === selectedId
    )[0];
    dispatch(updateQuestion(question));
  };

  const handleDelete = async (selectedId: number) => {
    await dispatch(deleteQuestion(selectedId));
    refreshQuestions();
  };

  return (
    <>
      <Container>
        <NewQuestion refreshQuestions={refreshQuestions} />

        <Box>既存問題の更新</Box>
        {questionState.map((question) => (
          <Box key={question.questionId}>
            <TextField
              id={`${question.questionId}.questionText`}
              label="ID"
              multiline
              value={question.questionText.replaceAll('\\n', '\n')}
              onChange={handleChange}
            />

            <TextField
              id={`${question.questionId}.desc`}
              label="解説"
              multiline
              value={question.desc.replaceAll('\\n', '\n')}
              onChange={handleChange}
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
              onClick={() => handleDelete(question.questionId)}
            >
              削除
            </Button>
          </Box>
        ))}
      </Container>
    </>
  );
}

interface Props {
  refreshQuestions: () => Promise<void>;
}

function NewQuestion(props: Props) {
  const dispatch = useAppDispatch();

  const [newQuestion, setNewQuestion] = useState({
    questionId: 0,
    questionText: '',
    desc: '',
    idValidation: false,
  });
  const [idError, setIdError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const targetProperty = e.target.id;
    const targetValue = e.target.value;

    // 入力されたIDが数字でない場合は警告を表示
    // Validationの共通化はBacklog
    if (
      targetProperty === 'questionId' &&
      !Number.isInteger(Number(targetValue))
    ) {
      setIdError(true);
    } else {
      setIdError(false);
    }

    // 入力したデータの更新
    if (targetProperty === 'questionText') {
      setNewQuestion({
        ...newQuestion,
        questionText: targetValue,
      });
    } else if (targetProperty === 'desc') {
      setNewQuestion({
        ...newQuestion,
        desc: targetValue,
      });
    } else if (
      targetProperty === 'questionId' &&
      Number.isInteger(Number(targetValue))
    ) {
      setNewQuestion({
        ...newQuestion,
        questionId: Number(targetValue),
      });
    }
  };

  const handleCreate = async () => {
    const question: Question = {
      questionId: newQuestion.questionId,
      questionText: newQuestion.questionText,
      type: 'radio',
      choices: [
        { choiceId: 1, choiceText: `${newQuestion.questionId}-1 choice.` },
        { choiceId: 2, choiceText: `${newQuestion.questionId}-2 choice.` },
        { choiceId: 3, choiceText: `${newQuestion.questionId}-3 choice.` },
      ],
      answer: 1,
      desc: newQuestion.desc,
    };
    await dispatch(updateQuestion(question));
    props.refreshQuestions();
  };

  return (
    <>
      <Box>新規問題の作成</Box>
      <Box key="newQuestion">
        <TextField
          id="questionId"
          label="ID"
          defaultValue=""
          error={idError}
          onChange={handleChange}
        />
        <TextField
          id="questionText"
          label="問題"
          multiline
          value={newQuestion.questionText}
          onChange={handleChange}
        />
        <TextField
          id="desc"
          label="解説"
          multiline
          value={newQuestion.desc}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>
          作成
        </Button>
      </Box>
    </>
  );
}
