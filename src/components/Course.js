import { useEffect, useState } from 'react';
import { insert, update, read, remove } from '../services/apiServices';

const Course = ({match, history}) => {

    const [id] = useState(match.params.id);
    const [course, setCourse] = useState({
        _id:'new',
        name: '',
        points: 0
    });

    const [emptyName, setEmptyName] = useState(false);
    const [emptyPoints, setEmptyPoints] = useState(false);

    useEffect(() => {
        if(id !== 'new'){
            read('courses', id, data => {
                if(data) setCourse(data);
            })
        }
    }, [id]);

    function changeHandler(e) {
        if(e.target.name && e.target.value === "name"){
            setEmptyName(false);
        }else if(e.target.name && e.target.value === "points"){
            setEmptyPoints(false);
        }
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    }

    const back = () => {
        history.push('/courses')
    }

    const save = () => {
        if(id === 'new'){
            if(!course.name && !course.points){
                setEmptyName(true);
                setEmptyPoints(true);
                return;
            }else  if(!course.name){
                setEmptyName(true);
                return;
            }else if(!course.points){
                setEmptyPoints(true);
                return;
            }
            insert('courses', course, data => {
                if(data) return history.push('/courses');
                console.log('There was error during save data');
            })
        }else {
            if(!course.name && !course.points){
                setEmptyName(true);
                setEmptyPoints(true);
                return;
            }else  if(!course.name){
                setEmptyName(true);
                return;
            }else if(!course.points){
                setEmptyPoints(true);
                return;
            }
            
            update('courses', id, course, data => {
                if(data) return history.push('/courses');
                console.log('There was error during save data');
            });
        }
    }

    const del = () => {
        remove('courses', id, data => {
            history.push('./courses');
        })
    }

    return (
        <div className='container'>
            <h2>Course</h2>
            <form className='input-form'>
                <div style={{margin: '12px 0'}}>
                    <label htmlFor='name'>Course Name: </label>
                    <input type='text'
                           name='name'
                           value={course.name} 
                           onChange={changeHandler}
                           required />
                           {emptyName && <h2><span>Name</span> field is required!</h2>}
                </div>
                <div style={{margin: '12px 0'}}>
                    <label htmlFor='points'>Course Points: </label>
                    <input type='text' 
                           name='points' 
                           value={course.points} 
                           onChange={changeHandler}
                           required />
                           {emptyPoints && <h2><span>Points</span> field is required!</h2>}
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

export default Course;