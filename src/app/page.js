
"use client";
import CreateProject from "@/components/createProject/CreateProject";
import axios from "axios";
import { useEffect, useState } from "react";
import useProfile from "@/hooks/useProfile";
import Projects from "@/components/projects/Projects";

export default function Home() {

  const [projects, setProjects] = useState([]);

  const { userData, fetchProfile } = useProfile();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects', { withCredentials: true });

        setProjects(res.data.projects);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
    fetchProfile();
  }, []);



  if (userData && projects.length === 0) {
    return (
      <>
        <CreateProject />
      </>
    );
  }
  else if (userData && projects.length > 0) {
    return (<>
      <Projects />
    </>);
  }


}