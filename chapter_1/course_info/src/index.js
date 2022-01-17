
import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'


const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
            <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
            <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>yht. {props.parts[0].exercises + props.parts[1].exercises
                + props.parts[2].exercises} tehtävää
            </p>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.name} {props.exercises}
            </p>
        </div>
    )
}

// const App = () => {
//     const course = {
//         name: 'Half Stack -sovelluskehitys',
//         parts: [
//             {
//                 name: 'Reactin perusteet',
//                 exercises: 10
//             },
//             {
//                 name: 'Tiedonvälitys propseilla',
//                 exercises: 7
//             },
//             {
//                 name: 'Komponenttien tila',
//                 exercises: 14
//             }
//         ]
//     }

//     return (
//         <div>
//             <Header course={course.name} />
//             <Content parts={course.parts} />
//             <Total parts={course.parts} />
//         </div>
//     )
// }


const App = () => {
    const list = [{m:"Hei"},{m:"Hey"},{m:"Hi"}]
    
    return ( <div> {list.forEach(elem => (<div key={elem.m}> {elem.m} </div>))} </div> )
  }


ReactDOM.render(<App />, document.getElementById('root'))


// a.
// return list.map(elem => (<div key={elem.m}> {elem.m} </div>))

// d.
// return ( <div> {list.map(elem => (<div key={elem.m}> {elem.m} </div>))} </div> )
// e.
// return ( <div> {list.forEach(elem => (<div key={elem.m}> {elem.m} </div>))} </div> )