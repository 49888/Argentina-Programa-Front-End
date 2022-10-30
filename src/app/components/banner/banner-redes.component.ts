import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-banner-redes',

    template: `
        <!-- Redes -->
        <div class="Redes"> 
            <ul class="d-flex justify-content-evenly p-0 m-0" style="list-style: none;">
                <li class="text-center">
                    <a href="mailto:murillofausto619@gmail.com?subject=Vi%20tu%20Portfolio" target="_blank" rel="noopener noreferrer" [style.color]="color"><i class="bi bi-google"></i></a>
                </li>
                <li class="text-center">
                    <a href="https://api.whatsapp.com/send?phone=5493816065882" target="_blank" rel="noopener noreferrer" [style.color]="color"><i class="bi bi-whatsapp"></i></a>
                </li>
                <li class="text-center">
                    <a href="https://www.linkedin.com/in/franco-javier-alvarez-301105230/" target="_blank" rel="noopener noreferrer" [style.color]="color"><i class="bi bi-linkedin"></i></a>
                </li>
                <li class="text-center">
                    <a href="https://github.com/49888" target="_blank" rel="noopener noreferrer" [style.color]="color"><i class="bi bi-github"></i></a>
                </li>
            </ul> 
        </div>
    `,

    styles: [`
        .Redes .bi {
            font-size: 25px;
        }
        .Redes .bi:hover {
            color: #0e64e6;
            text-shadow: 0px 0px 4px rgba(128,65,228,0.75);
        }
    `]
})

export class BannerRedesComponent implements OnInit {

    @Input() color:string | undefined;

    constructor(){}

    ngOnInit() { }
}