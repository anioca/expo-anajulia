import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

export default function TriviaScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    if (!answered) {
      const correctAnswer = questions[currentQuestionIndex].correct_answer;
      if (answer === correctAnswer) {
        setScore(score + 1);
      }
      setUserAnswer(answer);
      setAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      setUserAnswer(null);
    } else {
      console.log("Todas as perguntas foram respondidas!");
    }
  };

  const renderQuestion = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>Question {currentQuestionIndex + 1}:</Text>
      <Text style={styles.questionText}>{item.question}</Text>
      {[...item.incorrect_answers, item.correct_answer].sort().map((answer, i) => (
        <Button
          key={i}
          title={answer}
          onPress={() => handleAnswer(answer)}
          disabled={answered}
          color={userAnswer === answer ? (answer === item.correct_answer ? '#32CD32' : '#FF0000') : '#67C7F2'}
          style={styles.answerButton}
        />
      ))}
      <Button
        title="Próxima Pergunta"
        onPress={handleNextQuestion}
        disabled={!answered}
        color="#F46799"
        style={styles.nextButton}
      />
    </View>
  );

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Pontuação: {score}</Text>
      <FlatList
        data={[questions[currentQuestionIndex]]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderQuestion}
        extraData={answered}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  score: {
    fontSize: 20,
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  nextButton: {
    marginTop: 10,
  },
  answerButton: {
    marginVertical: 5,
  },
});
