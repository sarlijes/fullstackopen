import React from 'react';
import { parseJsonText } from 'typescript';

interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Content = (props: ContentProps) => {
  return (
    <p>
      {props.name} {props.exerciseCount}
    </p>
  );
}

interface TotalProps {
  courseParts: ContentProps[];
}

const Total = (props: TotalProps) => {
  return (
    <p key={"nummberOfExercises"}>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header key={courseName} name={courseName} />
      {courseParts.map((part) => {
        return <Content
          key={part.name}
          name={part.name}
          exerciseCount={part.exerciseCount}
        />
      })}
      <Total key={courseName} courseParts={courseParts} />

    </div>
  );
};

export default App;