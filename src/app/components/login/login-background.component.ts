import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login-bg',

    template: `
    
        <div class="container-fluid header p-0" style="height: calc(100vh - 96px);">

            <!--Content before waves-->
            <div class="inner-header flex">
            
                <div class="main position-relative">
                    <ng-content></ng-content> 
                </div>

            </div>

            <!--Waves Container-->
            <div style="margin-top: 55px;">
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g class="parallax">
                        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>


        </div>
    `,

    styles: [`

        .header {
            position:relative;
            background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
        }

        .inner-header {
            height: 65vh;
            width: 100%;
            margin: 0;
            padding: 0;
        }

        .flex { /*Flexbox for containers*/
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .waves {
            position: fixed;
            bottom: 0;
            width: 100%;
            height:15vh;
            margin-bottom:-7px; /*Fix for safari gap*/
            min-height:100px;
            max-height:150px;
        }

        .content {
            position: relative;
            height: 20vh;
            text-align:center;
            background-color: white;
        }

        /* Animation */

        .parallax > use {
            animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
        }
        .parallax > use:nth-child(1) {
            animation-delay: -2s;
            animation-duration: 7s;
        }
        .parallax > use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 10s;
        }
        .parallax > use:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 13s;
        }
        .parallax > use:nth-child(4) {
            animation-delay: -5s;
            animation-duration: 20s;
        }

        @keyframes move-forever {
            0% { transform: translate3d(-90px,0,0); }
            100% { transform: translate3d(85px,0,0); }
        }

        /*Shrinking for mobile*/
        @media (max-width: 768px) {

            .waves { height: 70px; min-height: 70px; }

            .content { height:30vh; }
        }
    
    `]
})

export class LoginBackgroundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}