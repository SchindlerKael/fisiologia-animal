import React, {useState, useEffect} from 'react';

import './styles.css';
import api from '../../services/api';

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Container from "../../components/Container";


const ExperimentList = (props) => { 

    const [experiments, setExperiments] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await api.get('/experiments');
            setExperiments(data);
        })();
    }, []);

    console.log(experiments);
    return (
        <>
        <Header />
        <Container style={{justifyContent: 'left',}}>
            <div>
                <h1 className="page-title">Criar experimento</h1>
            </div>
        </Container>
        <Footer />
        </>
    )
}

export default ExperimentList;