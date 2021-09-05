import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';

import { useAppSelector } from '../app/hooks';
import { selectQuestions } from '../features/questions/questionsSlice';

export default function AnkiQuesList() {
  const questions = useAppSelector(selectQuestions);

  return (
    <>
      <Container maxWidth='md'>
        <ul>
          {questions.map((question) => (
            <ul key={question.questionId}>
              <p style={{ whiteSpace: 'pre-line' }}>
                {question.questionText.replaceAll('\\n', '\n')}
              </p>
              <p style={{ whiteSpace: 'pre-line' }}>
                {question.desc.replaceAll('\\n', '\n') || 'no desc'}
              </p>
              <Button
                variant='contained'
                color='secondary'
                onClick={(e) => console.log(e.target)}
              >
                詳細
              </Button>
            </ul>
          ))}
        </ul>
      </Container>
    </>
  );
}
