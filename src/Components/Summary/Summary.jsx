import React, { useContext, useEffect, useState } from "react";
import styles from './Summary.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { AmountContext } from "../../TrackerContext/AmountContext";

export default function Summary(){

    let {storedData, setStoredData} = useContext(AmountContext);
    const currentData = [...storedData];
    const [totalIncome, setTotalIncome] = useState(null);
    const [totalExpense, setTotalExpense] = useState(null);

    const setIncomeExpense = () => {
        const income = currentData
          .filter((record) => record.type === 'income')
          .reduce((sum, record) => sum + record.amount, 0);
    
        const expense = currentData
          .filter((record) => record.type === 'expense')
          .reduce((sum, record) => sum + record.amount, 0);
    
        setTotalIncome(income);
        setTotalExpense(expense);
      };

      useEffect(() => {
        setIncomeExpense();
      }, []);

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: ['Income', 'Expense'],
        datasets: [
          {
            label: 'Amount',
            data: [totalIncome, totalExpense],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
    return <>
        <div className="row d-flex justify-content-evenly">
            <div className="col-md-4">
                <div className="row my-5 border border-2 border-primary text-center rounded-2 p-2">
                    <h4 className="mb-0">Total income : {totalIncome}$</h4>
                </div>
                <div className="row my-5 border border-2 border-primary text-center rounded-2 p-2">
                    <h4 className="mb-0">Total expenses : {totalExpense}$</h4>
                </div>
            </div>
            <div className={`col-md-8 ${window.matchMedia("(max-width: 700px)")? 'w-100':"w-50" } d-flex align-items-center justify-content-end`}>
                <Pie data={data} />
            </div>
        </div>
    </>
} 