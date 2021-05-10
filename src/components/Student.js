import { useEffect, useState } from 'react';
import { insert, update, read, remove } from '../services/apiServices';

const Student = ({match, history}) => {

    const [id] = useState(match.params.id);
    const [student, setStudent] = useState({
        _id:'new',
        firstName: '',
        lastName: '',
        yearOfBirth: 0,
        address: ''
    });

    useEffect(() => {
        if(id !== 'new'){
            read('students', id, data => {
                if(data) setStudent(data);
            })
        }
    }, [id]);

    const [emptyFirstName, setEmptyFirstName] = useState(false);
    const [emptyLastName, setEmptyLastName] = useState(false);

    function changeHandler(e) {
        if(e.target.name && e.target.value === "firstName"){
            setEmptyFirstName(false);
        }else if(e.target.name && e.target.value === "lastName"){
            setEmptyLastName(false);
        }
        setStudent({
            ...student,
            [e.target.name]: e.target.value
            
        });
    }

    const back = () => {
        history.push('/students')
    }

    const save = () => {
        if(id === 'new'){
            if(!student.firstName && !student.lastName){
                setEmptyLastName(true);
                setEmptyFirstName(true);
                return;
            }else if(!student.firstName){
                setEmptyFirstName(true);
                return;
            }else if(!student.lastName){
                setEmptyLastName(true);
                return;
            }
            insert('students', student, data => {
                if(data) return history.push('/students');
                console.log('There was error during save data');
            })
        }else {
            if(!student.firstName && !student.lastName){
                setEmptyLastName(true);
                setEmptyFirstName(true);
                return;
            }else if(!student.firstName){
                setEmptyFirstName(true);
                return;
            }else if(!student.lastName){
                setEmptyLastName(true);
                return;
            }
            update('students', id, student, data => {
                if(data) return history.push('/students');
                console.log('There was error during save data');
            })
        }
    }

    const del = () => {
        remove('students', id, data => {
            history.push('./students');
        })
    }

    return (
        <div className='container'>
            <h2>Student</h2>
            <form className='input-form'>
                <div style={{margin: '12px 0'}}>
                    <label htmlFor='firstName'>First Name: </label>
                    <input type='text' 
                           name='firstName' 
                           value={student.firstName} 
                           onChange={changeHandler} 
                           required />
                           {emptyFirstName && <h2><span>First Name</span> field is required!</h2>}
                </div>
                <div style={{margin: '12px 0'}}>
                    <label htmlFor='lastName'>Last Name: </label>
                    <input type='text' 
                           name='lastName' 
                           value={student.lastName} 
                           onChange={changeHandler}
                           required />
                           {emptyLastName && <h2><span>Last Name</span> field is required!</h2>}
                </div>
                <div style={{margin: '12px 0'}}>
                    <label htmlFor='yearOfBirth'>Year of Birth: </label>
                    <input type='text' 
                           name='yearOfBirth' 
                           value={student.yearOfBirth} 
                           onChange={changeHandler} />
                </div>
                <div style={{margin: '12px 0'}}>
                    <label htmlFor='address'>Address: </label>
                    <input type='text' 
                           name='address' 
                           value={student.address} 
                           onChange={changeHandler} />
                </div>
                <hr />
                {id !== 'new' && (
                <div className='left'>
                    <button type='button' onClick={del}>DELETE</button>
                </div>
                )}
                <div className='right'>
                    <button type='button' onClick={back}>BACK</button>
                    &nbsp;&nbsp;
                    <button type='button' onClick={save}>SAVE</button>
                </div>
            </form>
        </div>
    );
};

export default Student;