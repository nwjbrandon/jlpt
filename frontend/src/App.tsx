import React from 'react';
import './App.css';
import VocabList from './data/vocab.json';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import _shuffle from 'lodash/shuffle';

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
  const AnswerButtonStyle = { fontSize: '20px' };
  const [input, setInput] = React.useState<string>('');

  const getButtonColor = (option: string) => {
    if (input === '') {
      return 'primary';
    }
    if (option === input) {
      if (input === answer) {
        return 'success';
      } else {
        return 'error';
      }
    }
    return 'primary';
  };

  return (
    <Grid container spacing={1}>
      <Grid item className="answer_button" xs={6}>
        <Button
          style={AnswerButtonStyle}
          variant="outlined"
          onClick={() => setInput(option1)}
          color={getButtonColor(option1)}
        >
          {option1}
        </Button>
      </Grid>
      <Grid item className="answer_button" xs={6}>
        <Button
          style={AnswerButtonStyle}
          variant="outlined"
          onClick={() => setInput(option2)}
          color={getButtonColor(option2)}
        >
          {option2}
        </Button>
      </Grid>
      <Grid item className="answer_button" xs={6}>
        <Button
          style={AnswerButtonStyle}
          variant="outlined"
          onClick={() => setInput(option3)}
          color={getButtonColor(option3)}
        >
          {option3}
        </Button>
      </Grid>
      <Grid item className="answer_button" xs={6}>
        <Button
          style={AnswerButtonStyle}
          variant="outlined"
          onClick={() => setInput(option4)}
          color={getButtonColor(option4)}
        >
          {option4}
        </Button>
      </Grid>
    </Grid>
  );
};

const VocabPractice = () => {
  const vocabList = _shuffle(VocabList);
  const question = vocabList[0];
  const kangi = question.kanji;
  return (
    <>
      <QuestionPanel text={kangi} />
      <AnswersGroup
        option1={vocabList[0].hiragana}
        option2={vocabList[1].hiragana}
        option3={vocabList[2].hiragana}
        option4={vocabList[3].hiragana}
        answer={vocabList[0].hiragana}
      />
    </>
  );
};

function App() {
  return (
    <div className="app">
      <header className="app-panel">
        <VocabPractice />
      </header>
    </div>
  );
}

export default App;
