import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

export default function TriviaScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

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
      setAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
    } else {
      // Aqui você pode fazer algo quando todas as perguntas forem respondidas
      console.log("Todas as perguntas foram respondidas!");
    }
  };

  return (
    <View>
      <Text>Pontuação: {score}</Text>
      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <Text>Question {index + 1}:</Text>
            <Text>{item.question}</Text>
            {item.incorrect_answers.map((answer, i) => (
              <Button
                key={i}
                title={answer}
                onPress={() => handleAnswer(answer)}
                disabled={answered}
              />
            ))}
            <Button
              title="Próxima Pergunta"
              onPress={handleNextQuestion}
              disabled={!answered}
            />
          </View>
        )}
      />
    </View>
  );
}
