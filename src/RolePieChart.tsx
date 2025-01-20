import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { User } from './types/Users';
import {useTranslation} from 'react-i18next'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

const RolePieChart: React.FC = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const { t, i18n } = useTranslation();

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const users: User[] = response.data.users;
      const roleData = users.reduce((acc: { [key: string]: number }, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});
      const formattedData = Object.keys(roleData).map((key) => ({
        name: key,
        value: roleData[key],
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography variant="h4">{t('role-pie-chart')}</Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              labelLine={true}
              label={({ name }) => name}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default RolePieChart;