// Audit.jsx
import axios from 'axios';

const AUDIT_URL = 'http://localhost:8090/audit/add'; // Your audit endpoint

const audit = async (action) => {
    try {
        const response = await fetch('http://localhost:8090/audit/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audit: action,
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Audit logged successfully:', data);
      } catch (error) {
        console.error('Error logging audit:', error);
      }
};

export default audit;
