import { Fab } from '@material-ui/core';
import React, { useState } from 'react';
import ReactQuiz from 'react-quiz-component';
import { quizData } from './quizdata';
import { useSnackbar } from 'notistack'
import ky from 'ky'


const Quiz = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [showRestart, setShowRestart] = useState(false);


    const getLtik = () => {
        const searchParams = new URLSearchParams(window.location.search)
        const ltik = searchParams.get('ltik')
        if (!ltik) throw new Error('Missing lti key.')
        return ltik
    }


    const successPrompt = async (grade) => {
        enqueueSnackbar('Grade ' + grade + ' succesfully sent!', { variant: 'success' })
    }

    const errorPrompt = async (message) => {
        enqueueSnackbar(message, { variant: 'error' })
    }

    const setQuizResult = async (obj, e) => {
        console.log(obj);

        // Send grades back to canvas via ltijs call
        if (!(obj.numberOfCorrectAnswers == 0 && obj.numberOfIncorrectAnswers == 0)) {
            console.log("Run only one time with correct answer: ", obj.correctPoints);
            const grade = obj.correctPoints;
            try {
                const body = {
                    grade: grade
                }

                await ky.post('/grade', { credentials: 'include', json: body, headers: { Authorization: 'Bearer ' + getLtik() } })
                successPrompt(grade)
            } catch (err) {
                console.log(err)
                errorPrompt('Failed sending grade to platform! ' + err)
            }
        }
        setShowRestart(true);
    }


    const restartQuiz = () => {
        setShowRestart(false);
        window.location.reload();
    }

    return (
        <div>
            {showRestart ?
                <Fab variant='extended' color='secondary' aria-label='add' style={{ display: "flex", margin: "auto", marginTop: "1em", marginBottom: "1em" }} onClick={restartQuiz}>
                    Restart Quiz
                </Fab> : null}
            <ReactQuiz quiz={quizData} onComplete={setQuizResult} />
        </div>
    )
}

export default Quiz