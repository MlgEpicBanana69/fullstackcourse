
const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Header = (props) => {
    console.log(props.course.name)
    return (
        <h2>{props.course.name}</h2>
    )
}

const Content = (props) => {
    console.log('parts og :>> ', props.course.parts);
    let output = props.course.parts.map(part =>
        <Part key={part.id} part={part}/>
    )
    console.log('parts map :>> ', output);
    return (
        <div>{output}</div>
    )
}

const Total = (props) => {
    console.log(props)
    let sum = props.course.parts.map(part => part.exercises).reduce((sum, n) => sum + n, 0)
    return (
        <b>Total number of exercises: {sum}</b>
    )
}

const Course = ({ course }) => {
    return (
        <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
        </div>
    )
}

console.log("Course defined...");
export default Course