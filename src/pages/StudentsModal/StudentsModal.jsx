import React, {useState} from 'react'
export const StudentsModal = ({open, onClose}) => {
    // const [students, setStudents] = React.useState({username: '', password: '', role: ''});
    const students = [{username: 'dollshak', password: '123', role: ''},
    {username: 'peleg', password: '2', role: ''},
    {username: 'gal', password: '1', role: ''}]
    const [chosenStudent, setChosenStudent] =  useState({username: '', password: '', role: ''});
    const [showMessage, setShowMessage] = useState(false)
    if (!open) return null;
  
  //   const handleChange = (event) => {
  //     const value = event.target.value
  //     console.log(value);
  //     setChosenStudent(value)
  //     console.log(chosenStudent)
  // }
  
    const onStudentClick = (student) => {
      console.log(student.username);
      setShowMessage(true)
      console.log(showMessage);
    };
  
    const onCloseModal = () => {
      setShowMessage(false)
      onClose()
    }
  
    return (
      <div className='students_modal'>
        <div className='students_container'>
  
        <div className='close_modal'>
            <button onClick={onCloseModal}>X</button>
  
          </div>
  
          <h1>Choose a Student</h1>
  
          <div className='links'>
            {showMessage && <p>student link</p>}
            {showMessage && <p>mentor's link</p>}
  
          </div>
  
          <div className='students_list'>
            {students.map(student => 
              <button className='student' onClick={onStudentClick}>{student.username}</button>
              )}
          </div>
  
        </div>
      </div>
    );
  }