// src/DepartmentBarChart.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User } from './types/Users';
import {useTranslation} from 'react-i18next'

const DepartmentBarChart: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [departmentData, setDepartmentData] = useState<{ name: string; count: number }[]>([]);
  const { t, i18n } = useTranslation();

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const userData: User[] = response.data.users;
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getDepartmentDistribution = (users: User[]) => {
    const departmentCount = users.reduce((acc, user) => {
      const department = user.company?.department || 'Unknown';
      acc[department] = (acc[department] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(departmentCount).map(([name, count]) => ({ name, count }));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const distribution = getDepartmentDistribution(users);
      setDepartmentData(distribution);
    }
  }, [users]);

  return (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography variant="h4">{t('department-bar-chart')}</Typography>

      {/* Bar Chart for Department Distribution */}
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default DepartmentBarChart;
