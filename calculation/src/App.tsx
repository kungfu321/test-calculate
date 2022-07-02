import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import Button from './components/Button';
import Card from './components/Card';
import styles from './styles/app.module.css';
import axios from 'axios';
import { TResult, TRespResult } from './types/result';

function App() {
  const [number1, setNumber1] = useState<number | string>('');
  const [number2, setNumber2] = useState<number | string>('');
  const [message, setMessage] = useState<number | string>('');
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [resultList, setResultList] = useState<TResult[]>([]);

  const handleFetchResults = async () => {
    setLoadingList(true);
    const { data } = await axios.get<TRespResult>('http://calculation.test/api/calculate');
    if (data.data.length > 0) {
      setResultList(data.data);
    }

    setLoadingList(false);
    return data;
  }

  useEffect(() => {
    handleFetchResults();
  }, []);

  const handleCalculation = async () => {
    setMessage('');
    if (number1 && number2) {
      try {
        setLoading(true);
        const data = { number1, number2 };
        const resp = await axios.post<TResult>('http://calculation.test/api/calculate', data);

        setNumber1('');
        setNumber2('');
        setLoading(false);
        if (resp.data) {
          await handleFetchResults();
        }
      } catch (error: any) {
        setNumber1('');
        setNumber2('');
        setLoading(false);
        setMessage(error?.response?.data?.message);
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: string) => {
    if (type === 'number1') {
      setNumber1(parseInt(event.target.value));
    } else {
      setNumber2(parseInt(event.target.value));
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.text}>Calculator</span>
      </div>
      <div className={styles.card}>
        <Card>
          <label className={styles.label}>Enter the numbers</label>
          <Input value={number1} placeholder="number 1" onChange={e => handleChange(e, 'number1')} type="number" style={{ marginTop: 10 }} />
          <Input value={number2} placeholder="number 2" onChange={e => handleChange(e, 'number2')} type="number" style={{ marginTop: 10 }} />
          {
            message ?
              <div className={styles.message}>
                <label>{message}</label>
              </div>
              : null
          }
          <div className={styles.button}>
            <Button onClick={handleCalculation} loading={loading}>Sum</Button>
          </div>

          <div className={styles.divider} />

          <label className={styles.label}>Results {loadingList ? ': Loading...' : ''}</label>

          <div className={styles.result}>
            {
              resultList.length > 0 ? resultList.map((item, index) =>
                <Input value={`${item.number1} + ${item.number2} = ${item.total}`} placeholder="result" disabled style={{ marginBottom: 10, border: '1px solid #c10708' }} key={index} />
              )
                : !loadingList ? <div className={styles.notFound}>No items found</div> : null
            }
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
