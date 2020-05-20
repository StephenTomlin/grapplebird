"use strict";
import React from 'react';
import UnityLoader from '../Game/Build/UnityLoader';
import unityProgress from '../Game/TemplateData/UnityProgress';


export  default class GameContainer extends React.Component  {
    constructor(props){
        super(props)
        // Next up create a new Unity Content object to 
        // initialise and define your WebGL build. The 
        // paths are relative from your index file.
        this.gameInstance = null;
    }

  
    async render() {           
        const { window } = this.props 
            this.gameInstance = 
            !(Object.keys(window)
                .length === 0 && 
                window.constructor === Object) 
            ? 
                UnityLoader.instantiate("gameContainer", '..Game/Build/Game.json', {onProgress: unityProgress })  
            : 
                null
        return (
                <>
                    <div id="gameContainer" style={{ width: 960,  height: 600 }}></div>
                </>

        )
    }
}

// async function boot() {
//     
//     console.log(UnityLoader);
//     return 
// }