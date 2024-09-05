import React, { Component } from 'react';
import './home.css';
import Navbar from './Navbar';
import Menu from './Menu';
import List from './List';
import Footer from './footer';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <Navbar />
                <div className="content">
                    
                </div>
                <Menu />
                <div className="content1">
                   
                </div>
                <List />
                <div className="content1">
                   
                   </div>
                   <Footer />
            </div>
            
        );
    }
}

export default Home;
