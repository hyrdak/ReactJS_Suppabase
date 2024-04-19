import React, { useState, useEffect } from 'react';
import '../tailwind.css';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToDoList from "../components/ToDoList";
import SignUp from '../auth/sign_up';
import SignIn from '../auth/sign_in';
import Home from '../components/Home';
import Header from '../components/Header';

const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbWJyd3FrY29vdGllYWd1endhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NTQyNDcsImV4cCI6MjAyODEzMDI0N30.fEo-ddluC6l2HNPqIjcHBFHTYdIWoE8vjfjIX9KPbPI';
const supabase : SupabaseClient = createClient(supabaseUrl, supabaseKey);


const RoutesComponent: React.FC = () => {
  const [user_log, setUser_log] = useState<any>('');
  useEffect(() => {
    const fetchData = async () => {
      if(user_log === '') {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching data:', error.message);
            } else {
                if (user !== null) {
                  setUser_log(user);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', (error as Error).message);
        }
      }
    };
    fetchData();
  });
  return (
    <>
      <Header supabase={supabase} user={user_log}/>
      <Router>
        <Routes>
          <Route path="/todolist" element={<ToDoList supabase={supabase} user={user_log}/>} />
          <Route path="/signup" element={<SignUp supabase={supabase} />} />
          <Route path="/signin" element={<SignIn supabase={supabase} />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default RoutesComponent ;