
"use client";
import CreateProject from "@/components/createProject/CreateProject";
import axios from "axios";
import { useEffect, useState } from "react";
import useProfile from "@/hooks/useProfile";
import Projects from "@/components/projects/Projects";
import { useRouter } from "next/navigation";

export default function Home() {

  const [projects, setProjects] = useState([]);

  const { userData, fetchProfile } = useProfile();

  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects', { withCredentials: true });

        setProjects(res?.data?.projects);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();

  }, []);


  if (projects.length > 0) {
    router.push("/projects");

  }

  if (userData && projects.length === 0) {
    return (
      <>
        <CreateProject />
      </>
    );
  }




}