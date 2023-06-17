import React from 'react';
import './App.css';
import Vocab from './data/vocab.json';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import _shuffle from 'lodash/shuffle';
import _random from 'lodash/random';

interface QuestionPanelProps {
  text: string;
  meaning: string;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({ text, meaning }) => {
  return (
    <>
      <div className="question_panel">{text}</div>
      <div className="question_panel_meaning">({meaning})</div>
    </>
  );
};

interface AnswersGroupProps {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  input: string;
  answer: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const AnswersGroup: React.FC<AnswersGroupProps> = ({
  option1,
  option2,
  option3,
  option4,
  input,
  answer,
  setInput
}) => {
  const AnswerButtonStyle = { fontSize: '16px' };

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
          1: {option1}
        </Button>
      </Grid>
      <Grid item className="answer_button" xs={6}>
        <Button
          style={AnswerButtonStyle}
          variant="outlined"
          onClick={() => setInput(option2)}
          color={getButtonColor(option2)}
        >
          2: {option2}
        </Button>
      </Grid>
      <Grid item className="answer_button" xs={6}>
        <Button
          style={AnswerButtonStyle}
          variant="outlined"
          onClick={() => setInput(option3)}
          color={getButtonColor(option3)}
        >
          3: {option3}
        </Button>
      </Grid>
      <Grid item className="answer_button" xs={6}>
        <Button
          style={AnswerButtonStyle}
          variant="outlined"
          onClick={() => setInput(option4)}
          color={getButtonColor(option4)}
        >
          4: {option4}
        </Button>
      </Grid>
    </Grid>
  );
};

interface NextQuestionButtonProps {
  nextQuestion: () => void;
}

const NextQuestionButton: React.FC<NextQuestionButtonProps> = ({ nextQuestion }) => {
  const NextQuestionButtonStyle = { marginTop: '10px' };
  return (
    <Grid container style={NextQuestionButtonStyle} spacing={1}>
      <Grid item className="next_button" xs={12}>
        <Button className="next_button" variant="contained" onClick={nextQuestion}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

interface VocabProps {
  kanji: string;
  meaning: string;
  hiragana: string;
}

const VocabPractice = () => {
  const [vocab, setVocab] = React.useState<VocabProps[]>(_shuffle(Vocab));
  const [qa, setQA] = React.useState<number[]>(_shuffle([0, 1, 2, 3]));
  const [input, setInput] = React.useState<string>('');

  const nextQuestion = () => {
    setInput('');
    setVocab(_shuffle(Vocab));
    setQA(_shuffle(qa));
  };

  const qnIdx = qa[0];
  const kanji = vocab[qnIdx].kanji;
  const meaning = vocab[qnIdx].meaning;
  const answer = vocab[qnIdx].hiragana;

  return (
    <>
      <QuestionPanel text={kanji} meaning={meaning} />
      <AnswersGroup
        option1={vocab[0].hiragana}
        option2={vocab[1].hiragana}
        option3={vocab[2].hiragana}
        option4={vocab[3].hiragana}
        input={input}
        answer={answer}
        setInput={setInput}
      />
      <NextQuestionButton nextQuestion={nextQuestion} />
    </>
  );
};

const synth = window.speechSynthesis;

const ListeningPractice = () => {
  const [input, setInput] = React.useState<string>('');
  const [answer, setAnswer] = React.useState<string>('');
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);

  const ListeningPracticeStyle = { marginTop: '32px', marginBottom: '32px' };

  const randomText = () => {
    const item = _shuffle([
      { countable: '', lower: 0, upper: 1000000 },
      { countable: '円', lower: 1, upper: 1000000 },
      { countable: 'つ', lower: 1, upper: 100 },
      { countable: '個', lower: 1, upper: 100 },
      { countable: '人', lower: 1, upper: 100 },
      { countable: '台', lower: 1, upper: 100 },
      { countable: '本', lower: 1, upper: 100 },
      { countable: '枚', lower: 1, upper: 100 },
      { countable: '匹', lower: 1, upper: 100 },
      { countable: '冊', lower: 1, upper: 100 },
      { countable: '分', lower: 1, upper: 60 },
      { countable: '日', lower: 1, upper: 31 },
      { countable: '週', lower: 1, upper: 10 },
      { countable: '時', lower: 1, upper: 24 },
      { countable: '時間', lower: 1, upper: 12 },
      { countable: '月', lower: 1, upper: 12 },
      { countable: 'ヶ月', lower: 1, upper: 12 },
      { countable: '年', lower: 1200, upper: 2100 },
      { countable: '年間', lower: 1, upper: 10 },
      { countable: '歳', lower: 1, upper: 100 },
      { countable: 'メートル', lower: 1, upper: 1000 },
      { countable: 'キロメートル', lower: 1, upper: 1000 },
      { countable: 'グラム', lower: 1, upper: 1000 },
      { countable: 'キログラム', lower: 1, upper: 1000 },
      { countable: 'グラム', lower: 1, upper: 1000 },
      { countable: 'キログラム', lower: 1, upper: 1000 },
      { countable: '回', lower: 1, upper: 100 }
    ])[0];

    const number = _random(item.lower, item.upper).toString();
    return number + item.countable;
  };

  const play = () => {
    const voices = window.speechSynthesis.getVoices();
    const u = new SpeechSynthesisUtterance(answer);
    const lang = 'ja-JP';
    const voice = voices.find((voice) => voice.lang === lang);
    if (voice !== undefined) {
      u.voice = voice;
    }
    u.lang = lang;
    synth.speak(u);
  };

  const nextQuestion = () => {
    setIsCorrect(null);
    setInput('');
    setAnswer(randomText());
  };

  const checkAnswer = () => {
    if (answer === input) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const getButtonColor = () => {
    if (isCorrect === null) {
      return 'primary';
    }

    if (isCorrect) {
      return 'success';
    } else {
      return 'error';
    }
  };

  React.useEffect(() => {
    setAnswer(randomText());
  }, []);

  return (
    <>
      <div className="question_panel">
        {isCorrect === null ? 'Click play to listen' : 'Answer: ' + answer}
      </div>
      <Grid container style={ListeningPracticeStyle} spacing={1}>
        <Grid item xs={12}>
          <TextField
            focused
            type="text"
            fullWidth
            id="user-input"
            label="Write here"
            variant="outlined"
            inputProps={{ autoComplete: 'new-password' }}
            sx={{ input: { color: 'white' } }}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </Grid>
        <Grid item className="answer_button" xs={6}>
          <Button variant="outlined" onClick={play}>
            Play
          </Button>
        </Grid>
        <Grid item className="answer_button" xs={6}>
          <Button variant="outlined" onClick={checkAnswer} color={getButtonColor()}>
            Check
          </Button>
        </Grid>
      </Grid>
      <NextQuestionButton nextQuestion={nextQuestion} />
    </>
  );
};

function App() {
  const [tabValue, setTabValue] = React.useState(0);

  const changeTabValue = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className="app">
      <header className="app-panel">
        <Box sx={{ width: '100%' }}>
          <Tabs value={tabValue} onChange={changeTabValue} centered>
            <Tab
              label={
                tabValue === 0 ? 'Vocabulary' : <span style={{ color: 'grey' }}>Vocabulary</span>
              }
            />
            <Tab
              label={
                tabValue === 1 ? 'Listening' : <span style={{ color: 'grey' }}>Listening</span>
              }
            />
          </Tabs>
        </Box>
        {tabValue === 0 ? <VocabPractice /> : tabValue === 1 ? <ListeningPractice /> : <div />}
      </header>
    </div>
  );
}

export default App;
