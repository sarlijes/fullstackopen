import React from 'react';
import { parseJsonText } from 'typescript';

interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

interface PartProps {
  name: string;
  exerciseCount: number;
}

const Part = (props: PartProps) => {
  return (
    <p>
      {props.name} {props.exerciseCount}
    </p>
  );
}

interface TotalProps {
  courseParts: PartProps[];
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
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourseWithDescription extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartBase {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartBase {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  type CoursePart = CourseNormalPart | CourseProjectPart |
    CourseSubmissionPart | CourseWithDescription;

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ]

  return (
    <div>
      <Header key={courseName} name={courseName} />
      {courseParts.map((part) => {
        return <Part
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