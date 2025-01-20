// src/DashboardChart.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { User } from './types/Users';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useTranslation} from 'react-i18next'

const AgeLineChart: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [ageData, setAgeData] = useState<{ name: string; count: number }[]>([]);
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

  const getAgeDistribution = (users: User[]) => {
    const ageRanges = [
      { range: "18-25", min: 18, max: 25 },
      { range: "26-35", min: 26, max: 35 },
      { range: "36-45", min: 36, max: 45 },
      { range: "46-55", min: 46, max: 55 },
      { range: "56+", min: 56, max: Infinity },
    ];

    const distribution = ageRanges.map((ageRange) => ({
      name: ageRange.range,
      count: 0,
    }));

    users.forEach((user) => {
      const userAge = user.age;
      ageRanges.forEach((ageRange, index) => {
        if (userAge >= ageRange.min && userAge <= ageRange.max) {
          distribution[index].count += 1;
        }
      });
    });

    return distribution;
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const distribution = getAgeDistribution(users);
      setAgeData(distribution);
    }
  }, [users]);

  return (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography variant="h4">{t('age-line-chart')}</Typography>

      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AgeLineChart;
