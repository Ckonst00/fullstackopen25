const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}
const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      <strong>total of {total} exercises</strong>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts} />
    </div>
  )
}
const Courses = ({ courses }) => {
  return (
      <div>
        {courses.map(course => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    )
  }


export default Courses;