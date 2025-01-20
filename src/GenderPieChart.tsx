// src/GenderDistributionChart.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { User } from './types/Users'; // Import the User schema
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useTranslation} from 'react-i18next'

const GenderDistributionChart: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [genderData, setGenderData] = useState<{ name: string; value: number }[]>([]);
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

  const getGenderDistribution = (users: User[]) => {
    const genderCount = {
      male: 0,
      female: 0,
    };

    users.forEach((user) => {
      if (user.gender === 'male') genderCount.male += 1;
      else if (user.gender === 'female') genderCount.female += 1;
    });

    return [
      { name: 'Male', value: genderCount.male },
      { name: 'Female', value: genderCount.female },
    ];
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const distribution = getGenderDistribution(users);
      setGenderData(distribution);
    }
  }, [users]);

  return (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography variant="h4">{t('gender-pie-chart')}</Typography>

      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
              fill="#8884d8"
              label
            >
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#0088FE" : index === 1 ? "#00C49F" : "#FFBB28"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default GenderDistributionChart;
