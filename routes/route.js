const express = require('express');
const router = express.Router();
const ProjectAssignment = require('../models/ProjectAssignment'); 

const Employee = require('../models/Employee'); 

const Project = require('../models/Project');



// Define route to fetch project by ID
router.get('/api/projects/:project_code', async (req, res) => {
    try {
      const project = await Project.findOne({ project_code: req.params.project_code });
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Define route to fetch employee by ID
router.get('/api/employees/:project_code', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.project_code);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define route to fetch latest project assignments
router.get('/api/project_assignments', async (req, res) => {
  try {
    // Fetch latest 5 project assignments sorted by start_date
    const projectAssignments = await ProjectAssignment.find()
      .sort({ start_date: -1 })
      .limit(5);

    res.json(projectAssignments);
  } catch (error) {
    console.error('Error fetching project assignments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
