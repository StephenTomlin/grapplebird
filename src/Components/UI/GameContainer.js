"use strict";
import React from 'react';
import UnityLoader from '../Game/Build/UnityLoader';
import UnityProgress from '../Game/TemplateData/UnityProgress';

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
    // const runOnClient() {
    //   console.log("silly client")
    //   UnityLoader.instantiate("gameContainer", "Build/Game.json", { onProgress: UnityProgress })
    // }
    async componentDidMount() {
      UnityLoader.instantiate("gameContainer", "Game.json", { onProgress: UnityProgress })
    }


    render() {
        return (
          <div id="gameContainer" style={{ width: 960,  height: 600 }}></div>
        )
    }
}
