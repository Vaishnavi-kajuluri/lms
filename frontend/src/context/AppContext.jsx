import React, { useEffect, useState } from 'react';
import { createContext } from "react"; 
import { dummyCourses } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration'
export const AppContext=createContext();
  
export const AppContextProvider=(props) =>{
    const currency=import.meta.env.VITE_CURRENCY
    const navigate=useNavigate()
    const [allCourses,setAllCourses] =useState([])
    const [isEducator,setIsEducator] =useState(true)
    const [enrolledCourses,setEnrolledCourses] =useState([])
    const fetchAllCourses=async ()=>{
      setAllCourses(dummyCourses)
    }
    // function to calculate avg rating of course
    const calculaterating =(course) =>{
       if(course.courseRatings.length===0)
       {
         return 0;
       }
       let totalRating=0;
       course.courseRatings.forEach(rating=>{
         totalRating+=rating.rating;
       })
       return totalRating/course.courseRatings.length
    }
   // function to calculate course chapter time
    const calculateChapterTime=(chapter) =>{
     let time=0
     chapter.chapterContent.map((lecture)=> time +=lecture.lectureDuration)
     return humanizeDuration(time*60*1000,{units:["h","m"]})
    }
    // function to calculate coure duration
    const calculateCourseDuration=(course) =>{
      let time=0
      course.courseContent.map((chapter)=> chapter.chapterContent.map(
        (lecture) => time+=lecture.lectureDuration
      ))
      return humanizeDuration(time*60*1000,{units:["h","m"]})
    }
    // function to calculate no.of lectures in the course
    const calculateNoOfLectures=(course) =>{
      let totalLectures=0;
      course.courseContent.forEach(chapter =>{
        if(Array.isArray(chapter.chapterContent)){
          totalLectures+=chapter.chapterContent.length;
        }
      });
      return totalLectures;
    }
    // function to fetch user enrolled courses
    const fetchuserEnrolledCourses =async()=>{
      setEnrolledCourses(dummyCourses)
    }
    useEffect(()=>
  {
     fetchAllCourses()
     fetchuserEnrolledCourses()
  },[])
  const value={ 
    currency,allCourses,navigate,calculaterating,
    isEducator,setIsEducator,calculateNoOfLectures
    ,calculateCourseDuration,calculateChapterTime,enrolledCourses
  }
    return(
        <AppContext.Provider value={value}>
            {props.children}

        </AppContext.Provider>
    )
}