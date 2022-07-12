import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { CardComponent } from './components/card/card.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { AppRoutingModule } from './app.routing';
import { MainComponent } from './components/main/main.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ChartComponent } from './components/chart/chart.component';
import { ProjectsComponent } from './components/projects/projects.component';


import { NgChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/state';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    CardComponent,
    ExperienceComponent,
    EducationComponent,
    MainComponent,
    SkillsComponent,
    ChartComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({name: 'Estado'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
