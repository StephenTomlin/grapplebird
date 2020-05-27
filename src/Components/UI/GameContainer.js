"use strict";
import React from 'react';

export  default class GameContainer extends React.Component  {
    constructor(props){
        super(props)
        // Next up create a new Unity Content object to 
        // initialise and define your WebGL build. The 
        // paths are relative from your index file.
        this.state =  {
            gameInstance: null
        };
    }

    async componentDidMount() {
        const isClient = typeof window !== 'undefined';
        if(isClient) {
            this.setState({ 
                gameInstance: UnityLoader
                    .instantiate("gameContainer", "Build/Game.json", 
                    { onProgress: UnityProgress })
            })
        }
    }

  
    render() {           
        return (<div id="gameContainer" style={{ width: 960,  height: 600 }}></div>)
    }
}