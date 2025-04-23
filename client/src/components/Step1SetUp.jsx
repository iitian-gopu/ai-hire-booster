import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Step1SetUp({ onStart }) {
    const {userData}= useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);


    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

            console.log(result.data)

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);

            setAnalyzing(false);

        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
           const result = await axios.post(ServerUrl + "/api/interview/generate-questions" , {role, experience, mode , resumeText, projects, skills } , {withCredentials:true}) 
           console.log(result.data)
           if(userData){
            dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
           }
           setLoading(false)
           onStart(result.data)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4'>

            <div className='w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden'>

                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='relative bg-gradient-to-br from-green-50 to-green-100 p-12 flex flex-col justify-center'>

                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Start Your AI Interview
                    </h2>

                    <p className="text-gray-600 mb-10">
                        Practice real interview scenarios powered by AI.
                        Improve communication, technical skills, and confidence.
                    </p>

                    <div className='space-y-5'>

                        {
                            [
                                {
                                    icon: <FaUserTie className="text-green-600 text-xl" />,
                                    text: "Choose Role & Experience",
                                },
                                {
                                    icon: <FaMicrophoneAlt className="text-green-600 text-xl" />,
                                    text: "Smart Voice Interview",
                                },
                                {
