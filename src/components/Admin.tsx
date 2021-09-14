import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Box, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  Choice,
  deleteQuestion,
  fetchQuestions,
  Question,
  selectQuestions,
  updateQuestion,
} from '../features/questions/questionsSlice';
import { useSnackbar } from 'notistack';
import { selectUser } from '../features/user/userSlice';
import { useHistory } from 'react-router';

const useStyles = makeStyles((_) => ({
  admin: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'space-around',
    flexDirection: 'column',
    padding: '0px 20px 40px 20px',
  },
  adminBlocks: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 20px 0px 20px',
  },
  adminQuestions: {
    display: 'flex',
    flexDirection: 'column',
  },
  adminQuestionsContents: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0px 0px 0px',
  },
  adminChoices: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    padding: '0px 20px 0px 20px',
  },
  adminChoice: {
    display: 'flex',
    flexDirection: 'column',
  },
  adminButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: '20px 0px 0px 0px',
  },
  adminButton: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
  },
  adminChoiceTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px 0px 0px 0px',
  },
}));

export default function AnkiAdmin() {
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const user = useAppSelector(selectUser);

  const [questionState, setQuestionState] = useState(questions);
  let history = useHistory();

  const refreshQuestions = async () => {
    const response = await dispatch(fetchQuestions());
    setQuestionState(response.payload as Question[]);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const [id, property, choiceId, choiceProperty] = e.target.id.split('.');
    const targetValue = e.target.value;

    // 新規の問題の配列を作成し、特定のID/プロパティのみ更新する
    setQuestionState(
      questionState.map((question) => {
        if (String(question.questionId) === id) {
          if (property === 'questionText') {
            return {
              ...question,
              questionText: targetValue,
            };
          } else if (property === 'desc') {
            return {
              ...question,
              desc: targetValue,
            };
          } else if (
            property === 'choices' &&
            choiceProperty === 'choiceText'
          ) {
            return {
              ...question,
              choices: question.choices.map((choice) =>
                choice.choiceId === Number(choiceId)
                  ? { ...choice, choiceText: targetValue }
                  : choice
              ),
            };
          }
        }
        return question;
      })
    );
  };

  const handleUpdate = async (selectedId: number) => {
    const question = questionState.filter(
      (qeustion) => qeustion.questionId === selectedId
    )[0];
    await dispatch(updateQuestion(question));
    await refreshQuestions();
    enqueueSnackbar('問題の更新が完了しました。', {
      variant: 'success',
      autoHideDuration: 1000,
    });
  };

  const handleDelete = async (selectedId: number) => {
    await dispatch(deleteQuestion(selectedId));
    await refreshQuestions();
    enqueueSnackbar('問題の削除が完了しました。', {
      variant: 'success',
      autoHideDuration: 1000,
    });
  };

  useEffect(() => {
    if (!user.ankiUser?.admin) {
      history.push('/');
    }
  }, [user, history]);

  return (
    <>
      <Container className={classes.admin} maxWidth="sm">
        <NewQuestion refreshQuestions={refreshQuestions} />

        <Box className={classes.adminBlocks}>
          <Typography variant="h6">既存問題の更新</Typography>
          {questionState.map((question) => (
            <Box key={question.questionId}>
              <Box className={classes.adminQuestionsContents}>
                <Typography variant="subtitle1">
                  問題ID: {question.questionId}
                </Typography>
              </Box>

              <Box>
                <Box
                  key={question.questionId}
                  className={classes.adminQuestionsContents}
                >
                  <TextField
                    id={`${question.questionId}.questionText`}
                    label="問題"
                    multiline
                    value={question.questionText.replaceAll('\\n', '\n')}
                    onChange={handleChange}
                  />
                </Box>

                <Box className={classes.adminQuestionsContents}>
                  <Typography>選択肢</Typography>
                  <Box className={classes.adminChoices}>
                    {question.choices.map((choice) => {
                      return (
                        <Box
                          key={choice.choiceId}
                          className={classes.adminChoice}
                        >
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
                </Box>
                <Box className={classes.adminQuestionsContents}>
                  <TextField
                    id={`${question.questionId}.desc`}
                    label="解説"
                    multiline
                    value={question.desc.replaceAll('\\n', '\n')}
                    onChange={handleChange}
                  />
                </Box>

                <Box className={classes.adminButtons}>
                  <Box className={classes.adminButton}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(question.questionId)}
                    >
                      更新
                    </Button>
                  </Box>
                  <Box className={classes.adminButton}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(question.questionId)}
                    >
                      削除
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}

interface Props {
  refreshQuestions: () => Promise<void>;
}

function NewQuestion(props: Props) {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [newQuestion, setNewQuestion] = useState({
    questionId: 0,
    questionText: '',
    desc: '',
    idValidation: false,
    choices: [
      { choiceId: 1, choiceText: `` },
      { choiceId: 2, choiceText: `` },
      { choiceId: 3, choiceText: `` },
    ],
  });
  const [idError, setIdError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const [property, choiceId, choiceProperty] = e.target.id.split('.');
    const targetValue = e.target.value;

    // 入力されたIDが数字でない場合は警告を表示
    // Validationの共通化はBacklog
    if (property === 'questionId' && !Number.isInteger(Number(targetValue))) {
      setIdError(true);
    } else if (
      property === 'questionId' &&
      Number.isInteger(Number(targetValue))
    ) {
      setIdError(false);
    }

    // 入力したデータの更新
    if (property === 'questionText') {
      setNewQuestion({
        ...newQuestion,
        questionText: targetValue,
      });
    } else if (property === 'desc') {
      setNewQuestion({
        ...newQuestion,
        desc: targetValue,
      });
    } else if (
      property === 'questionId' &&
      Number.isInteger(Number(targetValue))
    ) {
      setNewQuestion({
        ...newQuestion,
        questionId: Number(targetValue),
      });
    } else if (property === 'choices' && choiceProperty === 'choiceText') {
      setNewQuestion({
        ...newQuestion,
        choices: newQuestion.choices.map((choice) =>
          choice.choiceId === Number(choiceId)
            ? { ...choice, choiceText: targetValue }
            : choice
        ),
      });
    }
  };

  const handleAdd = () => {
    const newChoices = [...newQuestion.choices];
    newChoices.push({
      choiceId: newQuestion.choices.length + 1,
      choiceText: ``,
    });

    setNewQuestion({
      ...newQuestion,
      choices: newChoices,
    });
  };

  const handleRemove = () => {
    const newChoices = [...newQuestion.choices];
    newChoices.pop();

    setNewQuestion({
      ...newQuestion,
      choices: newChoices,
    });
  };

  const handleCreate = async () => {
    // validation の共通化は Backlog
    if (newQuestion.questionId === 0) {
      enqueueSnackbar('問題IDを入力してください。', {
        variant: 'warning',
      });
      return;
    }
    if (newQuestion.choices.length === 0) {
      enqueueSnackbar('選択肢は1つ以上必要です。', { variant: 'warning' });
      return;
    }

    const question: Question = {
      questionId: newQuestion.questionId,
      questionText: newQuestion.questionText,
      type: 'radio',
      choices: newQuestion.choices,
      answer: 1,
      desc: newQuestion.desc,
    };
    const result = await dispatch(updateQuestion(question));
    await props.refreshQuestions();
    console.log('result: ', result);
    enqueueSnackbar('問題の作成が完了しました。', {
      variant: 'success',
      autoHideDuration: 1000,
    });
  };

  return (
    <>
      <Box className={classes.adminBlocks}>
        <Typography variant="h6">新規問題の作成</Typography>
        <Box>
          <TextField
            id="questionId"
            label="ID"
            defaultValue=""
            error={idError}
            onChange={handleChange}
          />
        </Box>

        <TextField
          id="questionText"
          label="問題文"
          multiline
          rows={2}
          value={newQuestion.questionText}
          onChange={handleChange}
        />

        <Box className={classes.adminChoiceTitle}>
          <Typography variant="subtitle1">選択肢(正解はID1固定)</Typography>
          <Button onClick={handleAdd}>
            <AddCircleOutlineIcon />
          </Button>
          <Button onClick={handleRemove}>
            <RemoveCircleOutlineIcon />
          </Button>
        </Box>
        <Box className={classes.adminChoices}>
          {newQuestion.choices.map((choice) => {
            return (
              <Box key={choice.choiceId} className={classes.adminChoice}>
                <TextField
                  id={`choices.${choice.choiceId}.choiceText`}
                  label={`選択肢ID: ${choice.choiceId} テキスト`}
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
          rows={2}
          value={newQuestion.desc}
          onChange={handleChange}
        />
        <Box className={classes.adminBlocks}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            作成
          </Button>
        </Box>
      </Box>
    </>
  );
}
