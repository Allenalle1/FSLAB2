// ProjectAssignmentTable.js

import React, { useState, useEffect } from 'react';

const ProjectAssignmentTable = () => {
  const [projectAssignments, setProjectAssignments] = useState([]);

  useEffect(() => {
    fetchProjectAssignments();
    const intervalId = setInterval(fetchProjectAssignments, 60000); // Fetch data every minute

    return () => clearInterval(intervalId);
  }, []);

  const fetchProjectAssignments = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/project_assignments');
      const data = await response.json();
      const projectAssignmentsWithDetails = await Promise.all(data.map(async (assignment) => {
        const employeeResponse = await fetch(`http://localhost:3000/api/employees/${assignment.employee_id}`);
        const employeeData = await employeeResponse.json();

        const projectResponse = await fetch(`http://localhost:3000/api/projects/${assignment.project_code}`);
        const projectData = await projectResponse.json();

        return {
          ...assignment,
          employee_name: employeeData.full_name,
          project_name: projectData.project_name 
        };
      }));
      setProjectAssignments(projectAssignmentsWithDetails.slice(0, 5)); // Get latest 5 project assignments with names
    } catch (error) {
      console.error('Error fetching project assignments:', error);
    }
  };

  return (
    <div>
      <h2>Latest Project Assignments</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Project Name</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {projectAssignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.employee_id}</td>
              <td>{assignment.employee_name}</td>
              <td>{assignment.project_name}</td>
              <td>{assignment.start_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectAssignmentTable;
