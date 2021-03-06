import React from "react";
import { Chart } from "react-google-charts";

import "./styles.css";

export default (props) => {
    const pointsOnChart = 30;

    const result = props.result;
    const answer = props.answer;
    const checkResult = props.checkResult;
    const checkAnswer = props.checkAnswer;

    const initialValue = props.initial_value;
    const expectedRate = props.expected_rate;
    const eventRate = props.event_rate;
    const deltaRate = expectedRate - eventRate;

    const WeightCalculation = (total, weight) => {
        return parseFloat(total) + parseFloat(weight);
    }

    const chartFunction = (value, weight) => {
        const newValue = value - (eventRate + (deltaRate * weight))
        return newValue;
    }

    const generateData = () => {
        let data = [];
        let value = initialValue;

        data.push(value);

        for(let i = 0; i < pointsOnChart/3; i++ ) {
            value = chartFunction(value, 1);
            data.push(value); 
        }

        for(let i = 0; i < pointsOnChart/3; i++ ) {
            value = chartFunction(value, 0);
            data.push(value); 
        }
        
        return data;
    }

    const mountMatrice = () => {
        const header = [['horas','Experimento', 'Aluno 1', 'Resultado' ]];

        const data = generateData();

        let experiment = Array.from(data.entries());

        let body = experiment.map((array, i) => {
            if(i === experiment.length - 1)
                return array.concat([array[1], array[1]]);
            return array.concat([null, null]);
        });

        if(answer.length !== 0 && (checkResult || checkAnswer)) {
            const answerWeight = answer.reduce(WeightCalculation, 0);
            const resultnWeight = result.reduce(WeightCalculation, 0);

            for(let i = 0; i < pointsOnChart/3; i++ ) {
                const answerPoint = checkAnswer ? chartFunction(body[body.length-1][2], answerWeight): null;
                const resultPoint = checkResult ? chartFunction(body[body.length-1][3], resultnWeight) : null;
                body.push([body.length, null, answerPoint, resultPoint]);
            }
        }
        return header.concat(body);
    }
    
    return(
            <div className="chart-content">
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={mountMatrice()}
                    options={{
                        hAxis: { title: 'Time (s)', viewWindow: { min: 0, max: pointsOnChart } },
                        vAxis: { title: 'Volume (ml)', viewWindow: { min: 0, max: initialValue } },
                    }}
                    rootProps={{ 'data-testid': '3' }}
                />
            </div>
        );
}

