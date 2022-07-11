import picFour from "../assets/quizImages/4.PNG";
import picSix from "../assets/quizImages/6.PNG";
import picEight from "../assets/quizImages/8.PNG";
import picNine from "../assets/quizImages/9.PNG";

export const quizData =  {
    "quizTitle": "Start Quiz",
    "questions": [
      {
        "question": "Who invented Java Programming?",
        "questionType": "text",
        "answers": [
          "James Gosling",
          "Dennis Ritchie",
          "Bjarne Stroustrup",
          "Guido van Rossum"
        ],
        "correctAnswer": "1",
        "explanation": "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
        "point": "10"
      },
      {
        "question": "Which component is used to compile, debug and execute the java programs?",
        "questionType": "text",
        "answers": [
          "JRE",
          "JIT",
          "JDK",
          "JVM"
        ],
        "correctAnswer": "3",
        "explanation": "JDK is a core component of Java Environment and provides all the tools, executables and binaries required to compile, debug and execute a Java Program.",
        "point": "10"
      },
      {
        "question": "Which one of the following is not a Java feature?",
        "answers": [
          "Object-oriented",
          "Use of pointers",
          "Portable",
          "Dynamic and Extensible"
        ],
        "correctAnswer": "2",
        "explanation": "Pointers is not a Java feature. Java provides an efficient abstraction layer for developing without using a pointer in Java. Features of Java Programming are Portable, Architectural Neutral, Object-Oriented, Robust, Secure, Dynamic and Extensible, etc.",
        "point": "10",
        "questionType": "text"
      },
      {
        "questionPic": picFour,
        "question": "What will be the output of the following Java code?",
        "questionType": "text",
        "answers": [
          "32",
          "33",
          "24",
          "25"
        ],
        "explanation": "Operator ++ has more preference than *, thus g becomes 4 and when multiplied by 8 gives 32.",
        "correctAnswer": "1",
        "point": "10"
      },
      {
        "question": "Which of the following is not an OOPS concept in Java?",
        "questionType": "text",
        "answers": [
          "Polymorphism",
          "Inheritance",
          "Compilation",
          "Encapsulation"
        ],
        "explanation": "There are 4 OOPS concepts in Java. Inheritance, Encapsulation, Polymorphism and Abstraction.",
        "correctAnswer": "3",
        "point": "10"
      },
      {
        "questionPic": picSix,
        "question": "What will be the output of the following Java program?",
        "questionType": "text",
        "answers": [
          "NaN",
          "Infinity",
          "0.0",
          "all of the mentioned"
        ],
        "correctAnswer": "4",
        "explanation": "For floating point literals, we have constant value to represent (10/0.0) infinity either positive or negative and also have NaN (not a number for undefined like 0/0.0), but for the integral type, we don’t have any constant that’s why we get an arithmetic exception.",
        "point": "10"
      },
      {
        "question": "What is not the use of “this” keyword in Java?",
        "questionType": "text",
        "answers": [
          "Referring to the instance variable when a local variable has the same name",
          "Passing itself to the method of the same class",
          "Passing itself to another method",
          "Calling another constructor in constructor chaining"
        ],
        "explanation": "“this” is an important keyword in java. It helps to distinguish between local variable and variables passed in the method as parameters.",
        "correctAnswer": "2",
        "point": "10"
      },
      {
        "questionPic": picEight,
        "question": "What will be the output of the following Java program?",
        "questionType": "text",
        "answers": [
          "Compilation error",
          "Runtime error",
          "5 6 5 6",
          "5 6 5"
        ],
        "correctAnswer": "1",
        "explanation": "Second print statement doesn’t have access to y , scope y was limited to the block defined after initialization of x.",
        "point": "10"
      },
      {
        "questionPic": picNine,
        "question": "What will be the output of the following Java code?",
        "questionType": "text",
        "answers": [
          "100",
          "400",
          "200",
          "12"
        ],
        "correctAnswer": "3",
        "explanation": "Multiplication of 10 * 2 * 10",
        "point": "10"
      },
      {
        "question": "Which of these keywords is used to define interfaces in Java?",
        "point": "10",
        "answers": [
          "intf",
          "Intf",
          "interface",
          "Interface"
        ],
        "correctAnswer": "3",
        "explanation": "interface keyword is used to define interfaces in Java.",
        "questionType": "text"
      }
    ],
    "quizSynopsis": "10 questions about the Java programming language. Each correct answer gives 10 points.\nSo the full score of the quiz is 100 points.\nGet started"
  }