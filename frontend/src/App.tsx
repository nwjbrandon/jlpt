import React from 'react';
import './App.css';
import vocab from './data/vocab.json';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

interface QuestionPanelProps {
  text: string;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({ text }) => {
  return <div className="question_panel">{text}</div>;
};

interface AnswersGroupProps {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

const AnswersGroup: React.FC<AnswersGroupProps> = ({
  option1,
  option2,
  option3,
  option4,
  answer
}) => {
  return (
    <Grid container spacing={1}>
      <Grid item className="answer_button" xs={6}>
        <Button style={{ fontSize: '20px' }} variant="outlined">
          {option1}
        </Button>
      </Grid>
      <Grid item className="answer_button" xs={6}>
        <Button style={{ fontSize: '20px' }} variant="outlined">
          {option2}
        </Button>
      </Grid>
      <Grid item className="answer_button" xs={6}>
        <Button style={{ fontSize: '20px' }} variant="outlined">
          {option3}
        </Button>
      </Grid>
      <Grid item className="answer_button" xs={6}>
        <Button style={{ fontSize: '20px' }} variant="outlined">
          {option4}
        </Button>
      </Grid>
    </Grid>
  );
};

function App() {
  const question = vocab[0];
  const kangi = question.kanji;

  return (
    <div className="app">
      <header className="app-panel">
        <QuestionPanel text={kangi} />
        <AnswersGroup
          option1={vocab[0].hiragana}
          option2={vocab[1].hiragana}
          option3={vocab[2].hiragana}
          option4={vocab[3].hiragana}
          answer={vocab[0].hiragana}
        />
      </header>
    </div>
  );
}

export default App;
