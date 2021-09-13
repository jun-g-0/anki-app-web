import React, { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Box, Container, TextField, Typography } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  Choice,
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
    await setQuestionState(response.payload as Question[]);
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
        } else if (targetProperty === 'choices') {
          const targetChoiceId = e.target.id.split('.')[2];
          const targetChoiceProperty = e.target.id.split('.')[3];

          // IDの変更には未対応
          if (targetChoiceProperty === 'choiceText') {
            const newChoices: Choice[] = [];

            for (let j = 0; j < question.choices.length; j++) {
              const choice = question.choices[j];

              if (choice.choiceId === Number(targetChoiceId)) {
                newChoices.push({ ...choice, choiceText: targetValue });
              } else {
                newChoices.push(choice);
              }
            }

            newQuestionState.push({
              ...question,
              choices: newChoices,
            });
          }
        }
      } else {
        newQuestionState.push(question);
      }
    }
    setQuestionState(newQuestionState);
  };

  const handleUpdate = async (selectedId: number) => {
    const question = questionState.filter(
      (qeustion) => qeustion.questionId === selectedId
    )[0];
    await dispatch(updateQuestion(question));
    await refreshQuestions();
  };

  const handleDelete = async (selectedId: number) => {
    await dispatch(deleteQuestion(selectedId));
    await refreshQuestions();
  };

  return (
    <>
      <Container>
        <NewQuestion refreshQuestions={refreshQuestions} />

        <Box>
          <Typography>既存問題の更新</Typography>
        </Box>
        {questionState.map((question) => (
          <Box key={question.questionId}>
            <Typography>問題ID: {question.questionId}</Typography>
            <TextField
              id={`${question.questionId}.questionText`}
              label="問題"
              multiline
              value={question.questionText.replaceAll('\\n', '\n')}
              onChange={handleChange}
            />

            <Box>
              <Typography>選択肢</Typography>
              {question.choices.map((choice) => {
                return (
                  <Box key={choice.choiceId}>
                    <Typography></Typography>
                    <TextField
                      id={`${question.questionId}.choices.${choice.choiceId}.choiceText`}
                      label={`選択肢ID: ${choice.choiceId}`}
                      value={choice.choiceText}
                      onChange={handleChange}
                    />
                  </Box>
                );
              })}
            </Box>

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
    choices: [
      { choiceId: 1, choiceText: `No.1 choice.` },
      { choiceId: 2, choiceText: `No.2 choice.` },
      { choiceId: 3, choiceText: `No.3 choice.` },
    ],
  });
  const [idError, setIdError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const targetProperty = e.target.id.split('.')[0];
    const targetValue = e.target.value;

    // 入力されたIDが数字でない場合は警告を表示
    // Validationの共通化はBacklog
    if (
      targetProperty === 'questionId' &&
      !Number.isInteger(Number(targetValue))
    ) {
      setIdError(true);
    } else if (
      targetProperty === 'questionId' &&
      Number.isInteger(Number(targetValue))
    ) {
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
    } else if (targetProperty === 'choices') {
      const targetChoiceId = e.target.id.split('.')[1];
      const targetChoiceProperty = e.target.id.split('.')[2];

      if (targetChoiceProperty === 'choiceText') {
        const newChoices: Choice[] = [];

        for (let j = 0; j < newQuestion.choices.length; j++) {
          const choice = newQuestion.choices[j];

          if (choice.choiceId === Number(targetChoiceId)) {
            newChoices.push({ ...choice, choiceText: targetValue });
          } else {
            newChoices.push(choice);
          }
        }

        setNewQuestion({
          ...newQuestion,
          choices: newChoices,
        });
      }
    }
  };

  const handleCreate = async () => {
    const question: Question = {
      questionId: newQuestion.questionId,
      questionText: newQuestion.questionText,
      type: 'radio',
      choices: newQuestion.choices,
      answer: 1,
      desc: newQuestion.desc,
    };
    await dispatch(updateQuestion(question));
    props.refreshQuestions();
  };

  return (
    <>
      <Box>
        <Typography>新規問題の作成</Typography>
      </Box>
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

        <Box>
          <Typography>選択肢</Typography>
          {newQuestion.choices.map((choice) => {
            return (
              <Box key={choice.choiceId}>
                <TextField
                  id={`choices.${choice.choiceId}.choiceText`}
                  label={`選択肢ID: ${choice.choiceId}`}
                  value={choice.choiceText}
                  onChange={handleChange}
                />
              </Box>
            );
          })}
        </Box>

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
